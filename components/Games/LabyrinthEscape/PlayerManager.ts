import { P5CanvasInstance } from "@p5-wrapper/react";
import { Player, Coordinate } from "./PlayerPositioning";
import EventEmitter from "events";

export class PlayerManager extends EventEmitter {
  static instance: PlayerManager;
  static getInstance() {
    if (!PlayerManager.instance) {
      PlayerManager.instance = new PlayerManager();
    }
    return PlayerManager.instance;
  }
  Player: Map<number, Player>;
  draggedPlayer: Player | null = null;
  nextPlayerID: number = 0;
  lastMousePosition: Coordinate = { x: 0, y: 0 };
  active: Player | null;
  startTime = 0;
  difficulty: number = 1;
  accurateFrames: number = 0;
  totalFrames: number = 0;
  totalTime: number = 0;
  private constructor() {
    super();
    this.Player = new Map();
    this.active = null;
  }
  addPlayer(player: Player) {
    player.id = this.nextPlayerID;
    this.Player.set(this.nextPlayerID, player);
    this.nextPlayerID++;
    this.active = player;
    return this.Player.get(this.nextPlayerID - 1);
  }
  removePlayer(playerID: number) {
    this.Player.delete(playerID);
  }
  getPlayer(playerID: number) {
    return this.Player.get(playerID);
  }
  getPlayers() {
    return this.Player;
  }
  drawPlayers(p5: P5CanvasInstance) {
    // console.log("drawing Player");
    this.Player.forEach((player) => player.draw(p5));
    if (this.startTime) {
      this.totalFrames++;
      if (this.active && this.active.onSquares()) {
        this.accurateFrames++;
      }
      if (this.totalFrames % 60 === 0) {
        console.log(
          `Accuracy: ${this.accurateFrames / this.totalFrames} (${
            this.accurateFrames
          }/${this.totalFrames})`
        );
      }
    }
  }
  determinePlayerClicked(x: number, y: number) {
    if (this.draggedPlayer) return this.draggedPlayer;
    let playerClicked = null as Player | null;
    this.Player.forEach((player) => {
      if (player.isClickingOnPlayer(x, y) && !player.correct) {
        playerClicked = player;
      }
    });
    if (!this.startTime) {
      this.startTime = Date.now();
      this.emit("start", this.startTime);
    }
    return playerClicked;
  }
  releasePlayerFromMouse() {
    this.draggedPlayer = null;
  }
  lockPlayerToMouse(player: Player, p5: P5CanvasInstance) {
    if (this.draggedPlayer) return;
    this.draggedPlayer = player;
    this.lastMousePosition = { x: p5.mouseX, y: p5.mouseY };
  }
  mouseMoveUpdate(p5: P5CanvasInstance) {
    if (this.draggedPlayer) {
      const deltaX = p5.mouseX - this.lastMousePosition.x;
      const deltaY = p5.mouseY - this.lastMousePosition.y;
      this.draggedPlayer.updatePosition({
        x: deltaX,
        y: deltaY,
      });
      this.lastMousePosition = { x: p5.mouseX, y: p5.mouseY };
    }
  }
  gameOver() {
    this.totalTime = (Date.now() - this.startTime) / 1000;
    console.log(
      this.totalTime,
      "seconds",
      this.accurateFrames / this.totalFrames
    );
    sessionStorage.setItem(
      "labyStats",
      JSON.stringify({
        time: this.totalTime,
        accuracy: this.accurateFrames / this.totalFrames,
      })
    );
    this.emit("gameOver", {
      time: this.totalTime,
      acc: this.accurateFrames / this.totalFrames,
    });
  }
  reset() {
    this.startTime = 0;
    this.Player.clear();
    this.active = null;
    this.draggedPlayer = null;
  }
  setDifficulty(difficulty: number) {
    this.difficulty = difficulty;
  }
}
