import Head from "next/head";
import { Fragment } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Next.js Events</title>
        <meta name="description" content="Next.js Events pages" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
