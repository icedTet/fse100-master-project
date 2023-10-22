import { useState, useEffect, useMemo } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { demoSketch } from "../../components/sketches/demoSketch";
import { labyrinthEscapeSketch } from "../../components/sketches/labyrinthEscape";
import Link from "next/link";
import { TypingTypistGame } from "../../components/Games/TypingTypist/Typer";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";

export const DemoPage = () => {
  const [rotation, setRotation] = useState(0);
  const game = useMemo(() => {
    return new TypingTypistGame(200, 1);
  }, []);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState(game.getNextWord());
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setCurrentWord(game.getNextWord());
    }
  }, [countdown]);

  useEffect(() => {
    const interval = setInterval(
      () => setRotation((rotation) => rotation + 10),
      50
    );

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div
        className={`w-full h-full flex flex-col items-center justify-center gap-8`}
      >
        <h1 className={`text-6xl text-gray-200 font-black`}>
          ⌨️ Typing Typist...
        </h1>
        <div className={`relative w-full`}>
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
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
            animate={countdown >= 5 ? "visible" : "hidden"}
          >
            <span
              className={`text-4xl font-black text-gray-200 absolute top-0 left-1/2 -translate-x-1/2 w-max`}
            >
              Get Ready
            </span>
          </motion.div>
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
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
            animate={countdown <= 1 ? "visible" : "hidden"}
          >
            <span
              className={`text-4xl font-black text-gray-200 absolute top-0 left-1/2 -translate-x-1/2 w-max`}
            >
              Go!
            </span>
          </motion.div>
          {[3, 2, 1].map((c) => (
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 100,
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
              animate={countdown === c + 1 ? "visible" : "hidden"}
            >
              <span
                className={`text-4xl font-bold text-gray-200 absolute top-0 left-1/2 -translate-x-1/2 w-max`}
              >
                {c}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default DemoPage;
