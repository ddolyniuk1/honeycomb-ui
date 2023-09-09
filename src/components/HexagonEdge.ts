import { Point, Graphics } from "pixi.js";
 
export default class HexagonEdge extends Graphics {
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