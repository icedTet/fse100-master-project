import { P5CanvasInstance } from "@p5-wrapper/react";
import { Color } from "p5";

export const dragandDropSketch = (p5: P5CanvasInstance) => {
  let startTime = 0;
  let totalTime = 0;
  let points = 0;
  //square
  let bx1 = 1;
  let by1 = 200;
  let boxSize1 = 100;
  let overBox1 = false as boolean;
  let locked1 = false as boolean;
  let overBox1hole = false as boolean;

  //circle
  let bx2 = 160;
  let by2 = 250;
  let boxSize2 = 100;
  let overBox2 = false as boolean;
  let locked2 = false as boolean;
  let overBox2hole = false as boolean;

  //toptri
  let bx3 = 220;
  let by3 = 200;
  let boxSize3 = 100;
  let overBox3 = false as boolean;
  let locked3 = false as boolean;
  let overBox3hole = false as boolean;

  //midtri
  let bx4 = 340;
  let by4 = 100;
  let boxSize4 = 100;
  let overBox4 = false as boolean;
  let locked4 = false as boolean;
  let overBox4hole = false as boolean;

  let xOffset = 0.0;
  let yOffset = 0.0;

  let c: Color;

  p5.setup = () => {
    p5.createCanvas(720, 400);
    startTime = Date.now();
  };

  p5.draw = () => {
    p5.background(222);
    //shape holes

    if ((points = 6)) {
      totalTime = (startTime - Date.now()) / 1000;
    }

    //square
    let bx1 = 1;
    let by1 = 200;
    let boxSize1 = 100;
    let overBox1 = false as boolean;
    let locked1 = false as boolean;
    let overBox1hole = false as boolean;
    // this is new code or somethinga
    //circle
    let bx2 = 160;
    let by2 = 250;
    let boxSize2 = 100;
    let overBox2 = false as boolean;
    let locked2 = false as boolean;
    let overBox2hole = false as boolean;

    //toptri
    let bx3 = 220;
    let by3 = 200;
    let boxSize3 = 100;
    let overBox3 = false as boolean;
    let locked3 = false as boolean;
    let overBox3hole = false as boolean;

    //midtri

    let xOffset = 0.0;
    let yOffset = 0.0;

    p5.setup = () => {
      p5.createCanvas(720, 400);
    };

    p5.draw = () => {
      p5.background(222);
      //shape holes
      //square
      let c = p5.color(0, 0, 0);
      p5.fill(c);
      p5.strokeWeight(1);
      p5.stroke(255, 0, 255);
      p5.rect(0, 0, 100, 100);
      //circle
      c = p5.color(0, 0, 0);
      p5.fill(c);
      p5.strokeWeight(1);
      p5.stroke(255, 0, 255);
      p5.circle(160, 50, 100);
      //triangle1
      c = p5.color(0, 0, 0);
      p5.fill(c);
      p5.strokeWeight(1);
      p5.stroke(255, 0, 255);
      p5.triangle(220, 0, 320, 0, 320, 100);
      //triangle2
      c = p5.color(0, 0, 0);
      p5.fill(c);
      p5.strokeWeight(1);
      p5.stroke(255, 0, 255);
      p5.triangle(340, 100, 390, 0, 440, 100);

      //div
      if (
        p5.mouseX > 0 &&
        p5.mouseX < 100 &&
        p5.mouseY > 0 &&
        p5.mouseY < 100
      ) {
        overBox1hole = true;
      } else {
        overBox1hole = false;
      }

      if (
        p5.mouseX > bx1 &&
        p5.mouseX < bx1 + boxSize1 &&
        p5.mouseY > by1 &&
        p5.mouseY < by1 + boxSize1
      ) {
        overBox1 = true;
      } else {
        overBox1 = false;
      }

      if (bx1 == 0 && by1 == 0) {
        locked1 = false;
        overBox1 = false;
        overBox1hole = true;
        points + 1;
      }

      if (overBox1 == true && overBox1hole == true && locked1 == true) {
        bx1 = 0;
        by1 = 0;
      }
      //div
      if (
        p5.mouseX > 110 &&
        p5.mouseX < 210 &&
        p5.mouseY > 0 &&
        p5.mouseY < 80
      ) {
        overBox2hole = true;
      } else {
        overBox2hole = false;
      }

      if (
        p5.mouseX > bx2 - boxSize2 / 2 &&
        p5.mouseX < bx2 + boxSize2 / 2 &&
        p5.mouseY > by2 - boxSize2 / 2 &&
        p5.mouseY < by2 + boxSize2 / 2
      ) {
        overBox2 = true;
      } else {
        overBox2 = false;
      }

      if (bx2 == 160 && by2 == 50) {
        locked2 = false;
        overBox2 = false;
        overBox2hole = true;
        points + 1;
      }

      if (overBox2 == true && overBox2hole == true && locked2 == true) {
        bx2 = 160;
        by2 = 50;
      }
      //div
      if (
        p5.mouseX > 220 &&
        p5.mouseX < 320 &&
        p5.mouseY > 0 &&
        p5.mouseY < 80
      ) {
        overBox3hole = true;
      } else {
        overBox3hole = false;
      }

      if (
        p5.mouseX > bx3 &&
        p5.mouseX < bx3 + boxSize3 &&
        p5.mouseY > by3 &&
        p5.mouseY < by3 + boxSize3
      ) {
        overBox3 = true;
      } else {
        overBox3 = false;
      } //hi

      if (bx3 == 220 && by3 == 0) {
        locked3 = false;
        overBox3 = false;
        overBox3hole = true;
        points + 1;
      }

      if (overBox3 == true && overBox3hole == true && locked3 == true) {
        bx3 = 220;
        by3 = 0;
      }

      //moving box bottom left
      if (bx1 == 0 && by1 == 0) {
        c = p5.color(0, 255, 0);
      } else {
        c = p5.color(255, 0, 0);
      }

      p5.fill(c);
      p5.strokeWeight(1);
      p5.stroke(255);
      p5.rect(bx1, by1, boxSize1, boxSize1);

      //moving circle
      if (bx2 == 160 && by2 == 50) {
        c = p5.color(0, 255, 0);
      } else {
        c = p5.color(255, 0, 0);
      }
      p5.fill(c);
      p5.strokeWeight(1);
      p5.stroke(255);
      p5.circle(bx2, by2, boxSize2);

      //moving triangle
      if (bx3 == 220 && by3 == 0) {
        c = p5.color(0, 255, 0);
      } else {
        c = p5.color(255, 0, 0);
      }
      p5.fill(c);
      p5.strokeWeight(1);
      p5.stroke(255);
      p5.triangle(bx3, by3, bx3 + 100, by3 + 0, bx3 + 100, by3 + 100);

      if (overBox1 == true && overBox2 == true) {
        overBox1 = false;
        overBox2 = true;
      }
    };

    p5.mousePressed = () => {
      if (overBox1 == true && overBox1hole == false) {
        locked1 = true;
        p5.fill(255, 255, 255);
        xOffset = p5.mouseX - bx1;
        yOffset = p5.mouseY - by1;
      } else {
        locked1 = false;
      }

      if (overBox2) {
        locked2 = true;
        p5.fill(255, 255, 255);
        xOffset = p5.mouseX - bx2;
        yOffset = p5.mouseY - by2;
      } else {
        locked2 = false;
      }

      if (overBox3) {
        locked3 = true;
        p5.fill(255, 255, 255);
        xOffset = p5.mouseX - bx3;
        yOffset = p5.mouseY - by3;
      } else {
        locked3 = false;
      }
    };

    p5.mouseDragged = () => {
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

      if (locked3 == true) {
        bx3 = p5.mouseX - xOffset;
        by3 = p5.mouseY - yOffset;
        p5.push();
      }
    };

    p5.mouseReleased = () => {
      locked1 = false;
      locked2 = false;
      overBox2 = false;
      overBox2hole = true;
      points + 1;
    };

    if (overBox2 == true && overBox2hole == true && locked2 == true) {
      bx2 = 160;
      by2 = 50;
    }
    //div
    if (p5.mouseX > 220 && p5.mouseX < 320 && p5.mouseY > 0 && p5.mouseY < 80) {
      overBox3hole = true;
    } else {
      overBox3hole = false;
    }

    if (
      p5.mouseX > bx3 &&
      p5.mouseX < bx3 + boxSize3 &&
      p5.mouseY > by3 &&
      p5.mouseY < by3 + boxSize3
    ) {
      overBox3 = true;
    } else {
      overBox3 = false;
    }

    if (bx3 == 220 && by3 == 0) {
      locked3 = false;
      overBox3 = false;
      overBox3hole = true;
      points + 1;
    }

    if (overBox3 == true && overBox3hole == true && locked3 == true) {
      bx3 = 220;
      by3 = 0;
    }

    //moving box bottom left
    if (bx1 == 0 && by1 == 0) {
      c = p5.color(0, 255, 0);
    } else {
      c = p5.color(255, 0, 0);
    }

    p5.fill(c);
    p5.strokeWeight(1);
    p5.stroke(255);
    p5.rect(bx1, by1, boxSize1, boxSize1);

    //moving circle
    if (bx2 == 160 && by2 == 50) {
      c = p5.color(0, 255, 0);
    } else {
      c = p5.color(255, 0, 0);
    }
    p5.fill(c);
    p5.strokeWeight(1);
    p5.stroke(255);
    p5.circle(bx2, by2, boxSize2);

    //moving triangle1
    if (bx3 == 220 && by3 == 0) {
      c = p5.color(0, 255, 0);
    } else {
      c = p5.color(255, 0, 0);
    }
    p5.fill(c);
    p5.strokeWeight(1);
    p5.stroke(255);
    p5.triangle(bx3, by3, bx3 + 100, by3 + 0, bx3 + 100, by3 + 100);

    //moving triangle2
    if (bx4 == 220 && by4 == 0) {
      c = p5.color(0, 255, 0);
    } else {
      c = p5.color(255, 0, 0);
    }
    p5.fill(c);
    p5.strokeWeight(1);
    p5.stroke(255);
    p5.triangle(bx4, by4, bx4 + 100, by4 + 0, bx4 + 100, by4 + 100);

    if (overBox1 == true && overBox2 == true) {
      overBox1 = false;
      overBox2 = true;
    }
    if (overBox1 == true && overBox3 == true) {
      overBox1 = false;
      overBox3 = true;
    }
    if (overBox2 == true && overBox3 == true) {
      overBox2 = false;
      overBox3 = true;
    }
  };

  p5.mousePressed = () => {
    if (overBox1 == true && overBox1hole == false) {
      locked1 = true;
      p5.fill(255, 255, 255);
      xOffset = p5.mouseX - bx1;
      yOffset = p5.mouseY - by1;
    } else {
      locked1 = false;
    }

    if (overBox2) {
      locked2 = true;
      p5.fill(255, 255, 255);
      xOffset = p5.mouseX - bx2;
      yOffset = p5.mouseY - by2;
    } else {
      locked2 = false;
    }

    if (overBox3) {
      locked3 = true;
      p5.fill(255, 255, 255);
      xOffset = p5.mouseX - bx3;
      yOffset = p5.mouseY - by3;
    } else {
      locked3 = false;
    }
  };

  p5.mouseDragged = () => {
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

    if (locked3 == true) {
      bx3 = p5.mouseX - xOffset;
      by3 = p5.mouseY - yOffset;
      p5.push();
    }
  };

  p5.mouseReleased = () => {
    locked1 = false;
    locked2 = false;
    locked3 = false;
  };
};
