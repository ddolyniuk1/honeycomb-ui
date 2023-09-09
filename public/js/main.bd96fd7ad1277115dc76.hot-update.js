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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Hexagon_1 = __webpack_require__(/*! ./Hexagon */ \"./src/Hexagon.ts\");\nconst PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/index.js\");\nconst InteractionManager_1 = __webpack_require__(/*! ./InteractionManager */ \"./src/InteractionManager.ts\");\nclass HexagonApp {\n    get app() {\n        return this._app;\n    }\n    constructor(app) {\n        this._app = app;\n        this.interactionManager = new InteractionManager_1.default(this);\n        this.panZoomContainer = new PIXI.Container();\n        this.app.stage.addChild(this.panZoomContainer);\n        this.grid = {};\n        this.hexagons = [];\n        this.hexRadius = 30;\n        this.hexWidth = Math.sqrt(3) * this.hexRadius;\n        this.hexHeight = 2 * this.hexRadius;\n        this.cellSize = this.hexWidth * 2;\n        for (let i = 0; i < 10; i++) {\n            this.createHexagon(Math.random() * 800, Math.random() * 600);\n        }\n    }\n    getGridCell(x, y) {\n        return {\n            x: Math.floor(x / this.cellSize),\n            y: Math.floor(y / this.cellSize),\n        };\n    }\n    createHexagon(x, y) {\n        const hexagon = new Hexagon_1.default(x, y, this.hexRadius, this.hexWidth, this.snapToEdge.bind(this));\n        this.panZoomContainer.addChild(hexagon);\n        this.hexagons.push(hexagon);\n        const cell = this.getGridCell(x, y);\n        const cellKey = `${cell.x},${cell.y}`;\n        if (!this.grid[cellKey]) {\n            this.grid[cellKey] = [];\n        }\n        this.grid[cellKey].push(hexagon);\n        hexagon.x = x;\n        hexagon.y = y;\n    }\n    snapToEdge(draggedHex) {\n        const cell = this.getGridCell(draggedHex.x, draggedHex.y);\n        const nearbyCells = [\n            `${cell.x},${cell.y}`,\n            `${cell.x + 1},${cell.y}`,\n            `${cell.x - 1},${cell.y}`,\n            `${cell.x},${cell.y + 1}`,\n            `${cell.x},${cell.y - 1}`,\n        ];\n        let closestHex = null;\n        let minDist = Infinity;\n        const flatNearbyCells = nearbyCells.flatMap(key => this.grid[key] || []);\n        flatNearbyCells.forEach(otherHex => {\n            if (draggedHex === otherHex)\n                return;\n            const dx = draggedHex.x - otherHex.x;\n            const dy = draggedHex.y - otherHex.y;\n            const dist = Math.sqrt(dx * dx + dy * dy);\n            if (dist < minDist) {\n                minDist = dist;\n                closestHex = otherHex;\n            }\n        });\n        if (minDist < 100) { // within snapping range\n            const dx = closestHex.x - draggedHex.x;\n            const dy = closestHex.y - draggedHex.y;\n            const angle = Math.atan2(dy, dx);\n            const snapAngle = Math.round(6 * angle / (2 * Math.PI)) * (2 * Math.PI / 6);\n            draggedHex.x = closestHex.x - Math.cos(snapAngle) * this.hexWidth;\n            draggedHex.y = closestHex.y - Math.sin(snapAngle) * this.hexHeight * 0.75;\n        }\n    }\n}\nexports[\"default\"] = HexagonApp;\n\n\n//# sourceURL=webpack:///./src/HexagonApp.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7c68bd13944873e75313")
/******/ })();
/******/ 
/******/ }
);