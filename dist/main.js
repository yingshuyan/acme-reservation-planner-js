/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/createEle.js":
/*!**************************!*\
  !*** ./src/createEle.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createEle\": () => (/* binding */ createEle)\n/* harmony export */ });\nconst createEle = (tagName, attList, text) => {\n  const ele = document.createElement(tagName);\n  Object.assign(ele, attList);\n  if (!!text) {\n    ele.innerHTML = text;\n  }\n\n  return ele;\n};\n\n\n//# sourceURL=webpack://acme-reservation-planner/./src/createEle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createEle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createEle.js */ \"./src/createEle.js\");\n// import axios from \"axios\";\n\n // here if need to use createEle instead of {createEle}, the export shoud be \"export default createEle\" at the bottom of createEle.js. if don't want to use export default, then add export before func decla then here \"import {createEle} from \"./createEle\" \"\n\nconst userUl = document.getElementById(\"users-list\"); //retrieve users-List node\nconst restaurantUl = document.getElementById(\"restaurants-list\"); // retrieve restaurant-list node\n\nconst loadUsers = async () => {\n  try {\n    const response = await fetch(\"/api/users\"); // fetch returns a response,\n    const users = await response.json(); // convers the respons to JSON\n\n    users.forEach((ele) => {\n      userUl.appendChild(\n        (0,_createEle_js__WEBPACK_IMPORTED_MODULE_0__.createEle)(\"li\", { id: `user-${ele.id}`, className: \"users\" })\n      );\n      const userLi = document.getElementById(`user-${ele.id}`);\n      userLi.appendChild(\n        (0,_createEle_js__WEBPACK_IMPORTED_MODULE_0__.createEle)(\"a\", { href: `/#user-${ele.id}` }, ele.name)\n      );\n    });\n  } catch (er) {\n    console.log(\"Sorry! Something went wrong!\", er.message);\n  }\n};\n\nconst loadRestaurants = async () => {\n  try {\n    const response = await fetch(\"/api/restaurants\"); // fetch returns a response,\n    const restaurants = await response.json(); // convers the respons to JSON\n\n    restaurants.forEach((ele) => {\n      restaurantUl.appendChild(\n        (0,_createEle_js__WEBPACK_IMPORTED_MODULE_0__.createEle)(\"li\", { id: `rest-${ele.id}` }, ele.name)\n      );\n      const restaurantLi = document.getElementById(`rest-${ele.id}`);\n\n      btnReserveFunc(restaurantLi, ele.id);\n    });\n  } catch (er) {\n    console.log(\"Sorry! Something went wrong!\", er.message);\n  }\n};\n\nconst loadReservations = async (reservations) => {\n  try {\n    const reservationUl = document.getElementById(\"reservations-list\");\n    reservationUl.innerHTML = \"\";\n\n    reservations.forEach((ele) => {\n      const restaurant = (0,_createEle_js__WEBPACK_IMPORTED_MODULE_0__.createEle)(\n        \"li\",\n        { id: `resv-${ele.id}` },\n        ele.restaurant.name\n      );\n      reservationUl.appendChild(restaurant);\n      const reservationLi = document.getElementById(`resv-${ele.id}`);\n\n      btnCancelFunc(reservationLi, ele.id);\n    });\n  } catch (er) {\n    console.log(er);\n  }\n};\n\nconst renderReservations = async () => {\n  const userId = window.location.hash.slice(6);\n  const response = await fetch(`/api/users/${userId}/reservations`); //url in fetch can send request to server.so the url is what it's sending.\n  const updatedResv = await response.json();\n  loadReservations(updatedResv);\n};\n\nconst btnReserveFunc = async (parentNode, resvId) => {\n  const reservBtn = (0,_createEle_js__WEBPACK_IMPORTED_MODULE_0__.createEle)(\"button\", { id: `/#rest-${resvId} ` }, \"reserve\");\n  parentNode.prepend(reservBtn);\n\n  // console.log(\"body id ----->\", typeof resvId);\n  reservBtn.addEventListener(\"click\", async () => {\n    const userId = window.location.hash.slice(6);\n\n    const response = await fetch(`/api/users/${userId}/reservations`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n      },\n      body: JSON.stringify({ restaurantId: resvId }),\n    });\n    renderReservations();\n  });\n};\n\nconst btnCancelFunc = async (parentNode, cancelId) => {\n  const cancelBtn = (0,_createEle_js__WEBPACK_IMPORTED_MODULE_0__.createEle)(\"button\", { id: `/resv-${cancelId}` }, \"cancel\");\n  parentNode.prepend(cancelBtn);\n\n  cancelBtn.addEventListener(\"click\", async () => {\n    const response1 = await fetch(`/api/reservations/${cancelId}`, {\n      method: \"DELETE\",\n    });\n    // await response.json();\n    renderReservations();\n  });\n};\n\nloadUsers();\nloadRestaurants();\n\nwindow.addEventListener(\n  \"hashchange\",\n  async () => {\n    try {\n      [...document.querySelectorAll(\".users\")].map(\n        (ele) => (ele.style.backgroundColor = \"\")\n      ); //using map to clear out the backgroungColor of each node.\n\n      const num = window.location.hash.slice(6);\n      renderReservations();\n\n      document.getElementById(`user-${num}`).style.backgroundColor =\n        \"#00ff0080\"; // add transparent green color when selected\n    } catch (er) {\n      console.log(er.message);\n    }\n  },\n  false\n);\n\n\n//# sourceURL=webpack://acme-reservation-planner/./src/index.js?");

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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;