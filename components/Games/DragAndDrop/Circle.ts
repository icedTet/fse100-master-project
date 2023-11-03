import { P5CanvasInstance } from "@p5-wrapper/react";
import { ShapeManager } from "./ShapeManager";
import { Shape, Coordinate } from "./dndTypes";
import { Howl, Howler } from "howler";
const soundSuccess = new Howl({
  src: ["/hit.ogg"],
  volume: 0.5,
  autoplay: false,
});

export class Circle implements Shape {
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
    
    this.center = {x: boxStart.x, y: boxStart.y};
    this.destinationCenter = destination;
    this.radius = boxSize;
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
      x > this.x -this.boxSize/2&&
      x < this.x + this.boxSize/2 &&
      y > this.y -this.boxSize/2&&
      y < this.y + this.boxSize/2
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
    this.p5.circle(
      this.destination.x,
      this.destination.y,
      this.boxSize
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
    this.p5.circle(this.x, this.y, this.boxSize);
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
      this.center = {x: this.x, y: this.y};
    } else {
      if(this.x-this.boxSize/2<0)
      this.x = this.boxSize/2;
      if(this.x+this.boxSize/2>=window.innerWidth)
      this.x = window.innerWidth-this.boxSize/2;
      if(this.y-this.boxSize/2<=0)
      this.y = this.boxSize/2;
      if(this.y+this.boxSize/2>=window.innerHeight)
      this.y = window.innerHeight-this.boxSize/2;
      this.x += newPosition.x;
      this.y += newPosition.y;
      this.center = {x: this.x, y: this.y};
    }
    if (this.checkForHole(this.x, this.y)) {
      this.shapeWin();
    }
    
  }

  updateHolePosition(newPosition: Coordinate, absolute?: boolean) {
    if (absolute) {
      this.destination.x = newPosition.x;
      this.destination.y = newPosition.y;
      this.destinationCenter = {x: this.destination.x, y: this.destination.y};
    } else {
      if(this.destination.x-this.boxSize/2<0)
      this.destination.x = this.boxSize/2;
      if(this.destination.x+this.boxSize/2>=window.innerWidth)
      this.destination.x = window.innerWidth-this.boxSize/2;
      if(this.destination.y-this.boxSize/2<=0)
      this.destination.y = this.boxSize/2;
      if(this.destination.y+this.boxSize/2>=window.innerHeight)
      this.destination.y = window.innerHeight-this.boxSize/2;
      this.destination.x += newPosition.x;
      this.destination.y += newPosition.y;
      this.destinationCenter = {x: this.destination.x, y: this.destination.y};
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
      y <= this.destination.y + this.boxSize * this.tolerance
    );
  }
  /**
   * This function is called when the shape is in the correct position.
   */
  shapeWin() {
    this.x = this.destination.x;
    this.y = this.destination.y;
    this.correct = true;
    soundSuccess.play();
    ShapeManager.getInstance().draggedShape = null;
    ShapeManager.getInstance().releaseShapeFromMouse();
  }
}
