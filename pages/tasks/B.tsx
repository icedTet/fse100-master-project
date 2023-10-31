import { useState, useEffect, useMemo, useLayoutEffect, useRef } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { demoSketch } from "../../components/sketches/demoSketch";
import { labyrinthEscapeSketch } from "../../components/sketches/labyrinthEscape";
import Link from "next/link";
import { TypingTypistGame } from "../../components/Games/TypingTypist/Typer";
import Layout from "../../components/Layout";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TetLib from "../../utils/TetLib";
import wordList from "../../public/words.json";
const TypistCountdown = dynamic(
  () => import("../../components/Games/TypingTypist/TypistCountdown"),
  { ssr: false }
);

export const DemoPage = (props: { list: string[] }) => {
  const [rotation, setRotation] = useState(0);
  const { list } = props;
  const [wordPosition, setWordPosition] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputBox = useRef<HTMLInputElement>(null);
  console.log(list);
  useLayoutEffect(() => {
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
    }
  }, [countdown]);
  useEffect(() => {
    if (inputValue === list[wordPosition]) {
      
      setWordPosition(wordPosition + 1);
      setInputValue("");
    }
  }, [inputValue, wordPosition]);
  useLayoutEffect(() => {
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
        className={`w-full h-full flex flex-col items-center justify-center gap-8 grow `}
      >
        {/* <TypistCountdown countdown={countdown} /> */}
        <div className="flex flex-col gap-32 items-center justify-between">
          <div className={`relative w-[100ch] max-w-[90vw]`}>
            <div
              className={` flex flex-row items-baseline justify-center gap-4 flex-wrap h-72`}
            >
              {list.map((word, index) => {
                if (index < wordPosition - 20) {
                  return null;
                }
                if (index > wordPosition + 40) {
                  return null;
                }

                return (
                  <span
                    key={`${index}-word-${word}`}
                    className={`${
                      index === wordPosition
                        ? `text-3xl text-gray-100/80 font-bold`
                        : `text-lg text-gray-100/30 font-light`
                    } transition-all duration-300`}
                  >
                    {word}
                  </span>
                );
              })}
              {/* <span className={`text-6xl text-gray-100/80 font-bold`}>
                {wordPosition < list.length
                  ? list[wordPosition]
                  : "Game Complete!"}
              </span> */}
            </div>
          </div>
          <div className={`flex flex-col gap-2 w-full`}>
            <input
              type="text"
              className={`bg-gray-800 text-gray-100/80 px-6 py-3 rounded-2xl w-full text-4xl font-medium font-wsans focus:outline-none focus:ring-purple-500 ring-4 transition-all ring-transparent`}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              value={inputValue}
              autoFocus
              ref={inputBox}
              onBlur={() => {
                inputBox.current?.focus();
              }}
            />
            <div className={`flex flex-col gap-4`}>
              <p className={`text-gray-200/50 text-base`}>
                {TetLib.StopwatchFormat(2000000)} left
              </p>
            </div>
          </div>
          <div
            className={`bg-gray-800/50  p-6 rounded-2xl backdrop-blur-lg flex flex-row gap-8 items-center border border-gray-100/10`}
          >
            <div className={`flex flex-col`}>
              <h1 className={`text-3xl font-bold text-white`}>Time Left</h1>
              <p className={`text-white text-lg`}>
                {TetLib.StopwatchFormat(0)}
              </p>
            </div>
            <div className={`flex flex-col`}>
              <h1 className={`text-3xl font-bold text-white`}>
                Current Points
              </h1>
              <p className={`text-white text-lg`}>0</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DemoPage;
export const getServerSideProps = async () => {
  const shuffled = TetLib.shuffle([...wordList]);
  console.log(shuffled);
  return {
    props: {
      list: shuffled,
    },
  };
};
