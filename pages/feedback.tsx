import { useRef, useState, useEffect } from "react";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useWindowSize } from "react-use";
import Link from "next/link";
const ConfettiCanvas = dynamic(() => import("react-confetti"), { ssr: false });

export const FeedbackForum = () => {
  const iframeThing = useRef<HTMLIFrameElement>(null);
  const [hue, setHue] = useState(0);
  const [preLoaded, setpreLoaded] = useState(0);
  const { width, height } = useWindowSize();
  useEffect(() => {
    const int = setInterval(() => {
      setHue((h) => (h + 1) % 360);
    }, 20);
    return () => {
      clearInterval(int);
    };
  }, []);
  return (
    <Layout className={` max-h-screen overflow-hidden`}>
      <div className={`w-full h-full grow flex flex-col`}>
        <motion.div
          className={`flex flex-col gap-32 items-center justify-between h-full grow pb-8 ${
            preLoaded > 2 && `hidden`
          }`}
          variants={{
            hidden: {
              opacity: 0,
              y: 200,
              // scale: 0,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                type: "spring",
                bounce: 0.5,
              },
            },
          }}
          animate={(globalThis.window ? preLoaded !== 1 ? "hidden" : "visible" : false)}
        >
          <div
            className={`w-full h-full grow flex flex-col`}
            style={{
              filter: `hue-rotate(${hue}deg)`,
            }}
          >
            <iframe
              // src="https://docs.google.com/forms/d/e/1FAIpQLScUIfla_1vL6EplxlZykjjzDbMgIofQ2PcznmrDf0rMkIAScg/viewform?embedded=true&usp=pp_url&entry.1543329165=4th+pick&entry.333647976=2nd+pick&entry.907634041=1st+pick&entry.455228998=3rd+pick"
              src="https://docs.google.com/forms/d/e/1FAIpQLScv6b7Yror0UbPyphNARG3naH3iY_jZpy2hohR5_LZW2TO68A/viewform?embedded=true&usp=pp_url&entry.1543329165=4th+pick&entry.333647976=2nd+pick&entry.907634041=1st+pick&entry.455228998=3rd+pick"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              className={`w-full h-full dark:invert-[0.85] grow drop-shadow-lg`}
              height={`100%`}
              onLoad={(e) => {
                console.log(
                  Object.keys(
                    globalThis?.window?.document?.getElementById?.("gform") ||
                      {}
                  )
                );
                if (!preLoaded) setpreLoaded(1);
                if (preLoaded) {
                  setpreLoaded(3);
                  setTimeout(() => {}, 20);
                }
              }}
              ref={iframeThing}
              id="gform"
            />
          </div>
        </motion.div>
        <motion.div
          className={`flex flex-col gap-32 items-center justify-center h-full grow pb-8 ${
            preLoaded < 2 && `hidden`
          }`}
          variants={{
            hidden: {
              opacity: 0,
              y: 200,
              // scale: 0,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                type: "spring",
                bounce: 0.5,
              },
            },
          }}
          animate={preLoaded <= 1 ? "hidden" : "visible"}
        >
          <div
            className={`p-px bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-3xl w-full relative group max-w-prose z-30`}
          >
            <div
              className={`p-16 bg-gray-800 rounded-3xl flex flex-col gap-6 h-full`}
            >
              <div
                className={`flex flex-col gap-6 grow items-center justify-center`}
              >
                <div
                  className={`flex flex-row bg-gray-850 w-20 h-20 rounded-full items-center justify-center shrink-0`}
                >
                  <span className={`text-5xl`}>🏆</span>
                </div>
                <div className={`flex flex-col gap-4 grow`}>
                  <span
                    className={`text-gray-100 text-4xl font-bold font-poppins`}
                  >
                    Thank you!
                  </span>
                  <span
                    className={`text-gray-100/60 text-lg font-normal font-wsans leading-tight tracking-tight grow`}
                  >
                    Your feedback is greatly appreciated and will help us
                    improve the site for everyone!
                  </span>
                  <Link href={`/`}>
                    <button
                      className={`bg-gray-700/40 p-3 rounded-lg w-full hover:bg-gray-600 transition-all text-gray-100/60`}
                    >
                      Back to Home
                    </button>
                  </Link>
                  {/* <span
                className={`text-gray-100/60 text-lg font-normal font-wsans leading-tight tracking-tight grow`}
              >
                aa
              </span> */}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {preLoaded >= 2 && (
          <ConfettiCanvas
            width={width}
            height={height}
            className={`absolute top-0 left-0 w-screen h-screen`}
            recycle={true}
            gravity={0.2}
          />
        )}
      </div>
    </Layout>
  );
};
export default FeedbackForum;
