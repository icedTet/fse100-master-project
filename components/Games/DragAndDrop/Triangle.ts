import { P5CanvasInstance } from "@p5-wrapper/react";
import { ShapeManager } from "./ShapeManager";
import { Shape, Coordinate } from "./dndTypes";

export class Triangle implements Shape {
  x: number;
  y: number;
  boxSize: number;
  p5: P5CanvasInstance;
  destination: Coordinate;
  center: Coordinate;
  destinationCenter: Coordinate;
  radius: number;
  tolerance: number;
  correct: boolean = false;
  fade: number = 300;
  greenShift: number = 0;
  constructor(
    boxStart: Coordinate,
    boxSize: number,
    p5: P5CanvasInstance,
    destination: Coordinate
  ) {
    this.x = boxStart.x;
    this.y = boxStart.y;
    this.boxSize = boxSize;
    this.p5 = p5;
    this.destination = destination;
    this.tolerance = 0.05;
    ShapeManager.getInstance().addShape(this);
    this.center = { x: boxStart.x+this.boxSize/2, y: boxStart.y+this.boxSize/2};
    this.destinationCenter = { x: destination.x+this.boxSize/2, y: destination.y+this.boxSize/2};
    this.radius = boxSize/2*Math.sqrt(2);
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
      x > this.x &&
      x < this.x + this.boxSize &&
      y > this.y &&
      y < this.y + this.boxSize &&
      x+y<(this.boxSize+this.x+this.y)  
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
    let c = this.correct
      ? this.p5.color(0, this.greenShift, 0, this.fade)
      : this.p5.color(13 / 2, 27 / 2, 41 / 2, 255);
    if (this.correct) {
      this.fade -= 5;
      if (this.greenShift < 120) this.greenShift += 2;
    }
    this.p5.fill(c);
    this.p5.noStroke();
    if (!this.correct && ShapeManager.getInstance().draggedShape === this) {
      this.p5.strokeWeight(1);
      this.p5.stroke(255, 0, 255);
    }
    this.p5.triangle(
      this.destination.x,
      this.destination.y,
      this.destination.x,
      this.destination.y+this.boxSize,
      this.destination.x+this.boxSize,
      this.destination.y
    );
  }
  /**
   * Draws the shape.
   */
  drawShape() {
    let c = this.correct
      ? this.p5.color(0, 0, 0, 0)
      : this.p5.color(100, 27, 100, 200);
    this.p5.fill(c);
    this.p5.noStroke();
    this.p5.triangle(
        this.x,
        this.y,
        this.x,
        this.y+this.boxSize,
        this.x+this.boxSize,
        this.y
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
      if(this.x<0)
      this.x = 0;
      if(this.x+this.boxSize>=window.innerWidth)
      this.x = window.innerWidth-this.boxSize;
      if(this.y<=0)
      this.y = 0;
      if(this.y+this.boxSize>=window.innerHeight)
      this.y = window.innerHeight-this.boxSize;
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
      x+y<this.boxSize+this.x+this.y
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
