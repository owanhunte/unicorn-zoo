import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactElement | Array<React.ReactElement>;
};

const WebApp: React.FunctionComponent<Props> = ({
  title,
  description,
  children,
}) => {
  // If no title was passed as a prop, set a default one.
  const pageTitle =
    title ?? `${process.env.NEXT_PUBLIC_APP_NAME} — Where the Unicorns are at`;
  const pageDescription = description ?? process.env.NEXT_PUBLIC_APP_DESC;

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
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Quicksand:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col min-h-screen relative w-full">
        <Header />
        <main className="flex-1 text-center">{children}</main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default WebApp;
