import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color } from "p5";
import { Box } from "../Games/DragAndDrop/Box";
import { Circle } from "../Games/DragAndDrop/Circle";
import { ShapeManager } from "../Games/DragAndDrop/ShapeManager";



export const dragandDropSketch = (p5: P5CanvasInstance) => {
  let startTime = 0;
  let totalTime = 0;
  let points = 0;
  const shapeManager = ShapeManager.getInstance(); // Create a new shape manager.
  const box = new Box({ x: 100, y: 200 }, 200, p5, { x: 500, y: 300 });
  const newBox = new Box({ x: 200, y: 300 }, 100, p5, { x: 600, y: 150 });
  const newCircle = new Circle({x: 50, y: 100 }, 50, p5, { x: 600, y: 150});
  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    startTime = Date.now();
  };
  p5.mousePressed = () => {
    const selectedShape = ShapeManager.getInstance().determineShapeClicked(
      p5.mouseX,
      p5.mouseY
    );
    console.log("mouse pressed", selectedShape);
  };
  p5.mouseDragged = () => {
    const selectedShape = ShapeManager.getInstance().determineShapeClicked(
      p5.mouseX,
      p5.mouseY
    );
    console.log("mouse dragged", selectedShape, p5.mouseX, p5.mouseY);
    if (selectedShape) {
      ShapeManager.getInstance().lockShapeToMouse(selectedShape, p5);
    }
    ShapeManager.getInstance().mouseMoveUpdate(p5);
  };
  p5.mouseReleased = () => {
    ShapeManager.getInstance().releaseShapeFromMouse();
  };
  p5.draw = () => {
    p5.background(222);
    //shape holes

    if ((points = 6)) {
      totalTime = (startTime - Date.now()) / 1000;
    }
    ShapeManager.getInstance().drawShapes(p5);
  };
};
