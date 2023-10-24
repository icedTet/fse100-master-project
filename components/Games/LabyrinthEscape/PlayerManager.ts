import { P5CanvasInstance } from "@p5-wrapper/react";
import { Player, Coordinate } from "./PlayerPositioning";

export class PlayerManager {
  
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
    private constructor() {
      this.Player = new Map();
    }
    addPlayer(player: Player) {
      player.id = this.nextPlayerID;
      this.Player.set(this.nextPlayerID, player);
      this.nextPlayerID++;
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
    }
    determinePlayerClicked(x: number, y: number) {
      if (this.draggedPlayer) return this.draggedPlayer;
      let playerClicked = null as Player | null;
      this.Player.forEach((player) => {
        if (player.isClickingOnPlayer(x, y) && !player.correct) {
          playerClicked = player;
        }
      });
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
  }