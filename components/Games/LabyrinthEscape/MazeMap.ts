import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";
import { player } from "./Player";
import { PlayerManager } from "./PlayerManager";
import { Square } from "./Squares";

export class MazeMap{
    mode: Number;
    len: number;
    p5: P5CanvasInstance;
    correct: boolean = false;
    squares = [] as Square[];
    constructor(
      mode: Number,
      p5: P5CanvasInstance,      
    ) {
      this.p5 = p5;
      this.len = 0;
      this.mode = mode
      
      if(this.mode == 1){
        this.right(11)
        this.down(4)
      }
      else if(this.mode == 2){
        this.down(3)
        this.right(6)
        this.up(2)
        this.right(2)
        this.down(4)
        this.right(2)
      }
      else{
        this.right(3)
        this.down(2)
        this.left(2)
        this.down(2)
        this.right(6)
        this.up(2)
        this.left(2)
        this.up(2)
        this.right(6)
        this.down(2)
        this.left(2)
        this.down(2)
        this.right(2)
      }
    }

    right(len: number){
      let xVal = 0;
      let yVal = 0;
      if(this.squares.length!=0){
        xVal = this.squares[this.squares.length-1].x+120
        yVal = this.squares[this.squares.length-1].y
      }
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: i*120+xVal, y: yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: i*120+xVal, y: yVal},120, this.squares[this.squares.length-1], this.p5))
        console.log(this.squares[i].x + ", " + this.squares[i].y)
        this.len++
      }
    }

    left(len: number){
      let xVal = 0;
      let yVal = 0;
      if(this.squares.length!=0){
        xVal = this.squares[this.squares.length-1].x-120
        yVal = this.squares[this.squares.length-1].y
      }
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: -i*120+xVal, y: yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: -i*120+xVal, y: yVal},120, this.squares[this.squares.length-1], this.p5))
        console.log(this.squares[i].x + ", " + this.squares[i].y)
        this.len++
      }
    }

    down(len: number){
      let xVal = 0;
      let yVal = 0;
      if(this.squares.length!=0){
        xVal = this.squares[this.squares.length-1].x
        yVal = this.squares[this.squares.length-1].y+120
      }
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: xVal, y: i*120+yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: xVal, y: i*120+yVal},120, this.squares[this.squares.length-1], this.p5))
        console.log(this.squares[i].x + ", " + this.squares[i].y)
        this.len++
      }
    }

    up(len: number){
      let xVal = 0;
      let yVal = 0;
      if(this.squares.length!=0){
        xVal = this.squares[this.squares.length-1].x
        yVal = this.squares[this.squares.length-1].y-120
      }
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: xVal, y: -i*120+yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: xVal, y: -i*120+yVal},120, this.squares[this.squares.length-1], this.p5))
        console.log(this.squares[i].x + ", " + this.squares[i].y)
        this.len++
      }
    }

    id?: number | undefined;
    //part: null
    draw(){
      const player = PlayerManager.getInstance().active!
      if(this.mapCompleted()){
        this.correct = true;
      }
      //console.log("map completed = " + this.correct);
        this.drawPath();
        }
    
    drawPath(){
      this.p5.clear(0,0,0,0)
      //console.log(this.squares)
      for(let i = 0; i < this.squares.length; i++){
        this.squares[i].draw();
      }
      }
  
    mapCompleted(){
      for(let i = 0; i < this.squares.length; i++){
        if(!this.squares[i].correct){
          return false;
        }
      }
      return true;
    }
}