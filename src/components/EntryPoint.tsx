import React, { useEffect } from "react";
import { AppProps } from "next/app";
import localForage from "localforage";
import { useRecoilState } from "recoil";
import { userState } from "../store";
import Loading from "./Loading";
import { UserCache } from "@/utils/types";
import { isOnlyObject } from "@/utils/fns";

export default function EntryPoint({ Component, pageProps }: AppProps) {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    (async () => {
      try {
        const value: UserCache = await localForage.getItem("user_signin_data");
        if (isOnlyObject(value)) {
          const now = new Date();
          if (
            value.data.accessTokenExpiration &&
            value.data.accessTokenExpiration > now
          ) {
            setUser(value.data);
          } else {
            setUser(null);
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
      {user !== undefined ? <Component {...pageProps} /> : <Loading />}
    </React.Fragment>
  );
}
