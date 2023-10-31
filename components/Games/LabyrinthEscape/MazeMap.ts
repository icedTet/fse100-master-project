import { P5CanvasInstance } from "@p5-wrapper/react";
import { Console } from "console";
import { Coordinate } from "./PlayerPositioning";
import { player } from "./Player";
import { PlayerManager } from "./PlayerManager";

export class MazeMap{
    p5: P5CanvasInstance;
    tolerance: number;
    correct: boolean = false;
    OOB: Coordinate;
    death: boolean = false;
    constructor(
      p5: P5CanvasInstance,
      OOB: Coordinate,
    ) {
    this.OOB= OOB;
      this.p5 = p5;
      this.tolerance = 0.05;

    }
    id?: number | undefined;
  
    draw(){
        this.drawOOB();
        this.updateFailure();
        }
    
    drawOOB(){
        let c = this.p5.color(0, 0, 0);
        this.p5.fill(c);
        this.p5.strokeWeight(1);
        this.p5.stroke(255, 0, 255);
        this.p5.rect(0,100,window.innerWidth,window.innerHeight/6);
    }

    checkForOOB(x:number, y:number){
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