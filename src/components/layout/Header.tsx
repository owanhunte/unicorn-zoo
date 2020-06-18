import React, { ComponentType } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";
import styles from "@/layoutstyles/header.module.scss";

/*
 * We want to use the pwa-auth web component strictly as a client side React component
 * so we'll make use of the the wc-react wrapper module and load the component using
 * Next.js's dynamic function.
 */
const PwaAuthComponent: ComponentType<PwaAuthProps> = dynamic(
  () =>
    import("wc-react").then((mod) => {
      import("@pwabuilder/pwaauth");
      return mod.wrapWc<PwaAuthProps>("pwa-auth");
    }),
  {
    ssr: false,
  }
);

const Header: React.FunctionComponent = () => {
  const handleLogin = (result: CustomEvent<SignInResult>) => {
    console.log("Details:", result);
  };

  return (
    <header className="bg-white text-gray-900 text-center shadow-sm">
      <div className="flex items-center justify-between mx-auto py-3 w-11/12 lg:max-w-screen-xl">
        <div className="flex items-center">
          <Link href="/">
            <a className="mr-2 sm:mr-3">
              <img src="/logo.png" alt="Logo" />
            </a>
          </Link>
          <h1 className="font-normal text-2xl m-0">
            <Link href="/">
              <a>{process.env.NEXT_PUBLIC_APP_NAME}</a>
            </Link>
          </h1>
        </div>

        <div className={styles["auth-control"]}>
          <PwaAuthComponent
            googleKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}
            signInButtonText="Log In"
            signInCompleted={handleLogin}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
