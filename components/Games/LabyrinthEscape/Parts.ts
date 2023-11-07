import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";

//from shape manager
export class Parts implements Squares{
    x: number;
    y: number;
    len: number;
    p5: P5CanvasInstance;

    constructor(start: Coordinate, len: number, p5: P5CanvasInstance){
        this.x = start.x;
        this.y = start.y;
        this.len = len;
        this.p5 = p5;
    }

    draw(){
        this.drawPart();
    }

    drawPart(){
        const part=[]
        this.x-=20;
        for(let i =0; i < this.len; i++){
            Squares({x: this.x, y: this.y}, 120, this.p5);
        }
    }
}