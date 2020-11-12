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

/***/ }),

/***/ "../src/envelope_follower_worklet.js":
/*!*******************************************!*\
  !*** ../src/envelope_follower_worklet.js ***!
  \*******************************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ \"../src/constants.js\");\n;\n\nclass EnvelopeFollowerWorklet extends AudioWorkletProcessor {\n\tstatic get parameterDescriptors() {\n\t\treturn [{\n\t\t\tname: 'level',\n\t\t\tdefaultValue: _constants_js__WEBPACK_IMPORTED_MODULE_0__.DefaultParameters.envelopeLevel,\n\t\t\tminValue: _constants_js__WEBPACK_IMPORTED_MODULE_0__.ParameterMinimums.envelopeLevel,\n\t\t\tmaxValue: _constants_js__WEBPACK_IMPORTED_MODULE_0__.ParameterMaximums.envelopeLevel\n\t\t}];\n\t}\n\n\tconstructor() {\n\t\tsuper();\n\t\tthis.numberOfEnvelopes = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DefaultParameters.envelopeLevel;\n\n\t\tthis.lastSample = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.Constants.MAX_ENVELOPES).fill(0);\n\t\tthis.lastSign = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_0__.Constants.MAX_ENVELOPES).fill(0);\n\t\tthis.currentLength = 0;\n\t\tthis.minimumLength = _constants_js__WEBPACK_IMPORTED_MODULE_0__.Constants.RAMP_SAMPLES + 1;\n\t}\n\n\tfollowEnvelopes(sample) {\n\t\tlet flag = true;\n\n\t\t// For each level but the top one, find whether we're at a local maximum to get the envelope\n\t\tfor (let i = 0; flag && i < (this.numberOfEnvelopes - 2); i++) {\n\t\t\tlet delta = sample - this.lastSample[i];\n\t\t\tlet sign = delta == 0 ? this.lastSign[i] : delta / Math.abs(delta);\n\t\t\tif (this.lastSign[i] == 1 && sign == -1) { // Maximum\n\t\t\t\tflag = true;\n\t\t\t}\n\t\t\telse {\n\t\t\t\tflag = false;\n\t\t\t}\n\t\t\tthis.lastSample[i] = sample;\n\t\t\tthis.lastSign[i] = sign;\n\t\t}\n\t\t\n\t\t// We wish to find the minimum of the top envelope, as a splitting point.\n\t\tif (flag) {\n\t\t\t\n\t\t\tlet i = this.numberOfEnvelopes - 2;\n\t\t\tlet delta = sample - this.lastSample[i];\n\t\t\tlet sign = delta == 0 ? this.lastSign[i] : delta / Math.abs(delta);\n\t\t\tif (this.lastSign[i] == -1 && sign == 1) {\n\t\t\t\tflag = true;\n\t\t\t}\n\t\t\telse {\n\t\t\t\tflag = false;\n\t\t\t}\n\t\t\tthis.lastSample[i] = sample;\n\t\t\tthis.lastSign[i] = sign;\n\t\t}\n\n\t\t// Check whether the length is too small to be audible\n\t\tif (flag && (this.currentLength < this.minimumLength)) {\n\t\t\tflag = false;\n\t\t}\n\n\t\t// If we get this far with the flag still set, we've hit a minimum in the top envelope.\n\t\tif (flag) {\n\t\t\tthis.currentLength = 0;\n\t\t\treturn true;\n\n\t\t}\n\t\telse {\n\t\t\tthis.currentLength += 1;\n\t\t\treturn false;\n\t\t}\n\t}\n\n\t// eslint-disable-next-line no-unused-vars\n\tprocess(inputs, outputs, parameters) {\n\t\tlet input = inputs[0][0];\n\t\tthis.numberOfEnvelopes = parameters.level;\n\n\t\tfor(let i = 0; i < input.length; i++) {\n\t\t\tif(this.followEnvelopes(input[i])) {\n\t\t\t\tthis.port.postMessage({\n\t\t\t\t\tmessage: 'Level = ' + this.numberOfEnvelopes,\n\t\t\t\t\t// eslint-disable-next-line no-undef\n\t\t\t\t\tcontextTimestamp: currentTime,\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\n\t\treturn true;\n\t}\n}\n\nregisterProcessor('envelope-follower', EnvelopeFollowerWorklet);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXBwYW55YWtpLy4uL3NyYy9lbnZlbG9wZV9mb2xsb3dlcl93b3JrbGV0LmpzPzM3OTgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFrRzs7QUFFbEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEVBQStCO0FBQ2hELGFBQWEsMEVBQStCO0FBQzVDLGFBQWEsMEVBQStCO0FBQzVDLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLDBFQUErQjs7QUFFMUQsOEJBQThCLGtFQUF1QjtBQUNyRCw0QkFBNEIsa0VBQXVCO0FBQ25EO0FBQ0EsdUJBQXVCLGlFQUFzQjtBQUM3Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLDBDQUEwQztBQUMzRDtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiIuLi9zcmMvZW52ZWxvcGVfZm9sbG93ZXJfd29ya2xldC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uc3RhbnRzLCBEZWZhdWx0UGFyYW1ldGVycywgUGFyYW1ldGVyTWluaW11bXMsIFBhcmFtZXRlck1heGltdW1zfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5cbmNsYXNzIEVudmVsb3BlRm9sbG93ZXJXb3JrbGV0IGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHtcblx0c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpIHtcblx0XHRyZXR1cm4gW3tcblx0XHRcdG5hbWU6ICdsZXZlbCcsXG5cdFx0XHRkZWZhdWx0VmFsdWU6IERlZmF1bHRQYXJhbWV0ZXJzLmVudmVsb3BlTGV2ZWwsXG5cdFx0XHRtaW5WYWx1ZTogUGFyYW1ldGVyTWluaW11bXMuZW52ZWxvcGVMZXZlbCxcblx0XHRcdG1heFZhbHVlOiBQYXJhbWV0ZXJNYXhpbXVtcy5lbnZlbG9wZUxldmVsXG5cdFx0fV07XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubnVtYmVyT2ZFbnZlbG9wZXMgPSBEZWZhdWx0UGFyYW1ldGVycy5lbnZlbG9wZUxldmVsO1xuXG5cdFx0dGhpcy5sYXN0U2FtcGxlID0gbmV3IEFycmF5KENvbnN0YW50cy5NQVhfRU5WRUxPUEVTKS5maWxsKDApO1xuXHRcdHRoaXMubGFzdFNpZ24gPSBuZXcgQXJyYXkoQ29uc3RhbnRzLk1BWF9FTlZFTE9QRVMpLmZpbGwoMCk7XG5cdFx0dGhpcy5jdXJyZW50TGVuZ3RoID0gMDtcblx0XHR0aGlzLm1pbmltdW1MZW5ndGggPSBDb25zdGFudHMuUkFNUF9TQU1QTEVTICsgMTtcblx0fVxuXG5cdGZvbGxvd0VudmVsb3BlcyhzYW1wbGUpIHtcblx0XHRsZXQgZmxhZyA9IHRydWU7XG5cblx0XHQvLyBGb3IgZWFjaCBsZXZlbCBidXQgdGhlIHRvcCBvbmUsIGZpbmQgd2hldGhlciB3ZSdyZSBhdCBhIGxvY2FsIG1heGltdW0gdG8gZ2V0IHRoZSBlbnZlbG9wZVxuXHRcdGZvciAobGV0IGkgPSAwOyBmbGFnICYmIGkgPCAodGhpcy5udW1iZXJPZkVudmVsb3BlcyAtIDIpOyBpKyspIHtcblx0XHRcdGxldCBkZWx0YSA9IHNhbXBsZSAtIHRoaXMubGFzdFNhbXBsZVtpXTtcblx0XHRcdGxldCBzaWduID0gZGVsdGEgPT0gMCA/IHRoaXMubGFzdFNpZ25baV0gOiBkZWx0YSAvIE1hdGguYWJzKGRlbHRhKTtcblx0XHRcdGlmICh0aGlzLmxhc3RTaWduW2ldID09IDEgJiYgc2lnbiA9PSAtMSkgeyAvLyBNYXhpbXVtXG5cdFx0XHRcdGZsYWcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGZsYWcgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRoaXMubGFzdFNhbXBsZVtpXSA9IHNhbXBsZTtcblx0XHRcdHRoaXMubGFzdFNpZ25baV0gPSBzaWduO1xuXHRcdH1cblx0XHRcblx0XHQvLyBXZSB3aXNoIHRvIGZpbmQgdGhlIG1pbmltdW0gb2YgdGhlIHRvcCBlbnZlbG9wZSwgYXMgYSBzcGxpdHRpbmcgcG9pbnQuXG5cdFx0aWYgKGZsYWcpIHtcblx0XHRcdFxuXHRcdFx0bGV0IGkgPSB0aGlzLm51bWJlck9mRW52ZWxvcGVzIC0gMjtcblx0XHRcdGxldCBkZWx0YSA9IHNhbXBsZSAtIHRoaXMubGFzdFNhbXBsZVtpXTtcblx0XHRcdGxldCBzaWduID0gZGVsdGEgPT0gMCA/IHRoaXMubGFzdFNpZ25baV0gOiBkZWx0YSAvIE1hdGguYWJzKGRlbHRhKTtcblx0XHRcdGlmICh0aGlzLmxhc3RTaWduW2ldID09IC0xICYmIHNpZ24gPT0gMSkge1xuXHRcdFx0XHRmbGFnID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRmbGFnID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmxhc3RTYW1wbGVbaV0gPSBzYW1wbGU7XG5cdFx0XHR0aGlzLmxhc3RTaWduW2ldID0gc2lnbjtcblx0XHR9XG5cblx0XHQvLyBDaGVjayB3aGV0aGVyIHRoZSBsZW5ndGggaXMgdG9vIHNtYWxsIHRvIGJlIGF1ZGlibGVcblx0XHRpZiAoZmxhZyAmJiAodGhpcy5jdXJyZW50TGVuZ3RoIDwgdGhpcy5taW5pbXVtTGVuZ3RoKSkge1xuXHRcdFx0ZmxhZyA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIElmIHdlIGdldCB0aGlzIGZhciB3aXRoIHRoZSBmbGFnIHN0aWxsIHNldCwgd2UndmUgaGl0IGEgbWluaW11bSBpbiB0aGUgdG9wIGVudmVsb3BlLlxuXHRcdGlmIChmbGFnKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRMZW5ndGggPSAwO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRMZW5ndGggKz0gMTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0cHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHtcblx0XHRsZXQgaW5wdXQgPSBpbnB1dHNbMF1bMF07XG5cdFx0dGhpcy5udW1iZXJPZkVudmVsb3BlcyA9IHBhcmFtZXRlcnMubGV2ZWw7XG5cblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgaW5wdXQubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmKHRoaXMuZm9sbG93RW52ZWxvcGVzKGlucHV0W2ldKSkge1xuXHRcdFx0XHR0aGlzLnBvcnQucG9zdE1lc3NhZ2Uoe1xuXHRcdFx0XHRcdG1lc3NhZ2U6ICdMZXZlbCA9ICcgKyB0aGlzLm51bWJlck9mRW52ZWxvcGVzLFxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHRcdFx0XHRcdGNvbnRleHRUaW1lc3RhbXA6IGN1cnJlbnRUaW1lLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufVxuXG5yZWdpc3RlclByb2Nlc3NvcignZW52ZWxvcGUtZm9sbG93ZXInLCBFbnZlbG9wZUZvbGxvd2VyV29ya2xldCk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../src/envelope_follower_worklet.js\n");

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
/******/ 	__webpack_require__("../src/envelope_follower_worklet.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;