import React, { ComponentType } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";
import { userState } from "@/store/*";
import Header from "./Header";
import Footer from "./Footer";

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

type Props = {
  title?: string;
  description?: string;
  children: React.ReactElement | React.ReactElement[];
};

const Layout: React.FunctionComponent<Props> = ({
  title,
  description,
  children,
}) => {
  // If no title was passed as a prop, set a default one.
  const pageTitle =
    title ?? `${process.env.NEXT_PUBLIC_APP_NAME} — Where the Unicorns are at`;
  const pageDescription = description ?? process.env.NEXT_PUBLIC_APP_DESC;

  const [user, setUser] = useRecoilState(userState);

  const handleLogin = (result: CustomEvent<SignInResult>) => {
    console.log("Details:", result);
  };

  return (
    <React.Fragment>
      <Head>
        <title>{pageTitle}</title>
        {process.env.NEXT_PUBLIC_APP_BUILD_TARGET !== "production" ? (
          <meta name="robots" content="noindex" />
        ) : null}
        {pageDescription && (
          <meta name="description" content={pageDescription} />
        )}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&amp;family=Quicksand:wght@400;700&amp;display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col min-h-screen relative w-full">
        <Header />
        <main className="flex-1 text-center">
          {user ? (
            children
          ) : (
            <React.Fragment>
              <div className="pt-8 pb-4 mx-auto w-11/12 lg:max-w-screen-sm">
                <div
                  className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 text-left leading-loose text-sm"
                  role="alert"
                >
                  <p className="font-bold">Authentication Required</p>
                  <p>Log in with your Google account to demo this web app.</p>
                </div>

                <div className="mt-5 border bg-white py-2 rounded-md">
                  <PwaAuthComponent
                    googleKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}
                    signInButtonText="Log In"
                    signInCompleted={handleLogin}
                    appearance="list"
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
