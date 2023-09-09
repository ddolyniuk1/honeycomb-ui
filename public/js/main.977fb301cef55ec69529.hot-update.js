"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate"]("main",{

/***/ "./src/InteractionManager.ts":
/*!***********************************!*\
  !*** ./src/InteractionManager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nclass InteractionManager {\n    constructor(hex) {\n        this.dragTarget = null;\n        this.hex = hex;\n        console.dir(hex.app.stage);\n        let stage = hex.app.stage;\n        stage.eventMode = 'static';\n        stage.hitArea = hex.app.screen;\n        stage.on('pointerup', this.onDragEnd, this);\n        stage.on('pointerupoutside', this.onDragEnd, this);\n    }\n    initDragInteraction(graphics) {\n        let target = graphics;\n        target.eventMode = 'static';\n        target.cursor = 'pointer';\n        //target.anchor.set(0.5);\n        target.on('pointerdown', this.onDragStart.bind(this, graphics));\n    }\n    onDragMove(event) {\n        if (this.dragTarget) {\n            const dragHandler = this.dragTarget;\n            if (dragHandler) {\n                dragHandler.onDragMove(event);\n            }\n            this.dragTarget.parent.toLocal(event.global, null, this.dragTarget.position);\n        }\n    }\n    onDragStart(graphics) {\n        // store a reference to the data\n        // the reason for this is because of multitouch\n        // we want to track the movement of this particular touch\n        // this.data = event.data;\n        graphics.alpha = 0.5;\n        this.dragTarget = graphics;\n        this.hex.app.stage.on('pointermove', this.onDragMove.bind(this));\n    }\n    onDragEnd() {\n        if (this.dragTarget) {\n            const dragHandler = this.dragTarget;\n            if (dragHandler) {\n                dragHandler.onDragStop();\n            }\n            this.hex.app.stage.off('pointermove', this.onDragMove.bind(this));\n            this.dragTarget.alpha = 1;\n            this.dragTarget = null;\n        }\n    }\n}\nexports[\"default\"] = InteractionManager;\n\n\n//# sourceURL=webpack:///./src/InteractionManager.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("908ef156bffc1022bff2")
/******/ })();
/******/ 
/******/ }
);