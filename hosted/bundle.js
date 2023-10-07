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

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ (() => {

eval("const handleResponse = async (response) => {\r\n    const content = document.getElementById('content');\r\n\r\n    console.log(await response.json());\r\n}\r\n\r\nconst sendFetch = async (updateForm, userName) => {\r\n    const formAction = updateForm.getAttribute('action');\r\n    const formMethod = updateForm.getAttribute('method');\r\n\r\n    const user = userName.value;\r\n\r\n    formAction.searchParams.append('user', user);\r\n    //const formData = `user=${user}`;\r\n    const response = await fetch(formAction, {\r\n        method: formMethod,\r\n        headers:{\r\n            'accept':'application/json',\r\n            'Content-Type': 'application/x-www-form-urlencoded',\r\n        },\r\n    })\r\n    handleResponse(response, formMethod);\r\n}\r\n\r\nconst sendPost = async (bikeForm, userName) => {\r\n    const formAction = bikeForm.getAttribute('action');\r\n    const formMethod = bikeForm.getAttribute('method');\r\n    const user = userName.value;\r\n\r\n    const formData = `user=${user}&body=${bikeForm.querySelector('#bikeBody').value}&tires=${bikeForm.querySelector('#bikeTire').value}`;\r\n    const response = await fetch(formAction, {\r\n        method: formMethod,\r\n        headers: {\r\n            'Accept':'application/json',\r\n            'Content-Type':'application/x-www-form-urlencoded',\r\n        },\r\n        body: formData,\r\n    });\r\n    handleResponse(response, formMethod);\r\n}\r\n\r\nconst init = () => {\r\n    const bikeForm = document.getElementById('bikeForm');\r\n    const updateForm = document.getElementById('updateForm');\r\n    const userName = document.getElementById('usersName');\r\n    \r\n    const addBike = (e) => {\r\n        e.preventDefault();\r\n        sendPost(bikeForm, userName);\r\n        return false;\r\n    }\r\n\r\n    const updateBikes = (e) => {\r\n        e.preventDefault();\r\n        sendFetch(updateForm, userName);\r\n        return false;\r\n    }\r\n\r\n    bikeForm.addEventListener('submit', addBike);\r\n    updateForm.addEventListener('submit', updateBikes);\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://project-1/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;