/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/canvas.js":
/*!**************************!*\
  !*** ./client/canvas.js ***!
  \**************************/
/***/ ((module) => {

eval("const canvas = document.getElementById(\"canvas\");\r\nconst ctx = canvas.getContext('2d');\r\n\r\nconst loadCanvas = () => {\r\n    canvas.width = document.getElementById('bikeAdd').offsetWidth * .95;\r\n    canvas.height = document.getElementById('bikeAdd').offsetHeight * .95\r\n    ctx.fillStyle = '#FEFEE3';\r\n    ctx.fillRect(0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height);\r\n}\r\n\r\nconst canvasUpdateBike = (bike) => {\r\n    if(bike === 'road'){\r\n        return document.getElementById('rdBike');\r\n    }else if(bike === 'mountain'){\r\n        return document.getElementById('mtBike');\r\n    }\r\n    return false;\r\n}\r\n\r\nconst canvasUpdateTire = (tire) => {\r\n    if(tire === 'road'){\r\n        return document.getElementById('rdTire');\r\n    }\r\n    else if(tire === 'mountain'){\r\n        return document.getElementById('mtTire');\r\n    }\r\n    return false;\r\n}\r\n\r\nconst drawBike = (bike, tire, color) => {\r\n    loadCanvas();\r\n    let body; \r\n    let tires;\r\n    if(bike){\r\n        body = canvasUpdateBike(bike);\r\n        ctx.drawImage(body, 2, 2);\r\n\r\n        ctx.fillStyle = color;\r\n        ctx.fillRect(0,0,canvas.width,canvas.height);\r\n        ctx.globalCompositeOperation = 'destination-in';\r\n        ctx.drawImage(body, 0, 0)\r\n\r\n\r\n        // ctx.globalCompositeOperation = 'source-in';\r\n        // console.log(color);\r\n        // ctx.fillStyle = color;\r\n        // console.log(canvas.width);\r\n        // ctx.fillRect(0,0,canvas.width,canvas.height);\r\n        // ctx.globalCompositeOperation = 'source-over';\r\n\r\n\r\n\r\n    }\r\n    if(tire){\r\n        if(tire === 'road'){\r\n            tires = document.getElementById('rdTire');\r\n        }\r\n        else if(tire === 'mountain'){\r\n            tires = document.getElementById('mtTire');\r\n        }\r\n        ctx.drawImage(tires, 2, 2);\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    loadCanvas,\r\n    drawBike,\r\n    canvasUpdateBike, \r\n    canvasUpdateTire,\r\n}\r\n\n\n//# sourceURL=webpack://project-1/./client/canvas.js?");

/***/ }),

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const canvasHandler = __webpack_require__(/*! ./canvas.js */ \"./client/canvas.js\");\r\n\r\nconst handleResponse = async (response) => {\r\n    const content = document.getElementById('content');\r\n    console.log(response);\r\n    const jsonResponse = await response.json();\r\n\r\n    console.log(jsonResponse);\r\n}\r\n\r\nconst sendFetch = async (updateForm, userName) => {\r\n    const formAction = updateForm.getAttribute('action');\r\n    const formMethod = updateForm.getAttribute('method');\r\n\r\n    let user = userName.value;\r\n    if(updateForm.querySelector('#whoseBikes').value === 'community'){\r\n        user = 'allBikes';\r\n    }\r\n\r\n    const formData = `user=${user}`;\r\n    const response = await fetch(`${formAction}?${formData}`, {\r\n        method: formMethod,\r\n        headers:{\r\n            'accept':'application/json',\r\n            'Content-Type': 'application/x-www-form-urlencoded',\r\n        },\r\n    })\r\n    handleResponse(response, formMethod);\r\n}\r\n\r\nconst sendPost = async (bikeForm, userName) => {\r\n    const formAction = bikeForm.getAttribute('action');\r\n    const formMethod = bikeForm.getAttribute('method');\r\n    const user = userName.value;\r\n\r\n    const formData = `user=${user}&body=${bikeForm.querySelector('#bikeBody').value}&tires=${bikeForm.querySelector('#bikeTire').value}`;\r\n    const response = await fetch(formAction, {\r\n        method: formMethod,\r\n        headers: {\r\n            'Accept':'application/json',\r\n            'Content-Type':'application/x-www-form-urlencoded',\r\n        },\r\n        body: formData,\r\n    });\r\n    handleResponse(response, formMethod);\r\n}\r\n\r\nconst canvasUpdate = () => {\r\n\r\n}\r\n\r\nconst init = () => {\r\n    const bikeForm = document.getElementById('bikeForm');\r\n    const updateForm = document.getElementById('updateForm');\r\n    const userName = document.getElementById('usersName');\r\n    const canvas = document.getElementById('canvas');\r\n    const bikeSelect = document.getElementById('bikeBody');\r\n    const tireSelect = document.getElementById('bikeTire');\r\n    const colorSelect = document.getElementById('bikeColor');\r\n    \r\n    const addBike = (e) => {\r\n        e.preventDefault();\r\n        sendPost(bikeForm, userName);\r\n        return false;\r\n    }\r\n\r\n    const updateBikes = (e) => {\r\n        e.preventDefault();\r\n        sendFetch(updateForm, userName);\r\n        return false;\r\n    }\r\n\r\n    const canvasUpdate = (e) => {\r\n        // if(e.target.id === 'bikeBody'){\r\n        //     canvasHandler.canvasUpdateBike(bikeSelect.value);\r\n        // }else if(e.target.id === 'bikeTire'){\r\n        //     canvasHandler.canvasUpdateTire(tireSelect.value);\r\n        // }\r\n        canvasHandler.drawBike(bikeSelect.value, tireSelect.value, colorSelect.value);\r\n        return false;\r\n    }\r\n\r\n    canvasHandler.loadCanvas(canvas);\r\n\r\n    bikeForm.addEventListener('submit', addBike);\r\n    updateForm.addEventListener('submit', updateBikes);\r\n    bikeSelect.addEventListener('change', canvasUpdate);\r\n    tireSelect.addEventListener('change', canvasUpdate);\r\n    colorSelect.addEventListener('change', canvasUpdate);\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://project-1/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/client.js");
/******/ 	
/******/ })()
;