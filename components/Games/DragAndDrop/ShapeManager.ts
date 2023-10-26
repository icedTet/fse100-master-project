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
  isOverlapping(a: Shape, b:Shape) {
    let d = a.p5.dist(a.center.x, a.center.y, b.center.x, b.center.y);
    return d > a.radius+b.radius;
  }

}
