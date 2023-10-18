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

eval("let canvas;\r\nlet ctx;\r\nconst baseColor = '#FEFEE3';\r\n\r\nconst loadCanvas = (canvasToLoad) => {\r\n    canvas = document.getElementById(canvasToLoad);\r\n    ctx = canvas.getContext('2d')\r\n    /*\r\n    Didn't explicitly use this code but it was a starting out point for where I ended up:\r\n    https://stackoverflow.com/questions/9251480/set-canvas-size-using-javascript\r\n    The following link helped me understand the offset____ properties as well: \r\n    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth\r\n    */\r\n    canvas.width = canvas.parentElement.offsetWidth * .9;\r\n    canvas.height = canvas.parentElement.offsetHeight * .9;\r\n    ctx.fillStyle = baseColor;\r\n    ctx.fillRect(0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height);\r\n}\r\n\r\nconst canvasUpdateBike = (bike) => {\r\n    if(bike === 'road'){\r\n        return document.getElementById('rdBike');\r\n    }else if(bike === 'mountain'){\r\n        return document.getElementById('mtBike');\r\n    }\r\n    return false;\r\n}\r\n\r\nconst canvasUpdateTire = (tire) => {\r\n    if(tire === 'road'){\r\n        return document.getElementById('rdTire');\r\n    }\r\n    else if(tire === 'mountain'){\r\n        return document.getElementById('mtTire');\r\n    }\r\n    return false;\r\n}\r\n\r\nconst drawBike = (bike, tire, color) => {\r\n    let body; \r\n    let tires;\r\n    if(bike){\r\n        body = canvasUpdateBike(bike);\r\n\r\n        /*\r\n        Portions of this code started with code from: \r\n        https://stackoverflow.com/questions/45706829/change-color-image-in-canvas\r\n        As well as guidance from the following link:\r\n        https://www.w3schools.com/jsref/canvas_globalcompositeoperation.asp\r\n        */\r\n        ctx.fillStyle = color;\r\n        ctx.fillRect(0,0,canvas.width,canvas.height);\r\n        ctx.globalCompositeOperation = 'destination-in';\r\n        ctx.drawImage(body, canvas.width/2 -100, canvas.height/2 - 100);\r\n        ctx.globalCompositeOperation = 'destination-atop';\r\n        ctx.fillStyle = baseColor;\r\n        ctx.fillRect(0,0,canvas.width,canvas.height);\r\n        ctx.globalCompositeOperation = 'source-over';\r\n        //\r\n    }\r\n    if(tire){\r\n        if(tire === 'road'){\r\n            tires = document.getElementById('rdTire');\r\n        }\r\n        else if(tire === 'mountain'){\r\n            tires = document.getElementById('mtTire');\r\n        }\r\n        ctx.drawImage(tires, canvas.width/2 - 100, canvas.height/2 - 100);\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    loadCanvas,\r\n    drawBike,\r\n    canvasUpdateBike, \r\n    canvasUpdateTire,\r\n}\r\n\n\n//# sourceURL=webpack://project-1/./client/canvas.js?");

/***/ }),

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const canvasHandler = __webpack_require__(/*! ./canvas.js */ \"./client/canvas.js\");\r\n\r\nconst handleResponse = async (response) => {\r\n    const content = document.getElementById('content');\r\n    const responseArea = document.getElementById('response');\r\n    let jsonResponse;\r\n    if(response.status !== 204){\r\n        jsonResponse = await response.json();\r\n    }\r\n    switch(response.status){\r\n        case 200:\r\n            content.innerHTML = \"\";\r\n            let keys = Object.keys(jsonResponse.body);\r\n            //if searching for just one owners bikes\r\n            if(jsonResponse.body[keys[0]].owner){\r\n                for (let i = 0; i < keys.length; i++){//TODO add a div here as a card-type box\r\n                    let current = jsonResponse.body[keys[i]];\r\n\r\n                    let currentDiv = document.createElement('div');\r\n                    currentDiv.setAttribute('class', 'bikeCard');\r\n                    let canvasDiv = document.createElement('div');\r\n                    canvasDiv.setAttribute('class', 'canvasDiv');\r\n                    let currentCanvas = document.createElement('canvas');\r\n                    currentCanvas.setAttribute('id',`display${keys[i]}`);\r\n\r\n                    currentDiv.innerHTML += `<h3>${jsonResponse.body[keys[i]].owner}'s Bike #${keys[i]}</h3>`\r\n\r\n                    document.body.appendChild(currentDiv);\r\n                    canvasDiv.appendChild(currentCanvas);\r\n                    currentDiv.appendChild(canvasDiv);\r\n                    content.appendChild(currentDiv);\r\n\r\n                    canvasHandler.loadCanvas(currentCanvas.id);\r\n                    canvasHandler.drawBike(current.body, current.tires, current.color);\r\n                }\r\n            }else{\r\n                //if searching for all bikes\r\n                for(let i = 0; i < keys.length; i++){\r\n                    let keysJ = Object.keys(jsonResponse.body[keys[i]]);\r\n                    for (let j = 0; j < keysJ.length; j++){//TODO add a div here as a card-type box\r\n                        console.log(jsonResponse.body[keys[i]][keysJ[j]]);\r\n                        let current = jsonResponse.body[keys[i]][keysJ[j]];\r\n\r\n                        let currentDiv = document.createElement('div');\r\n                        currentDiv.setAttribute('class', 'bikeCard');    \r\n                        let canvasDiv = document.createElement('div');\r\n                        canvasDiv.setAttribute('class', 'canvasDiv');    \r\n                        let currentCanvas = document.createElement('canvas');\r\n                        currentCanvas.setAttribute('id',`display${keys[i]}x${keysJ[j]}`);\r\n                        \r\n                        currentDiv.innerHTML += `<h3>${jsonResponse.body[keys[i]][keysJ[j]].owner}'s Bike #${keysJ[j]}</h3>`\r\n\r\n                        document.body.appendChild(currentDiv);\r\n                        canvasDiv.appendChild(currentCanvas);\r\n                        currentDiv.appendChild(canvasDiv);\r\n                        content.appendChild(currentDiv);\r\n    \r\n                        canvasHandler.loadCanvas(currentCanvas.id);\r\n                        canvasHandler.drawBike(current.body, current.tires, current.color);\r\n                    }\r\n                }\r\n            }\r\n            break;\r\n        case 204:\r\n            responseArea.innerText = \"Bike added to collection\";\r\n            break;\r\n        case 201:\r\n        case 400:\r\n            if(jsonResponse.id === 'noUsername'){\r\n                content.innerHTML = jsonResponse.message;\r\n            }else{\r\n                responseArea.innerHTML = jsonResponse.message;\r\n            }\r\n            break;\r\n        case 404:\r\n            content.innerHTML = jsonResponse.message;\r\n            break;            \r\n    }\r\n    \r\n}\r\n\r\nconst sendFetch = async (updateForm, userName) => {\r\n    const formAction = updateForm.getAttribute('action');\r\n    const formMethod = updateForm.getAttribute('method');\r\n\r\n    let user = userName.value;\r\n    if(updateForm.querySelector('#whoseBikes').value === 'community'){\r\n        user = 'allBikes';\r\n    }\r\n\r\n    const formData = `user=${user}`;\r\n    const response = await fetch(`${formAction}?${formData}`, {\r\n        method: formMethod,\r\n        headers:{\r\n            'accept':'application/json',\r\n            'Content-Type': 'application/x-www-form-urlencoded',\r\n        },\r\n    })\r\n    handleResponse(response, formMethod);\r\n}\r\n\r\nconst sendPost = async (bikeForm, userName) => {\r\n    const formAction = bikeForm.getAttribute('action');\r\n    const formMethod = bikeForm.getAttribute('method');\r\n    const user = userName.value;\r\n\r\n    const formData = `user=${user}&body=${bikeForm.querySelector('#bikeBody').value}&tires=${bikeForm.querySelector('#bikeTire').value}&color=${bikeForm.querySelector('#bikeColor').value}`;\r\n    const response = await fetch(formAction, {\r\n        method: formMethod,\r\n        headers: {\r\n            'Accept':'application/json',\r\n            'Content-Type':'application/x-www-form-urlencoded',\r\n        },\r\n        body: formData,\r\n    });\r\n    handleResponse(response, formMethod);\r\n}\r\n\r\nconst init = () => {\r\n    const bikeForm = document.getElementById('bikeForm');\r\n    const updateForm = document.getElementById('updateForm');\r\n    const userName = document.getElementById('usersName');\r\n    const canvas = document.getElementById('canvas');\r\n    const bikeSelect = document.getElementById('bikeBody');\r\n    const tireSelect = document.getElementById('bikeTire');\r\n    const colorSelect = document.getElementById('bikeColor');\r\n    \r\n    const addBike = (e) => {\r\n        e.preventDefault();\r\n        sendPost(bikeForm, userName);\r\n        return false;\r\n    }\r\n\r\n    const updateBikes = (e) => {\r\n        e.preventDefault();\r\n        sendFetch(updateForm, userName);\r\n        return false;\r\n    }\r\n\r\n    const canvasUpdate = (e) => {\r\n        // if(e.target.id === 'bikeBody'){\r\n        //     canvasHandler.canvasUpdateBike(bikeSelect.value);\r\n        // }else if(e.target.id === 'bikeTire'){\r\n        //     canvasHandler.canvasUpdateTire(tireSelect.value);\r\n        // }\r\n        canvasHandler.loadCanvas(canvas.id);\r\n        canvasHandler.drawBike(bikeSelect.value, tireSelect.value, colorSelect.value);\r\n        return false;\r\n    }\r\n\r\n    canvasHandler.loadCanvas(canvas.id);\r\n\r\n    bikeForm.addEventListener('submit', addBike);\r\n    updateForm.addEventListener('submit', updateBikes);\r\n    bikeSelect.addEventListener('change', canvasUpdate);\r\n    tireSelect.addEventListener('change', canvasUpdate);\r\n    colorSelect.addEventListener('change', canvasUpdate);\r\n    /*\r\n    Resize event stuff was derived from: \r\n    https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event\r\n    */\r\n    window.addEventListener('resize', canvasUpdate);\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://project-1/./client/client.js?");

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