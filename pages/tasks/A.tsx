import { useState, useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { demoSketch } from "../../components/sketches/demoSketch";
import { dragandDropSketch } from "../../components/sketches/dragAndDropNew";
import { HiChevronLeft } from "react-icons/hi";
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
    <div
      className={`w-full h-full flex flex-col items-center justify-center relative`}
    >
      <div
        className={`bg-gray-800/50 absolute top-4 left-4 p-6 rounded-2xl backdrop-blur-lg flex flex-row gap-4 items-center border border-gray-100/10`}
      >
        <Link href={`/`} onClick={()=>{
          ShapeManager.getInstance().stop();
        }}>
          <div
            className={`bg-gray-700/50 h-12 aspect-square flex flex-row items-center justify-center rounded-xl cursor-pointer hover:bg-gray-600 transition-all duration-150`}
          >
            <HiChevronLeft className={`text-white text-2xl`} />
          </div>
        </Link>
        <div className={`flex flex-col`}>
          <h1 className={`text-2xl font-bold text-white`}>Drag and Drop</h1>
          <p className={`text-white`}>
            Drag and drop the images to the correct boxes.
          </p>
        </div>
      </div>
      <div
        className={`bg-gray-800/50 absolute top-4 right-4 p-6 rounded-2xl backdrop-blur-lg flex flex-row gap-4 items-center border border-gray-100/10`}
      >
        <div className={`flex flex-col`}>
          <h1 className={`text-3xl font-bold text-white`}>Current Time</h1>
          <p className={`text-white text-lg`}>
            {TetLib.StopwatchFormat(timer)}
          </p>
        </div>
        <div className={`flex flex-col`}>
          <h1 className={`text-3xl font-bold text-white`}>Current Points</h1>
          <p className={`text-white text-lg`}>
            {points}/{ShapeManager.getInstance().getShapes().size}
          </p>
        </div>
      </div>
      <NextReactP5Wrapper sketch={dragandDropSketch} rotation={rotation} />
    </div>
  );
};
export default DemoPage;
