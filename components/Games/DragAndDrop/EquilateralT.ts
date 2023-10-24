import { P5CanvasInstance } from "@p5-wrapper/react";
import { ShapeManager } from "./ShapeManager";
import { Shape, Coordinate } from "./dndTypes";
//WHY ISNT THIS WORKING!
let e = 0;
export class EquilateralT implements Shape {
  x: number;
  y: number;
  boxSize: number;
  p5: P5CanvasInstance;
  destination: Coordinate;
  tolerance: number;
  correct: boolean = false;
  constructor(
{ boxStart, boxSize, p5, destination }: { boxStart: Coordinate; boxSize: number; p5: P5CanvasInstance; destination: Coordinate; }  ) {
    this.x = boxStart.x;
    this.y = boxStart.y;
    this.boxSize = boxSize;
    this.p5 = p5;
    this.destination = destination;
    this.tolerance = 0.2;
    ShapeManager.getInstance().addShape(this);
  }
  id?: number | undefined;
  /**
   * Checks if the mouse (or the coordinates) is clicking on the shape.
   * @param x the x coordinate of the mouse
   * @param y the y coordinate of the mouse
   * @returns a boolean indicating if the mouse is clicking on the shape
   */
  isClickingOnShape(x: number, y: number) {
    return (
      y < this.y &&
      y > -Math.sqrt(3)*x+Math.sqrt(3)*this.x+this.y &&
      y > Math.sqrt(3)*x-Math.sqrt(3)*(this.x+this.boxSize)+this.y
    );
  }
  /**
   * Draws the shape.
   */
  draw() {
    // console.log("drawing");
    this.drawHole();
    this.drawShape();
  }
  /**
   * Draws the hole, where the shape should be moved to.
   */
  drawHole() {
    let c = this.p5.color(0, 0, 0);
    this.p5.fill(c);
    this.p5.strokeWeight(1);
    this.p5.stroke(255, 0, 255);
    this.p5.triangle(
      this.destination.x,
      this.destination.y,
      this.destination.x+this.boxSize,
      this.destination.y,
      this.destination.x+this.boxSize*.5,
      this.destination.y-Math.sqrt(3)/2*this.boxSize
    );
  }
  /**
   * Draws the shape.
   */
  drawShape() {
    let c = this.correct ? this.p5.color(0, 255, 0) : this.p5.color(0, 0, 255);
    this.p5.fill(c);
    this.p5.strokeWeight(1);
    this.p5.stroke(255, 0, 255);
    this.p5.triangle(
      this.x,
      this.y,
      this.x+this.boxSize,
      this.y,
      this.x+this.boxSize*.5,
      this.y-Math.sqrt(3)/2*this.boxSize
    );
  }
  /**
   * Updates the position of the shape.
   * @param newPosition the new position of the shape
   * @param absolute if true, the shape will be moved to the new position. If false, the shape will be moved by the amount specified in newPosition
   */
  updatePosition(newPosition: Coordinate, absolute?: boolean) {
    if (absolute) {
      this.x = newPosition.x;
      this.y = newPosition.y;
    } else {
      this.x += newPosition.x;
      this.y += newPosition.y;
    }
    if (this.checkForHole(this.x, this.y)) {
      this.shapeWin();
    }
  }
  /**
   * Checks if the shape is in the hole.
   * @param x the x coordinate of the shape
   * @param y the y coordinate of the shape
   * @returns true if the shape is in the hole, false otherwise
   */
  checkForHole(x: number, y: number) {
    return (
      x >= this.destination.x - this.boxSize * this.tolerance &&
      x <= this.destination.x + this.boxSize * this.tolerance &&
      y >= this.destination.y - this.boxSize * this.tolerance &&
      y <= this.destination.y + this.boxSize * this.tolerance &&
      (this.tolerance+1)*y > -Math.sqrt(3)*x+Math.sqrt(3)*this.destination.x+this.destination.y &&
      (this.tolerance+1)*y > Math.sqrt(3)*x-Math.sqrt(3)*(this.destination.x+this.boxSize)+this.destination.y
    );
  }
  /**
   * This function is called when the shape is in the correct position.
   */
  shapeWin() {
    this.x = this.destination.x;
    this.y = this.destination.y;
    this.correct = true;
    ShapeManager.getInstance().releaseShapeFromMouse();
  }
}
