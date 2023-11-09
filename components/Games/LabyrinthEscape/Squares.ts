import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "../DragAndDrop/dndTypes";
import { player } from "./Player";


export class Square{
    x: number;
    y: number;
    size: number;
    p5: P5CanvasInstance;
    constructor(start: Coordinate, size: number, p5: P5CanvasInstance){
        this.x = start.x;
        this.y = start.y;
        this.size = size;
        this.p5 = p5;

    }

    draw(){
        this.drawSquare();
    }

    drawSquare(){
        let c = this.p5.color(0, 0, 0);
        this.p5.fill(c);
        this.p5.strokeWeight(1);
        this.p5.stroke(255, 0, 255);
        console.log("drawing square")
        this.p5.square(this.x, this.y, this.size);
    }

    checkForPlayer(x: number, y: number) {
        return (
          x >= this.x + 40  &&
          x <= this.x + 80 &&
          y >= this.y + 40 &&
          y <= this.y + 80
        );
      }
}