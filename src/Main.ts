import HexagonApp from "./HexagonApp"; 
import * as PIXI from "pixi.js"
 
document.addEventListener('DOMContentLoaded', () => { 
    
    let containerElement = document.getElementById('pixi-container'); 
    let app = new PIXI.Application({ resizeTo: window });
    let resizeCanvas = () => { 
        app.renderer.resize(window.innerWidth, window.innerHeight);
    };
  
    containerElement.appendChild(app.view as any);
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    (document as any).hexApp = new HexagonApp(app) as any;
});
