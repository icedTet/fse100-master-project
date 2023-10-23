import { P5CanvasInstance } from "@p5-wrapper/react";
import { Shape, Coordinate } from "./dndTypes";

export class ShapeManager {
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
    private constructor() {
      this.shapes = new Map();
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
  }