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
  for(let i=0 ;i<1;i++){
    let a =20 +Math.random()*window.innerWidth/3;
    let b =20 + Math.random()*window.innerHeight/3;
    let c =Math.random()*window.innerWidth/2;
    let d = Math.random()*window.innerHeight/2;
    const box = new Box({ x: a, y: b }, 200, p5, { x: c, y: d });
  }
  for(let i=0 ;i<1;i++){
    let a =50 +Math.random()*100;
    let b =500 -Math.random()*100;

    const newBox = new Box({ x: a, y: b }, 100, p5, { x: 500, y: 300 });
  }
  
 
  const newCircle = new Circle({x: 50, y: 100 }, 100, p5, { x: 600, y: 150});
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
