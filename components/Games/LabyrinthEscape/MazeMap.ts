import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";
import { Parts } from "./Parts";
import { player } from "./Player";
import { PlayerManager } from "./PlayerManager";

export class MazeMap{
    p5: P5CanvasInstance;
    tolerance: number;
    correct: boolean = false;
    path: Parts[]
    constructor(
      p5: P5CanvasInstance,      
    ) {
      this.p5 = p5;
      this.tolerance = 0.05;
      this.path=[];
      this.path[0]=new Parts({x: 0,y: window.innerHeight/2},4, null,this.p5);
      this.path[1]=new Parts({x: 360,y: window.innerHeight/2 -120},1, this.path[0],this.p5)
      this.path[2]=new Parts({x: 360,y: window.innerHeight/2 -120*2},4, this.path[1],this.p5)
      this.path[3]=new Parts({x: 720,y: window.innerHeight/2 -120*3},3, this.path[2],this.p5)
      this.path[4]=new Parts({x: 960,y: window.innerHeight/2 -120*2},2, this.path[3],this.p5)
      this.path[5]=new Parts({x: 1080,y: window.innerHeight/2 -120*1},3, this.path[4],this.p5)
      this.path[6]=new Parts({x: 1320,y: window.innerHeight/2},5, this.path[5],this.p5) 
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
      this.path.forEach(r=>{
        r.draw()
      })
      
    }
  
    mapCompleted(){
      for(let i = 0; i < this.path.length; i++){
        if(!this.path[0].partCompleted()){
          this.correct = false;
          return false;
        }
      }
      this.correct = true;
      return true;
    }
}