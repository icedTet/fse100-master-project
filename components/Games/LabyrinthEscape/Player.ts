import { P5CanvasInstance } from "@p5-wrapper/react";
import { Player, Coordinate } from "./PlayerPositioning";
import { PlayerManager } from "./PlayerManager";
import { Square } from "./Squares";
import { MazeMap } from "./MazeMap";

export class player implements Player {
  public x: number;
  public y: number;
  playerSize: number;
  p5: P5CanvasInstance;
  destination: Coordinate;
  tolerance: number;
  correct: boolean = false;
  map: MazeMap;
  constructor(
    playerStart: Coordinate,
    playerSize: number,
    p5: P5CanvasInstance,
    destination: Coordinate,
    map: MazeMap
  ) {
    this.x = playerStart.x;
    this.y = playerStart.y;
    this.playerSize = playerSize;
    this.p5 = p5;
    this.destination = destination;
    this.tolerance = 0.15;
    this.map = map;
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
      x > this.x -this.playerSize/2&&
      x < this.x + this.playerSize/2 &&
      y > this.y -this.playerSize/2&&
      y < this.y + this.playerSize/2
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
    this.p5.circle(
      this.destination.x,
      this.destination.y,
      this.playerSize
    );
  }
  /**
   * Draws the player.
   */
  drawPlayer() {
    const squares = [] as Square[];
    for(let i = 0; i < this.map.len; i++){
      squares.push(this.map.squares[i])
    }
    let c = this.p5.color(0,0,255)
    if(this.isOnASquare(squares))
    c = this.p5.color(0, 0, 255);
    else
    c = this.p5.color(255,0,0)
    this.p5.fill(c);
    this.p5.strokeWeight(1);
    this.p5.stroke(255, 0, 255);
    this.p5.circle(this.x, this.y, this.playerSize);
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
      x >= this.destination.x - this.playerSize * this.tolerance &&
      x <= this.destination.x + this.playerSize * this.tolerance &&
      y >= this.destination.y - this.playerSize * this.tolerance &&
      y <= this.destination.y + this.playerSize * this.tolerance
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
  isOnASquare(squares: Square[]) {
    let onSquare = false;
    for(let i = 0; i<squares.length-1; i++){
      if(squares[i].x<squares[i+1].x){
        onSquare = 
          this.x > squares[i].x
          this.x < squares[i+1].x+120
          this.y < squares[i].y
          this.y > squares[i].y-120
      }
      else{
        onSquare = 
          this.x > squares[i].x
          this.x < squares[i].x+120
          this.y > squares[i].y
          this.y < squares[i+1].y+120
      }
      if(onSquare)
      return true
    }
    // squares.forEach(sq=>{
    //   const cx = sq.x + sq.size/2;
    //   const cy = sq.y + sq.size/2;
    //   const dist = Math.sqrt((this.y-cy)**2 + (this.x-cx)**2);
    //   if (dist <=sq.size/2- this.playerSize/2) {
    //     onSquare = true;
    //   } 
    // })
    return false;
  }
}
