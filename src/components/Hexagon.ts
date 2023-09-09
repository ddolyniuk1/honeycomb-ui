import * as PIXI from 'pixi.js';
import HexagonEdge from './HexagonEdge'
import HexagonApp from '../HexagonApp';
import IDragHandler from '../interfaces/IDragHandler';
 
class Hexagon extends PIXI.Graphics implements IDragHandler {
  private thicknesses: number[] = [1, 2, 3, 4, 5, 6];
  private colors: number[] = [ColorUtil.convert('#ff9900')];
  private textContent: string = 'Undefined';
  private edges: HexagonEdge[] = [];
  private points: number[][] = [];

  constructor(
    private hex: HexagonApp,
    private hexRadius: number,
    private hexWidth: number, 
  ) {
    super();

    this.initializeEdges(); 
    this.redraw();
  }

  initializeEdges() : void {
    this.points = [
      [0, -this.hexRadius],
      [this.hexWidth / 2, -this.hexRadius / 2],
      [this.hexWidth / 2, this.hexRadius / 2],
      [0, this.hexRadius],
      [-this.hexWidth / 2, this.hexRadius / 2],
      [-this.hexWidth / 2, -this.hexRadius / 2],
      [0, -this.hexRadius] // Close the loop
    ];
    for (let i = 0; i < this.points.length - 1; i++) {
      const start = new PIXI.Point(this.points[i][0], this.points[i][1]);
      const end = new PIXI.Point(this.points[i + 1][0], this.points[i + 1][1]);
      const edge = new HexagonEdge(start, end);
      this.edges.push(edge);
    }
  }

  redraw(): void {
    this.clear();
    this.edges.forEach(edge => {
      edge.redraw();
    });

    // Fill color
    this.lineStyle(0); // Reset line style to avoid affecting the fill
    
    this.beginFill(ColorUtil.convert('#ffdd00'), 0.25);
    this.drawPolygon(this.points.flat());
    this.endFill();
    const textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 14,
      fill: 'white'
    });

    const text = new PIXI.Text(this.textContent, textStyle);
    text.anchor.set(0.5); // Center the text
    text.x = 0; // Relative to the hexagon's x
    text.y = 0; // Relative to the hexagon's y

    this.addChild(text); // Add text as a 
  }

  onDragStart(): void {
  }
  onDragMove(event: any): void {
  }

  public onDragStop(): void {
    const cell = this.hex.getGridCell(this.x, this.y);
    const nearbyCells = [
      `${cell.x},${cell.y}`,
      `${cell.x + 1},${cell.y}`,
      `${cell.x - 1},${cell.y}`,
      `${cell.x},${cell.y + 1}`,
      `${cell.x},${cell.y - 1}`,
    ];

    let closestHex: Hexagon | null = null;
    let minDist = Infinity;
    const flatNearbyCells = nearbyCells.flatMap(key => this.hex.grid[key] || []);

    flatNearbyCells.forEach(otherHex => {
      if (this === otherHex) return;

      const dx = this.x - otherHex.x;
      const dy = this.y - otherHex.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        closestHex = otherHex;
      }
    });

    if (minDist < 100) { // within snapping range
      const dx = closestHex!.x - this.x;
      const dy = closestHex!.y - this.y;
      const angle = Math.atan2(dy, dx);
      const snapAngle = Math.round(6 * angle / (2 * Math.PI)) * (2 * Math.PI / 6);
      console.log(snapAngle);
      this.x = closestHex!.x - Math.cos(snapAngle) * this.hexWidth;
      this.y = closestHex!.y - Math.sin(snapAngle) * this.hexWidth;
    }
  }
}
export default Hexagon;  