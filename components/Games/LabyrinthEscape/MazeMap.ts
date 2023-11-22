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
        this.leftToRightPathDrawer(0,0,11)
        this.topToBottomPathDrawer(1200,120,4)
      }
      else if(this.mode == 2){
        this.topToBottomPathDrawer(0,0,3)
        this.leftToRightPathDrawer(120,240,6)
        this.bottomToTopPathDrawer(720,120,2)
        this.leftToRightPathDrawer(840,0,2)
        this.topToBottomPathDrawer(960,120,4)
        this.leftToRightPathDrawer(1080,480,2)
      }
      else{
      this.leftToRightPathDrawer(0,0,3)
      this.topToBottomPathDrawer(240,120,2)
      this.rightToLeftPathDrawer(120,240,2)
      this.topToBottomPathDrawer(0,360,2)
      this.leftToRightPathDrawer(120,480,6)
      this.bottomToTopPathDrawer(720,360,2)
      this.rightToLeftPathDrawer(600,240,2)
      this.bottomToTopPathDrawer(480,120,2)
      this.leftToRightPathDrawer(600,0,6)
      this.topToBottomPathDrawer(1200,120,2)
      this.rightToLeftPathDrawer(1080,240,2)
      this.topToBottomPathDrawer(960,360,2)
      this.leftToRightPathDrawer(1080,480,2)
      }
    }

    leftToRightPathDrawer(xVal: number, yVal: number, len: number){
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: i*120+xVal, y: yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: i*120+xVal, y: yVal},120, this.squares[this.squares.length-1], this.p5))
        //console.log(this.squares[i].x + ", " + this.squares[i].y)
        this.len++
      }
    }

    rightToLeftPathDrawer(xVal: number, yVal: number, len: number){
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: -i*120+xVal, y: yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: -i*120+xVal, y: yVal},120, this.squares[this.squares.length-1], this.p5))
        //console.log(this.squares[i].x + ", " + this.squares[i].y)
        this.len++
      }
    }

    topToBottomPathDrawer(xVal: number, yVal: number, len: number){
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: xVal, y: i*120+yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: xVal, y: i*120+yVal},120, this.squares[this.squares.length-1], this.p5))
        //console.log(this.squares[i].x + ", " + this.squares[i].y)
        this.len++
      }
    }

    bottomToTopPathDrawer(xVal: number, yVal: number, len: number){
      for(let i = 0; i < len; i++){
        if(this.squares.length == 0)
        this.squares.push(new Square({x: xVal, y: -i*120+yVal},120, null, this.p5))
        else
        this.squares.push(new Square({x: xVal, y: -i*120+yVal},120, this.squares[this.squares.length-1], this.p5))
        //console.log(this.squares[i].x + ", " + this.squares[i].y)
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