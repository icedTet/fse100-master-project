import { useState, useEffect, useLayoutEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { demoSketch } from "../../components/sketches/demoSketch";
import { labyrinthEscapeSketch } from "../../components/sketches/labyrinthEscape";
import Link from "next/link";
import { HiMenu, HiChevronLeft } from "react-icons/hi";
import TetLib from "../../utils/TetLib";
import { PlayerManager } from "../../components/Games/LabyrinthEscape/PlayerManager";
import { time } from "console";
import { useRouter } from "next/router";

export const DemoPage = () => {
  const [timer, setTimer] = useState(0);
  const router = useRouter();
  useLayoutEffect(() => {

  }, []);
  useEffect(() => {
    let inter: NodeJS.Timeout;
    if (!PlayerManager.getInstance().startTime)
      PlayerManager.getInstance().once("start", (time: number) => {
        inter = setInterval(() => {
          setTimer(PlayerManager.getInstance().totalTime || Date.now() - time);
        }, 10);
      });
    else {
      inter = setInterval(() => {
        setTimer(
          PlayerManager.getInstance().totalTime ||
            Date.now() - PlayerManager.getInstance().startTime!
        );
      }, 10);
    }
    PlayerManager.getInstance().on(
      "gameOver",
      (data: { time: number; acc: number }) => {
        const { time, acc } = data;
        router.push(
          `/tasks/complete/laby?attemptTime=${~~(time * 1000)}&score=${~~(
            acc * 10000
          )}`
        );
      }
    );
    return () => {
      clearInterval(inter);
    };
  }, []);
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center grow`}
    >
      <div className={`group flex justify-between absolute w-full h-0 top-0`}>
        <div className={`relative w-max group`}>
          <div
            className={`absolute top-[2.75rem] left-10 z-10 p-3 bg-gray-700/50 rounded-xl group cursor-pointer hover:opacity-0 transition-all duration-150 opacity-100`}
          >
            <HiMenu className={`text-white text-2xl `} />
          </div>
          <div
            className={`bg-gray-800/50 absolute top-4 left-4 p-6 rounded-2xl backdrop-blur-lg flex flex-row gap-4 items-center ring ring-gray-100/10 opacity-0 group-hover:opacity-100 transition-all -translate-x-full group-hover:translate-x-0 pointer-events-none group-hover:pointer-events-auto z-30`}
          >
            <Link
              href={`/`}
              onClick={() => {
                // ShapeManager.getInstance().stop();
                PlayerManager.getInstance().reset();
              }}
            >
              <div
                className={`bg-gray-700/50 h-12 aspect-square flex flex-row items-center justify-center rounded-xl cursor-pointer hover:bg-gray-600 transition-all duration-150 z-30`}
              >
                <HiChevronLeft className={`text-white text-2xl`} />
              </div>
            </Link>
            <div className={`flex flex-col w-max`}>
              <h1 className={`text-2xl font-bold text-white whitespace-nowrap`}>
                Labryinth Escape {
                  `I`.repeat(PlayerManager.getInstance().difficulty)
                }
              </h1>
              <p className={`text-white whitespace-nowrap`}>
                Move the square to the red goal.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`relative group bg-gray-800/30 top-[1.875rem] right-4 p-6 h-20 rounded-2xl backdrop-blur-sm flex flex-row gap-4 items-center ring ring-gray-100/10 pointer-events-none `}
        >
          <span
            className={`text-2xl min-w-20 text-center font-bold text-gray-100/40`}
          >
            {!timer
              ? `Click on the square to start!`
              : TetLib.StopwatchFormat(timer)}
          </span>
          {PlayerManager.getInstance().active?.map.squares.length && (
            <span
              className={`text-2xl w-20 text-center font-bold text-gray-300`}
            >
              {PlayerManager.getInstance().active?.map.squares.reduce(
                (acc, curr) => acc + (curr.correct ? 1 : 0),
                -1
              )}
              /
              {(PlayerManager.getInstance().active?.map.squares.length || 1) -
                1}
            </span>
          )}
        </div>
      </div>

      <NextReactP5Wrapper sketch={labyrinthEscapeSketch} />
    </div>
  );
};
export default DemoPage;
