import { useState, useEffect } from "react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { demoSketch } from "../../components/sketches/demoSketch";

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
      <h1 className={`text-6xl text-red-500`}>Hello Next.js 👋</h1>
      <span className={`text-4xl text-gray-800`}>This is a demo page</span>
      <NextReactP5Wrapper sketch={demoSketch} rotation={rotation} />
    </div>
  );
};
export default DemoPage;
