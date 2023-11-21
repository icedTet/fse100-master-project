import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";
import { player } from "./Player";
import { PlayerManager } from "./PlayerManager";
import { Square } from "./Squares";

export class MazeMap{
    len: number;
    p5: P5CanvasInstance;
    correct: boolean = false;
    squares = [] as Square[];
    constructor(
      p5: P5CanvasInstance,      
    ) {
      this.p5 = p5;
      this.squares[0] = new Square({x:0, y:0},120, null, this.p5)
      this.len = 1
      for(let i = 1; i < 4; i++){
      this.squares[i] = new Square({x:i*120, y:0},120, this.squares[i-1], this.p5)
      this.len++;
      }
      for(let i = 4; i < 7; i++){
        this.squares[i] = new Square({x:i*120-120, y:120},120, this.squares[i-1], this.p5)
        this.len++;
      }
      for(let i = 7; i < 9; i++){
        this.squares[i] = new Square({x:600, y:i*120-600},120, this.squares[i-1], this.p5)
        this.len++;
      }
      for(let i = 9; i < 16; i++){
        this.squares[i] = new Square({x:i*120-360, y:360},120, this.squares[i-1], this.p5)
        this.len++;
      }
    }
    id?: number | undefined;
    //part: null
    draw(){
      const player = PlayerManager.getInstance().active!
      if(this.mapCompleted()){
        this.correct = true;
      }
      //console.log(this.mapCompleted(player.x, player.y));
        this.drawPath();
        }
    
    drawPath(){
      this.p5.clear(0,0,0,0)
      console.log(this.squares)
      for(let i = 0; i < this.squares.length; i++){
        this.squares[i].draw();
      }
      }
  
    mapCompleted(){
      for(let i = 0; i < this.squares.length; i++){
        if(!this.squares[0].correct){
          this.correct = false;
          return false;
        }
      }
      this.correct = true;
      return true;
    }
}