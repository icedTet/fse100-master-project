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
      x > this.x &&
      x < this.x + this.playerSize &&
      y > this.y &&
      y < this.y + this.playerSize
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
    let c = this.p5.color(255, 0, 0);
    this.p5.fill(c);
    this.p5.strokeWeight(1);
    this.p5.stroke(255, 0, 255);
    this.p5.square(
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
      //console.log(squares[i])
    }
    let c = this.p5.color(0,0,255)
    if(this.isOnASquare(squares))
    c = this.p5.color(0, 0, 255);
    else
    c = this.p5.color(255,0,0)
    if(this.correct)
    c = this.p5.color(0, 255, 0)
    this.p5.fill(c);
    this.p5.strokeWeight(1);
    this.p5.stroke(255, 0, 255);
    this.p5.square(this.x, this.y, this.playerSize);
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
    //console.log(this.map.correct)
    if (this.checkForHole(this.x, this.y)&&this.map.correct) {
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
    let index=this.closestSquareIndex(squares);
    //console.log("final i: " + index)
    let lastSquarePosition = "0"
    //console.log(squares[index-1].y+ ", " + squares[index].y)
    if(index!=0){
      if(squares[index-1].x<squares[index].x){
        lastSquarePosition = "left"
      }
      if(squares[index-1].x>squares[index].x){
        lastSquarePosition = "right"
      }
      if(squares[index-1].y<squares[index].y){
        lastSquarePosition = "up"
      }
      if(squares[index-1].y>squares[index].y){
        lastSquarePosition = "down"
      }
    }

    let nextSquarePosition = "0"
    if(index!=squares.length-1){
      if(squares[index+1].x>squares[index].x){
        nextSquarePosition = "right"
      }
      if(squares[index+1].x<squares[index].x){
        nextSquarePosition = "left"
      }
      if(squares[index+1].y>squares[index].y){
        nextSquarePosition = "down"
      }
      if(squares[index+1].y<squares[index].y){
        nextSquarePosition = "up"
      }
    }
    if(index == 0){
      if(nextSquarePosition === "left"){
        return this.x+40 < squares[index].x+80 &&
               this.x+40 > squares[index].x-80 &&
               this.y+40 < squares[index].y+80 &&
               this.y+40 > squares[index].y+40
      }
      if(nextSquarePosition === "right"){
        return this.x+40 < squares[index].x+200 &&
               this.x+40 > squares[index].x+40 &&
               this.y+40 < squares[index].y+80 &&
               this.y+40 > squares[index].y+40
      }
      if(nextSquarePosition === "up"){
        return this.x+40 < squares[index].x+80 &&
               this.x+40 > squares[index].x+40 &&
               this.y+40 < squares[index].y+80 &&
               this.y+40 > squares[index].y-80
      }
      if(nextSquarePosition === "down"){
        return this.x+40 < squares[index].x+80 &&
               this.x+40 > squares[index].x+40 &&
               this.y+40 < squares[index].y+200 &&
               this.y+40 > squares[index].y+40
      }
    }

    if(index == squares.length-1){
      if(lastSquarePosition === "left"){
        return this.x+40 < squares[index].x+80 &&
               this.x+40 > squares[index].x-80 &&
               this.y+40 < squares[index].y+80 &&
               this.y+40 > squares[index].y+40
      }
      if(lastSquarePosition === "right"){
        return this.x+40 < squares[index].x+200 &&
               this.x+40 > squares[index].x+40 &&
               this.y+40 < squares[index].y+80 &&
               this.y+40 > squares[index].y+40
      }
      if(lastSquarePosition === "up"){
        return this.x+40 < squares[index].x+80 &&
               this.x+40 > squares[index].x+40 &&
               this.y+40 < squares[index].y+80 &&
               this.y+40 > squares[index].y-80
      }
      if(lastSquarePosition === "down"){
        return this.x+40 < squares[index].x+80 &&
               this.x+40 > squares[index].x+40 &&
               this.y+40 < squares[index].y+200 &&
               this.y+40 > squares[index].y+40
      }
    }

    //console.log(lastSquarePosition+nextSquarePosition)
    if((lastSquarePosition === "left" && nextSquarePosition === "right") || (lastSquarePosition === "right" && nextSquarePosition === "left")){
      return (this.x+40 < squares[index].x+200 &&
              this.x+40 > squares[index].x-80 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y+40)
    }
    if((lastSquarePosition === "up" && nextSquarePosition === "down") || (lastSquarePosition === "down" && nextSquarePosition === "up")){
      return (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+200 &&
              this.y+40 > squares[index].y-80)
    }
    if((lastSquarePosition === "left" && nextSquarePosition === "down") || (lastSquarePosition === "down" && nextSquarePosition === "left")){
      return (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x-80 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y+40)||
             (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+200 &&
              this.y+40 > squares[index].y+40)
    }
    if((lastSquarePosition === "up" && nextSquarePosition === "right") || (lastSquarePosition === "right" && nextSquarePosition === "up")){
      return (this.x+40 < squares[index].x+200 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y+40)||
             (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y-80)
    }
    if((lastSquarePosition === "left" && nextSquarePosition === "up") || (lastSquarePosition === "up" && nextSquarePosition === "left")){
      return (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x-80 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y+40)||
             (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y-80)
    }
    if((lastSquarePosition === "down" && nextSquarePosition === "right") || (lastSquarePosition === "right" && nextSquarePosition === "down")){
      return (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+200 &&
              this.y+40 > squares[index].y+40)||
             (this.x+40 < squares[index].x+200 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y+40)
    }
    if((lastSquarePosition === "down" && nextSquarePosition === "left") || (lastSquarePosition === "left" && nextSquarePosition === "down")){
      return (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x+40 &&
              this.y+40 < squares[index].y+200 &&
              this.y+40 > squares[index].y+40)||
             (this.x+40 < squares[index].x+80 &&
              this.x+40 > squares[index].x-80 &&
              this.y+40 < squares[index].y+80 &&
              this.y+40 > squares[index].y+40)
    }
    return false
  }

  closestSquareIndex(squares: Square[]){
    let minDist = 2000;
    let index = 0;
    for(let i = 0; i < squares.length; i++){
      //console.log(minDist + ", " + squares[i])
      if(minDist > this.p5.dist(this.x + 40,this.y + 40,squares[i].x+60,squares[i].y+60)){
      minDist = this.p5.dist(this.x+ 40,this.y+40,squares[i].x+60,squares[i].y+60);
      index = i;
      //console.log("temp i: "+ i)
      }
    }
    return index;
  }
}
