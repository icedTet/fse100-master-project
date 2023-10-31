import "../styles/global.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!globalThis.navigator) return;
    // FaceAI.getInstance().init();
  }, []);
  return (
    <>
      <Head>
        <title>Aaaa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link rel="icon" href="/volant.svg" /> */}
      </Head>
      <div className={`w-full min-h-screen flex flex-col bg-gray-850`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
