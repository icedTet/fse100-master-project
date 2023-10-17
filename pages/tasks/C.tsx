import { useState, useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { demoSketch } from "../../components/sketches/demoSketch";
import { labyrinthEscapeSketch } from "../../components/sketches/labyrinthEscape";
import Link from "next/link";

export const DemoPage = () => {
  const [rotation, setRotation] = useState(0);

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
    <div className={`w-full h-full flex flex-col items-center justify-center`}>
      <h1 className={`text-6xl text-red-500`}>This is an unfinished game</h1>
      <span className={`text-4xl text-gray-200`}>Labyrinth Escape!</span>
      <Link href="/">
        <span className={`text-4xl hover:text-purple-200 underline text-purple-600`}>Go back home</span>
      </Link>
      {/* <NextReactP5Wrapper sketch={labyrinthEscapeSketch} rotation={rotation} /> */}
    </div>
  );
};
export default DemoPage;
