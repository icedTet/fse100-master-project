import "../styles/global.css";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "nprogress/nprogress.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";
import { MotionConfig, AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!globalThis.navigator) return;
    // FaceAI.getInstance().init();
  }, []);
  const [initial, setInitial] = useState(true);
  const [nextSlide, setNextSlide] = useState(999);
  const [cancelAnims, setCancelAnims] = useState(false);
  useEffect(() => {
    setInitial(false);
    // log innerWidth and innerHeight on mount every 10ms for 2000ms
  }, []);
  useEffect(() => {
    setNextSlide((n) => n - 1);
    const interval = setInterval(() => {
      console.log(window.innerWidth, window.innerHeight);
    }, 10);
    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
    let slide1Px = window.innerWidth * window.innerHeight;
    const checkingInt = setInterval(() => {
      // if current size is smaller than 1px, then we are on mobile
      if (window.innerWidth * window.innerHeight !== slide1Px) {
        setCancelAnims(true);
      }
    }, 10);
    setTimeout(() => {
      clearInterval(checkingInt);
    }, 200);
  }, [router.pathname]);
  return (
    <>
      <Head>
        <title>Aaaa</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* <link rel="icon" href="/volant.svg" /> */}
      </Head>
      <ProgressBar />
      {/* <div className={`w-full min-h-screen flex flex-col bg-gray-850`}>
        <Component {...pageProps} />
      </div> */}
      <MotionConfig reducedMotion="user">
        <AnimatePresence>
          <motion.div
            key={router.pathname}
            initial={
              initial || cancelAnims
                ? undefined
                : { opacity: 0, left: "-100vw" }
            }
            animate={{ opacity: 1, left: 0 }}
            exit={
              cancelAnims
                ? undefined
                : {
                    opacity: 0,
                    left: "100vw",
                    scale: 0.5,
                    transition: {
                      duration: 1,
                      type: "spring",
                      bounce: 0.2,
                    },
                  }
            }
            transition={{ type: "spring", bounce: 0.2 }}
            className={`absolute w-full min-h-screen flex flex-col bg-gray-850`}
            style={{
              zIndex: nextSlide,
            }}
          >
            <Component {...pageProps} />
          </motion.div>

        </AnimatePresence>
      </MotionConfig>
      <div className={`z-0 bg-gray-850 w-screen h-screen fixed top-0 left-0`} />
    </>
  );
}

export default MyApp;
