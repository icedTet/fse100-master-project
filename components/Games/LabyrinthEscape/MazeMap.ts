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
        this.drawPath();
        this.updateFailure();
        }
    
    drawPath(){
        let c = this.p5.color(0, 0, 0);
        this.p5.fill(c);
        this.p5.strokeWeight(1);
        this.p5.stroke(255, 0, 255);
        const part=[];

        part.push(this.pathPart(0,window.innerHeight/2,5));
        part.push(this.pathPart(480,window.innerHeight/2+120,4));
        part.push(this.pathPart(840,window.innerHeight/2,1));
        part.push(this.pathPart(840,window.innerHeight/2-120,1));
        part.push(this.pathPart(840,window.innerHeight/2-240,4));
        part.push(this.pathPart(1200,window.innerHeight/2-120,2));
        part.push(this.pathPart(1320,window.innerHeight/2,5));

    }
    pathPart(x:number,y: number,length: number){

      const path=[];
      x=x-120;
      for(let i =0; i < length; i++){
        x = x+120;
        this.p5.rect(x,y,120,120);
        path.push(this.p5.rect);
      }
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