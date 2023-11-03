import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color } from "p5";
import { Box } from "../Games/DragAndDrop/Box";
import { Circle } from "../Games/DragAndDrop/Circle";
import { ShapeManager } from "../Games/DragAndDrop/ShapeManager";
import { Triangle } from "../Games/DragAndDrop/Triangle";
import { EquilateralT } from "../Games/DragAndDrop/EquilateralT";
import { Shape } from "../Games/DragAndDrop/dndTypes";

function genShapes(p5: P5CanvasInstance) {
  // rng shape placements, each variable is based off of the size of the window so the position will work on biggest screens as well
  //big box
  for (let i = 0; i < 1; i++) {
    let a = 10 + Math.random() * (window.innerWidth / 2 - 210);
    let b = 100 + Math.random() * (window.innerHeight - 300);
    let c =
      10 +
      window.innerWidth / 2 +
      Math.random() * (window.innerWidth / 2 - 210);
    let d = 100 + Math.random() * (window.innerHeight - 300);
    const box = new Box({ x: a, y: b }, 200, p5, { x: c, y: d });
  }
  for (let i = 0; i < 1; i++) {
    let a = 120 + Math.random() * (window.innerWidth / 2 - 240);
    let b = 120 + Math.random() * (window.innerHeight - 240);
    let c =
      120 +
      window.innerWidth / 2 +
      Math.random() * (window.innerWidth / 2 - 240);
    let d = 120 + Math.random() * (window.innerHeight - 240);
    const newCircle = new Circle({ x: a, y: b }, 200, p5, { x: c, y: d });
  }
  //small box
  for (let i = 0; i < 1; i++) {
    let a = 10 + Math.random() * (window.innerWidth / 2 - 110);
    let b = 10 + Math.random() * (window.innerHeight - 110);
    let c =
      10 +
      window.innerWidth / 2 +
      Math.random() * (window.innerWidth / 2 - 110);
    let d = 10 + Math.random() * (window.innerHeight - 110);
    const newBox = new Box({ x: a, y: b }, 100, p5, { x: c, y: d });
  }
  //circle
  for (let i = 0; i < 1; i++) {
    let a = 60 + Math.random() * (window.innerWidth / 2 - 120);
    let b = 60 + Math.random() * (window.innerHeight - 120);
    let c =
      60 +
      window.innerWidth / 2 +
      Math.random() * (window.innerWidth / 2 - 120);
    let d = 60 + Math.random() * (window.innerHeight - 120);
    const newCircle = new Circle({ x: a, y: b }, 100, p5, { x: c, y: d });
  }

  for (let i = 0; i < 1; i++) {
    let a = 10 + Math.random() * (window.innerWidth / 2 - 110);
    let b = 10 + Math.random() * (window.innerHeight - 110);
    let c =
      10 +
      window.innerWidth / 2 +
      Math.random() * (window.innerWidth / 2 - 110);
    let d = 10 + Math.random() * (window.innerHeight - 110);
    const newBox = new Triangle({ x: a, y: b }, 100, p5, { x: c, y: d });
  }

  for (let i = 0; i < 1; i++) {
    let a = 10 + Math.random() * (window.innerWidth / 2 - 120);
    let b = 110 + Math.random() * (window.innerHeight - 120);
    let c =
      10 +
      window.innerWidth / 2 +
      Math.random() * (window.innerWidth / 2 - 120);
    let d = 110 + Math.random() * (window.innerHeight - 120);
    const newBox = new EquilateralT({
      boxStart: { x: a, y: b },
      boxSize: 100,
      p5,
      destination: { x: c, y: d },
    });
  }
}

export const dragandDropSketch = (p5: P5CanvasInstance) => {
  let startTime = 0;
  let totalTime = 0;
  let points = 0;
  const shapeManager = ShapeManager.getInstance(); // Create a new shape manager.
  // setInterval(() => {
  //   ShapeManager.getInstance().stop();
  //   genShapes(p5);
  // }, 50);
  genShapes(p5);
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    ShapeManager.getInstance().start();
  };
  p5.mousePressed = () => {
    const selectedShape = ShapeManager.getInstance().determineShapeClicked(
      p5.mouseX,
      p5.mouseY
    );
  };
  p5.mouseDragged = () => {
    const selectedShape = ShapeManager.getInstance().determineShapeClicked(
      p5.mouseX,
      p5.mouseY
    );
    if (selectedShape) {
      ShapeManager.getInstance().lockShapeToMouse(selectedShape, p5);
    }
    ShapeManager.getInstance().mouseMoveUpdate(p5);
  };
  p5.mouseReleased = () => {
    ShapeManager.getInstance().releaseShapeFromMouse();
  };
  p5.draw = () => {
    p5.clear(20, 20, 20, 100);

    ShapeManager.getInstance().drawShapes(p5);
  };
};
