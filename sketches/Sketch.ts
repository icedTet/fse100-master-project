import p5 from "p5";
type OnClickFunc = (mouseX: number, mouseY: number) => void;
export function sketch(p5) {
  let rotation = 0;

  p5.setup = () => p5.createCanvas(300, 300, p5.WEBGL);

  p5.updateWithProps = props => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };

  p5.draw = () => {
    p5.background(100);
    p5.normalMaterial();
    p5.noStroke();

    p5.push();
    p5.translate(-35, 0);
    p5.rotateY(rotation);
    p5.rotateX(-0.9);
    p5.box(100);
    p5.pop();

    p5.noFill();
    p5.stroke(255);
    p5.push();
    p5.translate(400, p5.height * 0.35, -200);
    p5.sphere(300);
    p5.pop();
  };
}


export class Sketch {
  protected SIZE: number = 500;
  protected canvas?: HTMLCanvasElement;
  protected FRAME_RATE: number = 60;

  private capturer: any;

  constructor(protected p5: p5) {}
  a: number = 0;
  dir: boolean = true;


  preload() {
    // NOTHING
  }

  setup() {
    this.capturer = new (window as any).CCapture({
      format: "gif",
      workersPath: "",
      framerate: this.FRAME_RATE,
      verbose: true,
    });
    const renderer = this.p5.createCanvas(this.SIZE, this.SIZE);
    this.canvas = (renderer as any).canvas;
    this.p5.mouseClicked = () => this.onClick(this.p5.mouseX, this.p5.mouseY);
  }

  draw() {
    this.p5.fill(this.p5.color(255, 255, 255));
    this.p5.createCanvas(this.SIZE, this.SIZE);
    // NOTHING
    this.p5.fill(this.p5.color(255, 0, 0));
    const sq = this.p5.square(this.a, 0, 100);
    this.p5.fill(this.p5.color(0, 255, 0));
    this.p5.triangle(200, 200, 50, 60, 70, 30);
    this.p5.fill(this.p5.color(0, 0, 255));
    this.p5.circle(200, this.a+200, 100);
    this.a += this.dir ? 4 : -4;
    if (this.a > 400) {
      this.dir = false;
    } else if (this.a < 0) {
      this.dir = true;
    }
  }

  onClick(mouseX: number, mouseY: number): void {
    // NOTHING
  }

  windowResized() {
    // NOTHING
  }

  startCapture() {
    this.capturer.start();
  }

  capture() {
    this.capturer.capture(this.canvas);
  }

  stopCapture() {
    this.capturer.stop();
    this.capturer.save();
  }
}

type Constructor<T = {}> = new (...args: any[]) => T;

export const bindSketchToP5 =
  (SketchConstructor: Constructor<Sketch>) => (p5: p5) => {
    const sketch = new SketchConstructor(p5);
    p5.preload = sketch.preload.bind(sketch);
    p5.setup = sketch.setup.bind(sketch);
    p5.draw = sketch.draw.bind(sketch);
    p5.windowResized = sketch.windowResized.bind(sketch);
  };
