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

/***/ "./src/Hexagon.ts":
/*!************************!*\
  !*** ./src/Hexagon.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst PIXI = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/lib/index.js\");\nclass Hexagon extends PIXI.Graphics {\n    constructor(hex, hexRadius, hexWidth, hexHeight, textContent = 'Undefined') {\n        super();\n        this.hex = hex;\n        this.hexRadius = hexRadius;\n        this.hexWidth = hexWidth;\n        this.hexHeight = hexHeight;\n        this.textContent = textContent;\n        const points = [\n            [0, -this.hexRadius],\n            [this.hexWidth / 2, -this.hexRadius / 2],\n            [this.hexWidth / 2, this.hexRadius / 2],\n            [0, this.hexRadius],\n            [-this.hexWidth / 2, this.hexRadius / 2],\n            [-this.hexWidth / 2, -this.hexRadius / 2],\n            [0, -this.hexRadius] // Close the loop\n        ];\n        const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF];\n        const thicknesses = [1, 2, 3, 4, 5, 6];\n        for (let i = 0; i < points.length - 1; i++) {\n            this.lineStyle(thicknesses[i], colors[i], 1);\n            this.moveTo(points[i][0], points[i][1]);\n            this.lineTo(points[i + 1][0], points[i + 1][1]);\n        }\n        // Fill color\n        this.lineStyle(0); // Reset line style to avoid affecting the fill\n        this.beginFill(0xFF00BB, 0.25);\n        this.drawPolygon(points.flat());\n        this.endFill();\n        const textStyle = new PIXI.TextStyle({\n            fontFamily: 'Arial',\n            fontSize: 14,\n            fill: 'white'\n        });\n        const text = new PIXI.Text(this.textContent, textStyle);\n        text.anchor.set(0.5); // Center the text\n        text.x = 0; // Relative to the hexagon's x\n        text.y = 0; // Relative to the hexagon's y\n        this.addChild(text); // Add text as a \n    }\n    onDragStart() {\n    }\n    onDragMove(event) {\n    }\n    onDragStop() {\n        const cell = this.hex.getGridCell(this.x, this.y);\n        const nearbyCells = [\n            `${cell.x},${cell.y}`,\n            `${cell.x + 1},${cell.y}`,\n            `${cell.x - 1},${cell.y}`,\n            `${cell.x},${cell.y + 1}`,\n            `${cell.x},${cell.y - 1}`,\n        ];\n        let closestHex = null;\n        let minDist = Infinity;\n        const flatNearbyCells = nearbyCells.flatMap(key => this.hex.grid[key] || []);\n        flatNearbyCells.forEach(otherHex => {\n            if (this === otherHex)\n                return;\n            const dx = this.x - otherHex.x;\n            const dy = this.y - otherHex.y;\n            const dist = Math.sqrt(dx * dx + dy * dy);\n            if (dist < minDist) {\n                minDist = dist;\n                closestHex = otherHex;\n            }\n        });\n        if (minDist < 100) { // within snapping range\n            const dx = closestHex.x - this.x;\n            const dy = closestHex.y - this.y;\n            const angle = Math.atan2(dy, dx);\n            const snapAngle = Math.round(6 * angle / (2 * Math.PI)) * (2 * Math.PI / 6);\n            console.log(snapAngle);\n            this.x = closestHex.x - Math.cos(snapAngle) * this.hexWidth;\n            this.y = closestHex.y - Math.sin(snapAngle) * this.hexWidth;\n        }\n    }\n}\nexports[\"default\"] = Hexagon;\n\n\n//# sourceURL=webpack:///./src/Hexagon.ts?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b6acbb93523ce24e240c")
/******/ })();
/******/ 
/******/ }
);