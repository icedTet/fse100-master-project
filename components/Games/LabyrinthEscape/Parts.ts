import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";
import { Square } from "./Squares";

//from shape manager
export class Parts {
    x: number;
    y: number;
    len: number;
    p5: P5CanvasInstance;
    squareNum: Square[]
    constructor(start: Coordinate, len: number, p5: P5CanvasInstance) {
        this.x = start.x;
        this.y = start.y;
        this.len = len;
        this.p5 = p5;
        this.squareNum = [];
        this.init()
    }

    draw() {
        console.log("draw")
        this.drawPart();

    }
    drawPart() {
        this.squareNum.forEach(sq => {
            sq.draw()
        })
    }
    init() {

        for (let i = 0; i < this.len; i++) {
            const square = new Square({ x: this.x + i * 120, y: this.y }, 120, this.p5);
            this.squareNum.push(square);
        }
       
    }
}