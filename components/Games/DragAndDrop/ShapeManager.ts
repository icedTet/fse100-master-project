import { P5CanvasInstance } from "@p5-wrapper/react";
import { Shape, Coordinate } from "./dndTypes";
import EventEmitter from "events";
import p5 from "p5";
import { Box } from "./Box";

export class ShapeManager extends EventEmitter {
  static instance: ShapeManager;
  static getInstance() {
    if (!ShapeManager.instance) {
      ShapeManager.instance = new ShapeManager();
    }
    return ShapeManager.instance;
  }
  shapes: Map<number, Shape>;
  draggedShape: Shape | null = null;
  nextShapeID: number = 0;
  lastMousePosition: Coordinate = { x: 0, y: 0 };
  startTime: number = 0;
  private lastPointTally: number = 0;
  private constructor() {
    super();
    this.shapes = new Map();
  }
  start() {
    this.startTime = Date.now();
    this.emit("start", this.startTime);
  }
  stop() {
    this.emit("stop", Date.now());
    this.shapes.clear();
    this.draggedShape = null;
    this.nextShapeID = 0;
    this.lastMousePosition = { x: 0, y: 0 };
    this.startTime = 0;
    this.lastPointTally = 0;

  }
  addShape(shape: Shape) {
//for shapes
    const shapes = Array.from(this.shapes.values())
    let anyOverlapping = true;
    let attempts = 0;
    while (anyOverlapping) {
      let all = 0;
      for (let i = 0; i < this.shapes.size; i++) {
        // console.log(shape,shapes[i], this.isOverlapping(shape,shapes[i]))
       if (this.isOverlapping(shapes[i],shape)) {anyOverlapping = true;}
       else all++
      }
      if (all === this.shapes.size) anyOverlapping = false;
      if (anyOverlapping){
        let x = 120 + Math.random() * (window.innerWidth / 2 - 230);
        let y = 120 + Math.random() * (window.innerHeight - 230);
        shape.updatePosition({ x, y }, true);
        attempts++
        // console.log(attempts)
        if (attempts > 10000) {
          // console.log("Forced break for shape",shape);
          break;
        }
        // console.log(shapes[i], shape, "overlap", Math.sqrt((a.center.x - b.center.x) ** 2 + (a.center.y - b.center.y) ** 2), a.center.x, b.center.x, a.center.y, b.center.y, i, a.radius + b.radius)
      }
    }
    attempts = 0;
    anyOverlapping = true;
//for holes
    while (anyOverlapping) {
      let all = 0;
      for (let i = 0; i < this.shapes.size; i++) {
        // console.log(shape,shapes[i], this.isOverlapping(shape,shapes[i]))
       if (this.holeIsOverlapping(shapes[i],shape)) {anyOverlapping = true;}
       else all++
      }
      if (all === this.shapes.size) anyOverlapping = false;
      if (anyOverlapping){
        let x = 120+window.innerWidth/2+Math.random()*(window.innerWidth/2-230);
        let y = 120+Math.random()*(window.innerHeight-230);
        shape.updateHolePosition({ x, y }, true);
        attempts++
        console.log(attempts)
        if (attempts > 10000) {
          console.log("Forced break for shape",shape);
          break;
        }
        // console.log(shapes[i], shape, "overlap", Math.sqrt((a.center.x - b.center.x) ** 2 + (a.center.y - b.center.y) ** 2), a.center.x, b.center.x, a.center.y, b.center.y, i, a.radius + b.radius)
      }
    }
    console.log(attempts)
    shape.id = this.nextShapeID;
    this.shapes.set(this.nextShapeID, shape);
    this.nextShapeID++;
    return this.shapes.get(this.nextShapeID - 1);
  }
  removeShape(shapeID: number) {
    this.shapes.delete(shapeID);
  }
  getShape(shapeID: number) {
    return this.shapes.get(shapeID);
  }
  getShapes() {
    return this.shapes;
  }
  countPoints() {
    let points = 0;
    this.shapes.forEach((shape) => {
      if (shape.correct) points++;
    });
    if (points > this.lastPointTally) {
      this.emit("points", points);
      this.lastPointTally = points;
    }
    return points;
  }
  drawShapes(p5: P5CanvasInstance) {
    // console.log("drawing shapes");
    this.shapes.forEach((shape) => shape.draw(p5));
  }
  determineShapeClicked(x: number, y: number) {
    if (this.draggedShape) return this.draggedShape;
    let shapeClicked = null as Shape | null;
    this.shapes.forEach((shape) => {
      if (shape.isClickingOnShape(x, y) && !shape.correct) {
        shapeClicked = shape;
      }
    });
    return shapeClicked;
  }
  releaseShapeFromMouse() {
    this.draggedShape = null;
    ShapeManager.getInstance().countPoints()
  }
  lockShapeToMouse(shape: Shape, p5: P5CanvasInstance) {
    if (this.draggedShape) return;
    this.draggedShape = shape;
    this.lastMousePosition = { x: p5.mouseX, y: p5.mouseY };
  }
  mouseMoveUpdate(p5: P5CanvasInstance) {
    if (this.draggedShape) {
      const deltaX = p5.mouseX - this.lastMousePosition.x;
      const deltaY = p5.mouseY - this.lastMousePosition.y;
      this.draggedShape.updatePosition({
        x: deltaX,
        y: deltaY,
      });
      this.lastMousePosition = { x: p5.mouseX, y: p5.mouseY };
    }
  }
  isOverlapping(a: Shape, b: Shape) {
    if (!a.center || !b.center) {
      console.log(a, b);
      alert("Centerless found")
    }
    // console.log("Overlap Check", Math.sqrt((a.center.x - b.center.x) ** 2 + (a.center.y - b.center.y) ** 2))

    let d = Math.sqrt((a.center.x - b.center.x) ** 2 + (a.center.y - b.center.y) ** 2)
    return d <= a.radius + b.radius;
  }

  holeIsOverlapping(a: Shape, b: Shape) {
    if (!a.destinationCenter || !b.destinationCenter) {
      console.log(a, b);
      alert("Centerless found")
    }
    // console.log("Overlap Check", Math.sqrt((a.center.x - b.center.x) ** 2 + (a.center.y - b.center.y) ** 2))

    let d = Math.sqrt((a.destinationCenter.x - b.destinationCenter.x) ** 2 + (a.destinationCenter.y - b.destinationCenter.y) ** 2)
    return d <= a.radius + b.radius;
  }

}
