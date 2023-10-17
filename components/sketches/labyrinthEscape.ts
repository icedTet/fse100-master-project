import { P5CanvasInstance } from "@p5-wrapper/react";

export const labyrinthEscapeSketch = (p5: P5CanvasInstance) =>{

let startTime = 0;
let totalTime = 0;
let points = 0;
//square
let bx1 = 50;
let by1 = 200;
let boxSize1 = 50;
let overBox1 = false;
let locked1 = false as boolean;
let oOB = false;



let xOffset = 0.0;
let yOffset = 0.0;



p5.setup = ()=> {
  p5.createCanvas(720, 400);
  startTime = Date.now();

}

p5.draw = ()=>{

  p5.background(0);
  //shape holes

  if(points = 6){
    totalTime = (startTime - Date.now())/1000;
  }


  //goodpatch1
  let c= p5.color(0,180,0);
  p5.fill(c);
  p5.noStroke();
  p5.rect(0,162,300,75);
 //goodpatch2
 p5.rect(225,237,235,75);
//goodpatch3
p5.rect(385,162,335,75);

  //div
   if (bx1 > 100 && bx1 < 200  && by1 > 0  && by1 < 100) 
  {oOB = true;} 
  else 
  {oOB = false;}
  
   if (p5.mouseX > bx1 - boxSize1/2 +10 && p5.mouseX < bx1 + boxSize1/2 && p5.mouseY > by1 - boxSize1/2  && p5.mouseY < by1 + boxSize1) 
  {overBox1 = true;} 
  else 
  {overBox1 = false;}
  
 
 

  
  //moving box bottom left
  if (oOB==true)
  {
    c= p5.color(0,255,0);
  }
  else{
    c= p5.color(255,0,0);
  }
  
  p5.fill(c);
  p5.strokeWeight(1);
  p5.stroke(255);
  p5.circle(bx1, by1, boxSize1);
  
 
   


}

p5.mousePressed = ()=> {
  if (overBox1 == true) {
    locked1 = true;
    p5.fill(255, 255, 255);
    xOffset = p5.mouseX - bx1;
    yOffset = p5.mouseY - by1;} 
  else {
    locked1 = false;}
  
  
}

p5.mouseDragged = ()=> {
  if (locked1 == true) {
    bx1 = p5.mouseX - xOffset;
    by1 = p5.mouseY - yOffset;
    p5.push();
  }
  

}

p5.mouseReleased = ()=> {
  locked1 = false;
  
}



}