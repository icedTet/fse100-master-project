import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "../DragAndDrop/dndTypes";


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
        this.p5.square(this.x, this.y, this.size);
    }
}