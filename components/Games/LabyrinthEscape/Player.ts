import { P5CanvasInstance } from "@p5-wrapper/react";
import { Player, Coordinate } from "./PlayerPositioning";
import { PlayerManager } from "./PlayerManager";

export class player implements Player {
  x: number;
  y: number;
  boxSize: number;
  p5: P5CanvasInstance;
  destination: Coordinate;
  tolerance: number;
  correct: boolean = false;
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
    PlayerManager.getInstance().addPlayer(this);
  }
  id?: number | undefined;
  /**
   * Checks if the mouse (or the coordinates) is clicking on the player.
   * @param x the x coordinate of the mouse
   * @param y the y coordinate of the mouse
   * @returns a boolean indicating if the mouse is clicking on the player
   */
  isClickingOnPlayer(x: number, y: number) {
    return (
      x > this.x &&
      x < this.x + this.boxSize &&
      y > this.y &&
      y < this.y + this.boxSize
    );
  }
  /**
   * Draws the player.
   */
  draw() {
    // console.log("drawing");
    this.drawHole();
    this.drawPlayer();
  }
  /**
   * Draws the hole, where the player should be moved to.
   */
  drawHole() {
    let c = this.p5.color(0, 0, 0);
    this.p5.fill(c);
    this.p5.strokeWeight(1);
    this.p5.stroke(255, 0, 255);
    this.p5.rect(
      this.destination.x,
      this.destination.y,
      this.boxSize,
      this.boxSize
    );
  }
  /**
   * Draws the player.
   */
  drawPlayer() {
    let c = this.correct ? this.p5.color(0, 255, 0) : this.p5.color(0, 0, 255);
    this.p5.fill(c);
    this.p5.strokeWeight(1);
    this.p5.stroke(255, 0, 255);
    this.p5.rect(this.x, this.y, this.boxSize, this.boxSize);
  }
  /**
   * Updates the position of the player.
   * @param newPosition the new position of the player
   * @param absolute if true, the player will be moved to the new position. If false, the player will be moved by the amount specified in newPosition
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
      this.playerWin();
    }
  }
  /**
   * Checks if the player is in the hole.
   * @param x the x coordinate of the player
   * @param y the y coordinate of the player
   * @returns true if the player is in the hole, false otherwise
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
   * This function is called when the player is in the correct position.
   */
  playerWin() {
    this.x = this.destination.x;
    this.y = this.destination.y;
    this.correct = true;
    PlayerManager.getInstance().releasePlayerFromMouse();
  }
}