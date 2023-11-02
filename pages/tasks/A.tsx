import { useState, useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { demoSketch } from "../../components/sketches/demoSketch";
import { dragandDropSketch } from "../../components/sketches/dragAndDropNew";
import { HiChevronLeft, HiMenu, HiQuestionMarkCircle } from "react-icons/hi";
import { ShapeManager } from "../../components/Games/DragAndDrop/ShapeManager";
import TetLib from "../../utils/TetLib";
import { useRouter } from "next/router";
import Link from "next/link";

export const DemoPage = () => {
  const [rotation, setRotation] = useState(0);
  const [timer, setTimer] = useState(0);
  const [points, setPoints] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(
      () => setRotation((rotation) => rotation + 10),
      50
    );

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    let inter: NodeJS.Timeout;
    if (!ShapeManager.getInstance().startTime)
      ShapeManager.getInstance().once("start", (time: number) => {
        inter = setInterval(() => {
          setTimer(Date.now() - time);
        }, 10);
      });
    else {
      inter = setInterval(() => {
        setTimer(Date.now() - ShapeManager.getInstance().startTime!);
      }, 10);
    }
    return () => {
      clearInterval(inter);
    };
  }, []);
  useEffect(() => {
    const newPoints = (points: number) => {
      setPoints(points);
      if (points === ShapeManager.getInstance().getShapes().size) {
        router.push(
          `/tasks/complete/dnd?attemptTime=${
            Date.now() - ShapeManager.getInstance().startTime!
          }&score=${points}`
        );
      }
    };
    ShapeManager.getInstance().on("points", newPoints);
    return () => {
      ShapeManager.getInstance().off("points", newPoints);
    };
  }, []);

  return (
    <div className={`w-full h-full flex flex-col relative`}>
      <div className={`group flex justify-between absolute w-full h-0`}>
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
                ShapeManager.getInstance().stop();
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
                Drag and Drop
              </h1>
              <p className={`text-white whitespace-nowrap`}>
                Drag and drop the images to the correct boxes.
              </p>
            </div>
          </div>
        </div>
        <div
          className={`relative group bg-gray-800/50 top-[1.875rem] right-4 p-6 h-20 rounded-2xl backdrop-blur-lg flex flex-row gap-4 items-center ring ring-gray-100/10 pointer-events-none `}
        >
          <span
            className={`text-2xl w-20 text-center font-bold text-gray-100/40`}
          >
            {TetLib.StopwatchFormat(timer)}
          </span>
          <span className={`text-2xl w-20 text-center font-bold text-gray-300`}>
            {points}/{ShapeManager.getInstance().getShapes().size}
          </span>
        </div>
      </div>
      <NextReactP5Wrapper sketch={dragandDropSketch} rotation={rotation} />
    </div>
  );
};
export default DemoPage;
