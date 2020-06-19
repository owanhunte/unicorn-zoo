import React, { useEffect } from "react";
import { AppProps } from "next/app";
import localForage from "localforage";
import { useRecoilState } from "recoil";
import Loading from "./Loading";
import { UserCache } from "@/utils/types";
import { isOnlyObject } from "@/utils/fns";
import { userState } from "@/store/index";

export default function EntryPoint({ Component, pageProps }: AppProps) {
  const [user, setUser] = useRecoilState(userState);

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
      } catch (error) {
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
