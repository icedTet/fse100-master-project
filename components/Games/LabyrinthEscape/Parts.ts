import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";

//from shape manager
class Parts{
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
        const path=[]
        this.x-=20;
        for(let i =0; i < this.len; i++){
            this.x+=120;
            const rect= this.p5.rect(this.x,this.y,120,120);
            path.push(rect);
        }
    }
}