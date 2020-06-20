import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { ObjectId } from "mongodb";
import localForage from "localforage";
import { useRecoilState } from "recoil";
import Loading from "./Loading";
import { UserCache, UnicornHashTable, LocationHashTable } from "@/utils/types";
import { isOnlyObject } from "@/utils/fns";
import { userState, unicornHashTbl, locationHashTbl } from "@/store/index";
import { getUnicorns } from "@/utils/data-fetchers/unicorns";
import { getLocations } from "@/utils/data-fetchers/locations";

export default function EntryPoint({ Component, pageProps }: AppProps) {
  const [user, setUser] = useRecoilState(userState);
  const [, setLocationsData] = useRecoilState(locationHashTbl);
  const [, setUnicornsData] = useRecoilState(unicornHashTbl);

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

        setUnicornsData({ ...unicorns });
        setLocationsData({ ...locations });
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
