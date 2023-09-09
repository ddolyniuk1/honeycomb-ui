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

/***/ "./src/HexagonApp.ts":
/*!***************************!*\
  !*** ./src/HexagonApp.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Hexagon_1 = __webpack_require__(/*! ./Hexagon */ \"./src/Hexagon.ts\");\nconst PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/index.js\");\nconst InteractionManager_1 = __webpack_require__(/*! ./InteractionManager */ \"./src/InteractionManager.ts\");\nclass HexagonApp {\n    get app() {\n        return this._app;\n    }\n    get grid() {\n        return this._grid;\n    }\n    constructor(app) {\n        this._app = app;\n        this.interactionManager = new InteractionManager_1.default(this);\n        this.panZoomContainer = new PIXI.Container();\n        this.app.stage.addChild(this.panZoomContainer);\n        this.grid = {};\n        this.hexagons = [];\n        this.hexRadius = 30;\n        this.hexWidth = Math.sqrt(3) * this.hexRadius;\n        this.hexHeight = 2 * this.hexRadius;\n        this.cellSize = this.hexWidth * 2;\n        for (let i = 0; i < 10; i++) {\n            this.createHexagon(Math.random() * 800, Math.random() * 600);\n        }\n    }\n    getGridCell(x, y) {\n        return {\n            x: Math.floor(x / this.cellSize),\n            y: Math.floor(y / this.cellSize),\n        };\n    }\n    createHexagon(x, y) {\n        const hexagon = new Hexagon_1.default(this, x, y, this.hexRadius, this.hexWidth);\n        this.panZoomContainer.addChild(hexagon);\n        this.hexagons.push(hexagon);\n        const cell = this.getGridCell(x, y);\n        const cellKey = `${cell.x},${cell.y}`;\n        if (!this.grid[cellKey]) {\n            this.grid[cellKey] = [];\n        }\n        this.grid[cellKey].push(hexagon);\n        hexagon.x = x;\n        hexagon.y = y;\n        this.interactionManager.initDragInteraction(hexagon);\n    }\n}\nexports[\"default\"] = HexagonApp;\n\n\n//# sourceURL=webpack:///./src/HexagonApp.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9112ed36a6a8145eaa74")
/******/ })();
/******/ 
/******/ }
);