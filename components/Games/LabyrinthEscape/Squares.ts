import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "../DragAndDrop/dndTypes";
import { player } from "./Player";
import { PlayerManager } from "./PlayerManager";


export class Square{
    x: number;
    y: number;
    size: number;
    correct: boolean;
    previousSquare: Square | null;
    p5: P5CanvasInstance;
    constructor(start: Coordinate, size: number, previousSquare: Square | null, p5: P5CanvasInstance){
        this.x = start.x;
        this.y = start.y;
        this.size = size;
        this.p5 = p5;
        this.correct = false;
        this.previousSquare = previousSquare;
    }

    draw(){
        const player = PlayerManager.getInstance().active!
        // console.log("player",player)
        // console.log(player.x,player.y)
        if(this.checkForPlayer(player.x, player.y))
        this.correct = true;
        this.drawSquare();
    }

    drawSquare(){
        let c = this.p5.color(0, 0, 0);
        if(this.previousSquare == null){
            c = this.p5.color(0, 0, 255);
        }
        if(this.correct){
            c = this.p5.color(0, 255, 0);
        }
        this.p5.fill(c);
        this.p5.strokeWeight(1);
        this.p5.stroke(255, 0, 255);
        this.p5.square(this.x, this.y, this.size);
    }

    checkForPlayer(x: number, y: number) {
        if (
          x+40 >= this.x+40 &&
          x+40 <= this.x + this.size-40 &&
          y+40 >= this.y+40 &&
          y+40 <= this.y + this.size-40 && 
          (this.previousSquare == null || this.previousSquare.correct)
        ){
            return true;
        }
        //console.log(this.correct);
        return false;
      }
}