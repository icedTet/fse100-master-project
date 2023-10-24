import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color } from "p5";
import { Box } from "../Games/DragAndDrop/Box";
import { Circle } from "../Games/DragAndDrop/Circle";
import { ShapeManager } from "../Games/DragAndDrop/ShapeManager";
import { Triangle } from "../Games/DragAndDrop/Triangle";
import { EquilateralT } from "../Games/DragAndDrop/EquilateralT";



export const dragandDropSketch = (p5: P5CanvasInstance) => {
  let startTime = 0;
  let totalTime = 0;
  let points = 0;
  const shapeManager = ShapeManager.getInstance(); // Create a new shape manager.

// rng shape placements, each variable is based off of the size of the window so the position will work on biggest screens as well
//big box
  for(let i=0 ;i<1;i++){
    let a =20 +Math.random()*window.innerWidth/3;
    let b =20 + Math.random()*window.innerHeight/3;
    let c = window.innerWidth/2 + Math.random()*window.innerWidth/4;
    let d = window.innerHeight - window.innerHeight*.25;
    const box = new Box({ x: a, y: b }, 200, p5, { x: c, y: d });
  }
  //small box
  for(let i=0 ;i<1;i++){
    let a =20 +Math.random()*window.innerWidth/3;
    let b =20 + Math.random()*window.innerHeight/3;
    let c = window.innerWidth/2 + Math.random()*window.innerWidth/4;
    let d = window.innerHeight - window.innerHeight*.4;
    const newBox = new Box({ x: a, y: b }, 100, p5, { x: c, y: d });
  }
  //circle
  for(let i=0 ;i<1;i++){
    let a =45 +Math.random()*window.innerWidth/3;
    let b =45 + Math.random()*window.innerHeight/3;
    let c = window.innerWidth/2 + Math.random()*window.innerWidth/3;
    let d = window.innerHeight - window.innerHeight*.5;
    const newCircle = new Circle({x: a, y: b }, 100, p5, { x: c, y: d});
  }
 
  for(let i=0 ;i<1;i++){
    let a =20 +Math.random()*window.innerWidth/3;
    let b =20 + Math.random()*window.innerHeight/3;
    let c = window.innerWidth/2 + Math.random()*window.innerWidth/4;
    let d = window.innerHeight - window.innerHeight*.4;
    const newBox = new Triangle({ x: a, y: b }, 100, p5, { x: c, y: d });
  }
 
  for(let i=0 ;i<1;i++){
    let a =20 +Math.random()*window.innerWidth/3;
    let b =20 + Math.random()*window.innerHeight/3;
    let c = window.innerWidth/2 + Math.random()*window.innerWidth/4;
    let d = window.innerHeight - window.innerHeight*.4;
    const newBox = new EquilateralT({ boxStart: { x: a, y: b }, boxSize: 100, p5, destination: { x: c, y: d } });
  }

  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    startTime = Date.now();
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
    p5.clear(20,20,20,100);
    // p5.background(20,0);
    //shape holes

    if ((points = 6)) {
      totalTime = (startTime - Date.now()) / 1000;
    }
    ShapeManager.getInstance().drawShapes(p5);
  };
};
