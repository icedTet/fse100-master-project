import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "../DragAndDrop/dndTypes";

<<<<<<< HEAD
class Squares{
=======
export class Square{
>>>>>>> cb5dfcf4e125a548e6324684938b5e24e6aa2b7f
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
        this.p5.square(this.x, this.y, 120);
    }
}