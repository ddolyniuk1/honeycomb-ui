import * as PIXI from 'pixi.js';
import HexagonApp from './HexagonApp';
import IDragHandler from './IDragHandler';


function createGradTexture()
{
    // adjust it if somehow you need better quality for very very big images
    const quality = 256;
    const canvas = document.createElement('canvas');

    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    
    grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    grd.addColorStop(0.3, 'cyan');
    grd.addColorStop(0.7, 'red');
    grd.addColorStop(1, 'green');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
}

const gradTexture = createGradTexture();


class Point {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
}

class HexagonEdge extends PIXI.Graphics {
  private _start: Point;
  private _end: Point;
  private _centroid: Point;
  private _color: number;
  private _thickness: number;
  private _alpha: number;

  constructor(start: Point, end: Point, color: number = 0xFFFFFF, thickness: number = 1, alpha: number = 1) {
      super();
      this._start = start;
      this._end = end;
      this._color = color;
      this._thickness = thickness;
      this._alpha = alpha;
      this._centroid = new Point((start.x + end.x) / 2, (start.y + end.y) / 2);
      this.redraw();
  }

  get start(): Point {
      return this._start;
  }

  get end(): Point {
      return this._end;
  }

  get centroid(): Point {
      return this._centroid;
  }

  get color(): number {
      return this._color;
  }

  set color(value: number) {
      this._color = value;
      this.redraw();
  }

  get thickness(): number {
      return this._thickness;
  }

  set thickness(value: number) {
      this._thickness = value;
      this.redraw();
  }

  get lineAlpha(): number {
      return this._alpha;
  }

  set lineAlpha(value: number) {
      this._alpha = value;
      this.redraw();
  }

  redraw(): void {
      this.clear();
      this.lineStyle(this._thickness, this._color, this._alpha);
      this.moveTo(this._start.x, this._start.y);
      this.lineTo(this._end.x, this._end.y);
  }
}



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
      const start = new Point(this.points[i][0], this.points[i][1]);
      const end = new Point(this.points[i + 1][0], this.points[i + 1][1]);
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