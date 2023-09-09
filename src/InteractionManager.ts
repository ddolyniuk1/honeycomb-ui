import HexagonApp from "./HexagonApp";
import * as PIXI from "pixi.js";
import IDragHandler from "./IDragHandler";

export default class InteractionManager {
    dragTarget: any;
    hex: HexagonApp;
    constructor(hex: HexagonApp) {
        this.dragTarget = null;
        this.hex = hex; 
        let stage = hex.app.stage as any;

        stage.eventMode = 'static';
        stage.hitArea = hex.app.screen;
        stage.on('pointerup', this.onDragEnd, this);
        stage.on('pointerupoutside', this.onDragEnd, this);
    }

    initDragInteraction(graphics: PIXI.Graphics) { 
        let target = graphics as any;

        target.eventMode = 'static';
        target.cursor = 'pointer'; 
        
        target.on('pointerdown', this.onDragStart.bind(this, graphics)); 
    }


    onDragMove(event: any) {
        if (this.dragTarget) {
            const dragHandler = this.dragTarget as IDragHandler;
            if (dragHandler) {
                dragHandler.onDragMove(event);
            }
            
            this.dragTarget.parent.toLocal(event.global, null, this.dragTarget.position);
        }
    }

    onDragStart(graphics: PIXI.Graphics) { 
        const dragHandler = this.dragTarget as IDragHandler;
        if (dragHandler) {
            dragHandler.onDragStart();
        }

        graphics.alpha = 0.5;
        this.dragTarget = graphics;
        (this.hex.app.stage as any).on('pointermove', this.onDragMove.bind(this));
    }

    onDragEnd() {
        if (this.dragTarget) {
            const dragHandler = this.dragTarget as IDragHandler;
            if (dragHandler) {
                dragHandler.onDragStop();
            }

            (this.hex.app.stage as any).off('pointermove', this.onDragMove.bind(this));
            this.dragTarget.alpha = 1;
            this.dragTarget = null;
        }
    }
}