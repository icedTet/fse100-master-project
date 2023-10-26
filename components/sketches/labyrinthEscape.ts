import { P5CanvasInstance } from "@p5-wrapper/react";
import { PlayerManager } from "../Games/LabyrinthEscape/PlayerManager";
import { player } from "../Games/LabyrinthEscape/Player";

export const labyrinthEscapeSketch = (p5: P5CanvasInstance) =>{
  let startTime = 0;
  let totalTime = 0;
  let points = 0;
 
  const playerManager = PlayerManager.getInstance(); // Create a new player manager.

  for(let i=0 ;i<1;i++){
    let a =200;
    let b =200;
    let c = 600;
    let d = 200;
    const Player = new player({ x: a, y: b }, 100, p5, { x: c, y: d });
  }


  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight);
    startTime = Date.now();
  };
  p5.mousePressed = () => {
    const selectedPlayer = PlayerManager.getInstance().determinePlayerClicked(
      p5.mouseX,
      p5.mouseY
    );
  };
  p5.mouseDragged = () => {
    const selectedPlayer = PlayerManager.getInstance().determinePlayerClicked(
      p5.mouseX,
      p5.mouseY
    );
    if (selectedPlayer) {
      PlayerManager.getInstance().lockPlayerToMouse(selectedPlayer, p5);
    }
    PlayerManager.getInstance().mouseMoveUpdate(p5);
  };
  p5.mouseReleased = () => {
    PlayerManager.getInstance().releasePlayerFromMouse();
  };
  p5.draw = () => {
    p5.background(255);
    //player holes

    if ((points = 6)) {
      totalTime = (startTime - Date.now()) / 1000;
    }
    PlayerManager.getInstance().drawPlayers(p5);
  };

}

/*
let startTime = 0;
let totalTime = 0;
let points = 0;
//defining moving player
let bx1 = 50;
let by1 = 200;
let boxSize1 = 50;
let overBox1 = false;
//interactions with how the player moves
let locked1 = false as boolean;
let oOB = false;
//defining each part of the maze
let sec1=false;
let sec2=false;
let sec3=false;

//mouse needed functions
let xOffset = 0.0;
let yOffset = 0.0;



p5.setup = ()=> {
  p5.createCanvas(720, 400);
  startTime = Date.now();

}

p5.draw = ()=>{
  p5.background(0);
  if(points = 6){
    totalTime = (startTime - Date.now())/1000;
  }
  //first section, sec1
  let c= p5.color(0,180,0);
  p5.fill(c);
  p5.noStroke();
  p5.rect(0,162,300,75);
 //second section, sec2
 p5.rect(225,237,235,75);
//second section, sec3
p5.rect(385,162,335,75);

  //checks whether or not any section has the cursor 
  if (sec1==true||sec2==true||sec3==true){
    oOB=false;
  }
  else 
  {oOB = true;}
  
//checks each section to see whether or not the circle is out of bounds
//sec1
 if (bx1 > 0 && bx1 < 275 && by1 > 187 && by1 <= 212){
    sec1=true;
    }
   else{sec1=false;}
//sec2
 if(bx1 > 250 && bx1 < 434 && by1 > 222 && by1 < 286){
    sec2=true;
  }
  else{sec2=false;}
//sec3
  if(bx1 > 410 && bx1 < 720 && by1 > 187 && by1 <= 212) 
  {
    sec3=true;
  }
  else{sec3=false;}
  
  //checks if cursor is over circle so that it can get moved
   if (p5.mouseX > bx1 - boxSize1/2  && p5.mouseX < bx1 + boxSize1/2 && p5.mouseY > by1 - boxSize1/2  && p5.mouseY < by1 + boxSize1) 
  {overBox1 = true;} 
  else 
  {overBox1 = false;}
  
  //changes color of player to note whether or not the player is in bounds
  if (oOB==true)//out of bounds
  {
    c= p5.color(0,255,0);
  }
  else{//in bounds
    c= p5.color(255,0,0);
  }
  //circle that moves
  p5.fill(c);
  p5.strokeWeight(1);
  p5.stroke(255);
  p5.circle(bx1, by1, boxSize1);
  
 
   


}
//function that checks whether or not the cursor is over the circle and if it is allows the circle to be moved around
p5.mousePressed = ()=> {
  if (overBox1 == true) {//over the circle
    locked1 = true;
    p5.fill(255, 255, 255);
    xOffset = p5.mouseX - bx1;
    yOffset = p5.mouseY - by1;} 
  else {
    locked1 = false;}//the circle and cursor are not locked together thus the circle cannot be moved by the user
  
  
}
//function that makes the circle move along with the dragged mouse input
p5.mouseDragged = ()=> {
  if (locked1 == true) {//provided that the cursor has pushed over the circle, the circle will move by magnitudes of mouseX and mouseY
    bx1 = p5.mouseX - xOffset;
    by1 = p5.mouseY - yOffset;
    p5.push();
  }
  

}

p5.mouseReleased = ()=> {
  locked1 = false;
  
}


*/