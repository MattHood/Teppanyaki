/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../src/constants.js":
/*!***************************!*\
  !*** ../src/constants.js ***!
  \***************************/
/*! namespace exports */
/*! export Constants [provided] [no usage info] [missing usage info prevents renaming] */
/*! export DefaultParameters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export InitialDelayParameters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ParameterMaximums [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ParameterMinimums [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Constants\": () => /* binding */ Constants,\n/* harmony export */   \"InitialDelayParameters\": () => /* binding */ InitialDelayParameters,\n/* harmony export */   \"DefaultParameters\": () => /* binding */ DefaultParameters,\n/* harmony export */   \"ParameterMinimums\": () => /* binding */ ParameterMinimums,\n/* harmony export */   \"ParameterMaximums\": () => /* binding */ ParameterMaximums,\n/* harmony export */   \"default\": () => /* binding */ Constants\n/* harmony export */ });\nconst Constants = {\n\tRAMP_SAMPLES: 4000,\n\tNUMBER_OF_LINES: 6,\n\tMAX_DELAY_TIME: 3,\n\tSAMPLE_RATE: 44100,\n\tMAX_ENVELOPES: 10,\n\tRAMP_TIME: 4000 / 44100, // FIXME\n\tSLIDER_STEPS: 127\n};\n\nconst InitialDelayParameters = {\n\tdelayTime: 0.8,\n\tregen: 0.6,\n\tpan: 0\n};\n\nconst DefaultParameters = {\n\tdelayMin: 0.3,\n\tdelayMax: 1.6,\n\tregenMin: 0.3,\n\tregenMax: 0.8,\n\tpanMin: -1,\n\tpanMax: 1,\n\tcutoffHP: 400,\n\tcutoffLP: 4000,\n\tresonanceHP: 0.3,\n\tresonanceLP: 0.3,\n\tmix: 1,\n\tenvelopeLevel: 8,\n\tquantize: 1,\n\tsubdivision: 4,\n\tbpm: 120\n};\n\nconst ParameterMinimums = {\n\tdelayMin: 0.01,\n\tdelayMax: 0.01,\n\tregenMin: 0.1,\n\tregenMax: 0.1,\n\tpanMin: -1,\n\tpanMax: -1,\n\tcutoffHP: 0,\n\tcutoffLP: 0,\n\tresonanceHP: 0,\n\tresonanceLP: 0,\n\tmix: 0,\n\tenvelopeLevel: 5,\n\tquantize: 0,\n\tsubdivision: 1,\n\tbpm: 1\n};\n\nconst ParameterMaximums = {\n\tdelayMin: 3,\n\tdelayMax: 3,\n\tregenMin: 0.9,\n\tregenMax: 0.9,\n\tpanMin: 1,\n\tpanMax: 1,\n\tcutoffHP: 20000,\n\tcutoffLP: 20000,\n\tresonanceHP: 0.5,\n\tresonanceLP: 0.5,\n\tmix: 1,\n\tenvelopeLevel: 10,\n\tquantize: 1,\n\tsubdivision: 13,\n\tbpm: 300\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXBwYW55YWtpLy4uL3NyYy9jb25zdGFudHMuanM/NDdjOCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuLi9zcmMvY29uc3RhbnRzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IENvbnN0YW50cyA9IHtcblx0UkFNUF9TQU1QTEVTOiA0MDAwLFxuXHROVU1CRVJfT0ZfTElORVM6IDYsXG5cdE1BWF9ERUxBWV9USU1FOiAzLFxuXHRTQU1QTEVfUkFURTogNDQxMDAsXG5cdE1BWF9FTlZFTE9QRVM6IDEwLFxuXHRSQU1QX1RJTUU6IDQwMDAgLyA0NDEwMCwgLy8gRklYTUVcblx0U0xJREVSX1NURVBTOiAxMjdcbn07XG5cbmV4cG9ydCBjb25zdCBJbml0aWFsRGVsYXlQYXJhbWV0ZXJzID0ge1xuXHRkZWxheVRpbWU6IDAuOCxcblx0cmVnZW46IDAuNixcblx0cGFuOiAwXG59O1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdFBhcmFtZXRlcnMgPSB7XG5cdGRlbGF5TWluOiAwLjMsXG5cdGRlbGF5TWF4OiAxLjYsXG5cdHJlZ2VuTWluOiAwLjMsXG5cdHJlZ2VuTWF4OiAwLjgsXG5cdHBhbk1pbjogLTEsXG5cdHBhbk1heDogMSxcblx0Y3V0b2ZmSFA6IDQwMCxcblx0Y3V0b2ZmTFA6IDQwMDAsXG5cdHJlc29uYW5jZUhQOiAwLjMsXG5cdHJlc29uYW5jZUxQOiAwLjMsXG5cdG1peDogMSxcblx0ZW52ZWxvcGVMZXZlbDogOCxcblx0cXVhbnRpemU6IDEsXG5cdHN1YmRpdmlzaW9uOiA0LFxuXHRicG06IDEyMFxufTtcblxuZXhwb3J0IGNvbnN0IFBhcmFtZXRlck1pbmltdW1zID0ge1xuXHRkZWxheU1pbjogMC4wMSxcblx0ZGVsYXlNYXg6IDAuMDEsXG5cdHJlZ2VuTWluOiAwLjEsXG5cdHJlZ2VuTWF4OiAwLjEsXG5cdHBhbk1pbjogLTEsXG5cdHBhbk1heDogLTEsXG5cdGN1dG9mZkhQOiAwLFxuXHRjdXRvZmZMUDogMCxcblx0cmVzb25hbmNlSFA6IDAsXG5cdHJlc29uYW5jZUxQOiAwLFxuXHRtaXg6IDAsXG5cdGVudmVsb3BlTGV2ZWw6IDUsXG5cdHF1YW50aXplOiAwLFxuXHRzdWJkaXZpc2lvbjogMSxcblx0YnBtOiAxXG59O1xuXG5leHBvcnQgY29uc3QgUGFyYW1ldGVyTWF4aW11bXMgPSB7XG5cdGRlbGF5TWluOiAzLFxuXHRkZWxheU1heDogMyxcblx0cmVnZW5NaW46IDAuOSxcblx0cmVnZW5NYXg6IDAuOSxcblx0cGFuTWluOiAxLFxuXHRwYW5NYXg6IDEsXG5cdGN1dG9mZkhQOiAyMDAwMCxcblx0Y3V0b2ZmTFA6IDIwMDAwLFxuXHRyZXNvbmFuY2VIUDogMC41LFxuXHRyZXNvbmFuY2VMUDogMC41LFxuXHRtaXg6IDEsXG5cdGVudmVsb3BlTGV2ZWw6IDEwLFxuXHRxdWFudGl6ZTogMSxcblx0c3ViZGl2aXNpb246IDEzLFxuXHRicG06IDMwMFxufTtcblxuZXhwb3J0IHtDb25zdGFudHMgYXMgZGVmYXVsdH07Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../src/constants.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("../src/constants.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;