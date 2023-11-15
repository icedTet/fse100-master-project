import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";
import { Parts } from "./Parts";
import { player } from "./Player";
import { PlayerManager } from "./PlayerManager";

export class MazeMap{
    p5: P5CanvasInstance;
    tolerance: number;
    correct: boolean = false;
    OOB: Coordinate;
    death: boolean = false;
    path: Parts[]
    
    constructor(
      p5: P5CanvasInstance,
      OOB: Coordinate,
      
    ) {
    this.OOB= OOB;
      this.p5 = p5;
      this.tolerance = 0.05;
      this.path=[];
      this.path[0]=new Parts({x: 0,y: window.innerHeight/2},4,this.p5);
      this.path[1]=new Parts({x: 360,y: window.innerHeight/2 -120},1, this.p5)
      this.path[2]=new Parts({x: 360,y: window.innerHeight/2 -120*2},4, this.p5)
      this.path[3]=new Parts({x: 720,y: window.innerHeight/2 -120*3},3,this.p5)
      this.path[4]=new Parts({x: 960,y: window.innerHeight/2 -120*2},2,this.p5)
      this.path[5]=new Parts({x: 1080,y: window.innerHeight/2 -120*1},3,this.p5)
      this.path[6]=new Parts({x: 1320,y: window.innerHeight/2},5,this.p5) 
    }
    id?: number | undefined;
    //part: null
    draw(){
      const player = PlayerManager.getInstance().active!
     
        this.drawPath();
        this.updateFailure();
        }
    
    drawPath(){
      this.path.forEach(r=>{
        r.draw()
        r.squareNum.forEach
      })
      
    }
  
    checkForPath(x:number, y:number){
        return (
            x >= this.OOB.x * this.tolerance &&
            x <= this.OOB.x * this.tolerance &&
            y >= this.OOB.y * this.tolerance &&
            y <= this.OOB.y * this.tolerance
          );

    }
    
    updateFailure(){
        if (this.death==true){
          let c=this.p5.color(100,100,100);
        }
    }

    
}