import { P5CanvasInstance } from "@p5-wrapper/react";
import { Coordinate } from "./PlayerPositioning";
import { Square } from "./Squares";

//from shape manager
export class Parts{
    x: number;
    y: number;
    len: number;
    correct: boolean;
    previousPart: Parts | null;
    p5: P5CanvasInstance;
    squares: Square[]
    constructor(start: Coordinate, len: number, previousPart: Parts | null, p5: P5CanvasInstance){
        this.x = start.x;
        this.y = start.y;
        this.len = len;
        this.correct = false;
        this.previousPart = previousPart;
        this.p5 = p5;
        this.squares= [];
        this.init()
    }

    draw(){
        console.log("draw")
        this.drawPart();

    }
    drawPart(){
        this.squares.forEach(sq=>{
            sq.draw()
        })
    }
    init(){
        let previousSquare = null;
        if(this.previousPart==null){
        let previousSquare= new Square({x: this.x+0*120, y: this.y}, 120, null, this.p5);
        this.squares.push(previousSquare);
        }
        else{
            let previousSquare= new Square({x: this.x+0*120, y: this.y}, 120, this.previousPart.squares[this.previousPart.len], this.p5);
            this.squares.push(previousSquare);
        }

        for(let i =1; i < this.len; i++){
            let s= null;
            s = new Square({x: this.x+i*120, y: this.y}, 120, previousSquare, this.p5);
            this.squares.push(s);
            previousSquare = s;
        }
    }
    partCompleted(x: number, y: number){
        for(let i = 0; i < this.squares.length; i++){
        if(!this.squares[i].correct)
            return false;
        }
            this.correct = true;
            return true;
    }
}