import React, { useEffect } from "react";
import { AppProps } from "next/app";
import localForage from "localforage";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { UserCache, UnicornHashTable, LocationHashTable } from "@/utils/types";
import { isOnlyObject, setupRealTimeEventsHandler } from "@/utils/fns";
import {
  userState,
  unicornsState,
  locationsState,
  socketIdState,
  moveUnicornInState,
} from "@/store/index";
import { getUnicorns } from "@/utils/data-fetchers/unicorns";
import { getLocations } from "@/utils/data-fetchers/locations";

export default function EntryPoint({ Component, pageProps }: AppProps) {
  const [user, setUser] = useRecoilState(userState);
  const [socketId, setSocketId] = useRecoilState(socketIdState);
  const [unicorns, setUnicorns] = useRecoilState(unicornsState);
  const [locations, setLocations] = useRecoilState(locationsState);

  const syncUnicornMoved = (unicornId: string, newLocatonId: string) => {
    if (
      unicorns &&
      locations &&
      newLocatonId !== unicorns[unicornId].location
    ) {
      moveUnicornInState(
        unicornId,
        newLocatonId,
        unicorns,
        setUnicorns,
        setLocations
      );

      toast.success(
        `Another user just moved ${unicorns[unicornId].name} to location: ${locations[newLocatonId].name}`
      );
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const value: UserCache = await localForage.getItem(
          process.env.NEXT_PUBLIC_USER_CACHE_KEY as string
        );
        if (isOnlyObject(value)) {
          const now = new Date();
          if (
            value.data.accessTokenExpiration &&
            value.data.accessTokenExpiration > now
          ) {
            setUser({ ...value });
            setupRealTimeEventsHandler(socketId, setSocketId, syncUnicornMoved);
          } else {
            setUser(null);

            // Cache expired, flush it.
            await localForage.removeItem(
              process.env.NEXT_PUBLIC_USER_CACHE_KEY as string
            );
          }
        } else {
          setUser(null);
        }

        // Load the locations and unicorns.
        const p = await Promise.all([getLocations(), getUnicorns()]);

        const locations = p[0].reduce(
          (accumulator: LocationHashTable, current) => {
            accumulator[current._id] = {
              ...current,
              _id: current._id,
              unicornList: [],
            };
            return accumulator;
          },
          {}
        );

        const unicorns = p[1].reduce(
          (accumulator: UnicornHashTable, current) => {
            accumulator[current._id] = {
              ...current,
              _id: current._id,
            };
            locations[current.location].unicornList.push(current._id);
            return accumulator;
          },
          {}
        );

        setUnicorns({ ...unicorns });
        setLocations({ ...locations });
      } catch (error) {
        console.log("Error:", error);
        setUser(null);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {user !== undefined ? (
        <Component {...pageProps} />
      ) : (
        <div className="flex items-center justify-center w-full min-h-screen">
          <Loading />
        </div>
      )}
    </React.Fragment>
  );
}
