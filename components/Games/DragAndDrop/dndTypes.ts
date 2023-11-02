import { P5CanvasInstance } from "@p5-wrapper/react";

export type Coordinate = {
  x: number;
  y: number;
};
export interface Shape {
  id?: number;
  draw: (p5: P5CanvasInstance) => void;
  isClickingOnShape: (x: number, y: number) => boolean;
  updatePosition: (newPosition: Coordinate, absolute?: boolean) => void;
  updateHolePosition: (newPosition: Coordinate, absolute?: boolean) => void;
  tolerance: number; // Percentage of the shape that the mouse can be outside of the hole shape and still be considered "in" the hole and lock
  checkForHole: (x: number, y: number) => boolean;
  correct: boolean;
  center: Coordinate;
  destinationCenter: Coordinate;
  radius: number;
  p5: P5CanvasInstance
}
