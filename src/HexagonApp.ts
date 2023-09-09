import Hexagon from "./Hexagon";
import * as PIXI from 'pixi.js';
import InteractionManager from "./InteractionManager";

export default class HexagonApp { 
  private _app: PIXI.Application;
  interactionManager: InteractionManager;
  public get app(): PIXI.Application {
    return this._app;
  }

  private panZoomContainer: PIXI.Container;
  private _grid: { [key: string]: Hexagon[]; };
  public get grid(): { [key: string]: Hexagon[]; } {
    return this._grid;
  } 
  private hexagons: Hexagon[];
  private hexRadius: number;
  private hexWidth: number;
  private hexHeight: number;
  private cellSize: number;

  constructor(app : PIXI.Application) { 
    this._app = app;
    this._grid = {};
    this.interactionManager = new InteractionManager(this);
    this.panZoomContainer = new PIXI.Container();
    this.app.stage.addChild(this.panZoomContainer);   

    this.hexagons = [];
    this.hexRadius = 30;
    this.hexWidth = Math.sqrt(3) * this.hexRadius;
    this.hexHeight = 2 * this.hexRadius;
    this.cellSize = this.hexWidth * 2;

    for (let i = 0; i < 10; i++) {
      this.createHexagon(Math.random() * 800, Math.random() * 600);
    }
  }
  
  public getGridCell(x: number, y: number): { x: number, y: number } {
    return {
      x: Math.floor(x / this.cellSize),
      y: Math.floor(y / this.cellSize),
    };
  }

  private createHexagon(x: number, y: number): void {
    const hexagon = new Hexagon(this, this.hexRadius, this.hexWidth);
    this.panZoomContainer.addChild(hexagon);
    this.hexagons.push(hexagon);

    const cell = this.getGridCell(x, y);
    const cellKey = `${cell.x},${cell.y}`;
    if (!this.grid[cellKey]) {
      this.grid[cellKey] = [];
    }
    this.grid[cellKey].push(hexagon);
    hexagon.x = x;
    hexagon.y = y;

    this.interactionManager.initDragInteraction(hexagon);
  } 
}