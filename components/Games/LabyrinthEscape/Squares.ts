import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "../DragAndDrop/dndTypes";
import { player } from "./Player";
import { PlayerManager } from "./PlayerManager";


export class Square{
    x: number;
    y: number;
    size: number;
    correct: boolean;

    p5: P5CanvasInstance;
    constructor(start: Coordinate, size: number,  p5: P5CanvasInstance){
        this.x = start.x;
        this.y = start.y;
        this.size = size;
        this.p5 = p5;
        this.correct = false;
     
    }

    draw(){
        const player = PlayerManager.getInstance().active!
        // console.log("player",player)
        // console.log(player.x,player.y)
        this.checkForPlayer(player.x, player.y);
        this.drawSquare();
       // this.calculateDistance();
    }

    drawSquare(){
        let c = this.p5.color(0, 0, 0);
        if(this.correct==true){
            c = this.p5.color(0, 255, 0);
        }
        this.p5.fill(c);
        this.p5.strokeWeight(1);
        this.p5.stroke(255, 0, 255);
        this.p5.square(this.x, this.y, this.size);
        /*this.p5.line(this.x,this.y+(this.size)/2,this.x+this.size,this.y+(this.size)/2);
        this.p5.line(this.x+(this.size)/2,this.y,this.x+(this.size)/2,this.y+(this.size));*/
        this.p5.strokeWeight(10);
        this.p5.point(this.x+(this.size)/2, this.y+(this.size)/2);

    }

    checkForPlayer(x: number, y: number) {
        
        if(
          x >= this.x+(this.size)/2 - (this.size/2)  &&
          x <= this.x+(this.size)/2 + (this.size/2)&&
          y >= this.y+(this.size)/2 - (this.size/2) &&
          y <= this.y+(this.size)/2 + (this.size/2)
        ){
            console.log("out",Square);
            this.correct = true
        }
    
        //console.log(this.correct);
        
      }
       // calculateDistance() {


       // }
}