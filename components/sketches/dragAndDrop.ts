import { P5CanvasInstance } from "@p5-wrapper/react";

export const dragandDropSketch = (p5: P5CanvasInstance) =>{

    let bx1 = 0;
let by1 = 200;
let boxSize1 = 200;
let overBox1 = false;
let locked1 = false as boolean;
let overBox1hole = false;


let bx2 = 200;
let by2 = 0;
let boxSize2 = 200;
let overBox2 = false;
let locked2 = false;

let xOffset = 0.0;
let yOffset = 0.0;



p5.setup = ()=> {
  p5.createCanvas(720, 400);
}

p5.draw = ()=>{
  p5.background(222);
p5.rect(0,0,200,200);
  
   if (p5.mouseX > 0 && p5.mouseX < 130  && p5.mouseY > 0  && p5.mouseY < 130) 
  {overBox1hole = true;} 
  else 
  {overBox1hole = false;}
  
   if (p5.mouseX > bx1 && p5.mouseX < bx1 + boxSize1 && p5.mouseY > by1  && p5.mouseY < by1 + boxSize1) 
  {overBox1 = true;} 
  else 
  {overBox1 = false;}
  
  if (bx1==0 && by1==0)
  {
    locked1 = false;
    overBox1 = false; 
    overBox1hole = true;
  }
  
  if(overBox1 == true && overBox1hole == true && locked1 == true)
  {
    bx1 = 0;
    by1 = 0;
  }
  
  
  let c= p5.color(255,255,0);
   p5.fill(c);
  p5.strokeWeight(1);
  p5.stroke(255,0,255);
  p5.rect(bx1, by1, boxSize1, boxSize1);
  
   if (p5.mouseX > bx2  && p5.mouseX < bx2 + boxSize2 && p5.mouseY > by2  && p5.mouseY < by2 + boxSize2) 
  {overBox2 = true;} 
  else 
  {overBox2 = false;}
  
  c= p5.color(0,255,0);
   p5.fill(c);
  p5.strokeWeight(5);
  p5.stroke(0,0,255);
  p5.rect(bx2, by2, boxSize2, boxSize2);
 
  
     if(overBox1 == true && overBox2 == true){
  overBox1 = false;
  overBox2 = true;

}
  


}

p5.mousePressed = ()=> {
  if (overBox1 == true && overBox1hole == false) {
    locked1 = true;
    p5.fill(255, 255, 255);
    xOffset = p5.mouseX - bx1;
    yOffset = p5.mouseY - by1;} 
  else {
    locked1 = false;}
  
  if (overBox2) {
    locked2 = true;
    p5.fill(255, 255, 255);
    xOffset = p5.mouseX - bx2;
    yOffset = p5.mouseY - by2;} 
  else {
    locked2 = false;}

}

p5.mouseDragged = ()=> {
  if (locked1 == true) {
    bx1 = p5.mouseX - xOffset;
    by1 = p5.mouseY - yOffset;
    p5.push();
  }
  
  if (locked2 == true) {
    bx2 = p5.mouseX - xOffset;
    by2 = p5.mouseY - yOffset;
    p5.push();
  }
}

p5.mouseReleased = ()=> {
  locked1 = false;
  locked2 = false;
}

}