/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkLoginStatus": () => (/* binding */ checkLoginStatus),
/* harmony export */   "performLogin": () => (/* binding */ performLogin),
/* harmony export */   "addItemToList": () => (/* binding */ addItemToList),
/* harmony export */   "sortByRank": () => (/* binding */ sortByRank),
/* harmony export */   "sortedItems": () => (/* binding */ sortedItems),
/* harmony export */   "addItemToListWithRank": () => (/* binding */ addItemToListWithRank),
/* harmony export */   "deleteItemFromList": () => (/* binding */ deleteItemFromList),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "updateRank": () => (/* binding */ updateRank)
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var performLogin = function performLogin(username) {
  return fetch('/login', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var addItemToList = function addItemToList(item) {
  return fetch('/addItem', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      item: item
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var sortByRank = function sortByRank(items, rank, num) {
  return items.sort(function (a, b) {
    var x = a[rank];
    var y = b[rank];
    return x < y ? num * -1 : x > y ? num * 1 : 0;
  });
};
var sortedItems = function sortedItems() {
  return fetch('/getItems', {
    method: 'POST'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var addItemToListWithRank = function addItemToListWithRank(item, rank) {
  return fetch('/addItemWithRank', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      item: item,
      rank: rank
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      //console.log("addItemToListWithRank response is ok");
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var deleteItemFromList = function deleteItemFromList(itemName) {
  return fetch("/deleteItem/".concat(itemName), {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var logout = function logout() {
  return fetch('/logout', {
    method: 'POST'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var updateRank = function updateRank(itemName, newRank) {
  return deleteItemFromList(itemName).then(function (response) {
    return addItemToListWithRank(itemName, newRank);
  });
};

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");

var items = {};
addLogin();
var list = document.querySelector('#list-app .logged-in'); //loggedin div

var input = document.querySelector('#list-app .logged-in .add-item');
var listItems = document.querySelector('#list-app .logged-in .items');
var logOutButton = document.querySelector('#list-app .logged-in .logout');
var status = document.querySelector('.status');
(0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (userInfo) {
  showContent();
  items = userInfo.items;
  renderTodos(items);
  updateStatus('');
})["catch"](function (error) {
  showLogin();
  updateStatus(error.error);
}); //Move these HTML-changing functions to an import from another file

function showContent() {
  document.querySelector('#list-app .login').classList.add('hidden');
  document.querySelector('#list-app .logged-in').classList.remove('hidden');
}

function showLogin() {
  document.querySelector('#list-app .login').classList.remove('hidden');
  document.querySelector('#list-app .logged-in').classList.add('hidden');
}

function addLogin() {
  //when login is pressed
  document.querySelector('#list-app .login button').addEventListener('click', function () {
    var usernameEl = document.querySelector('#list-app .login input');
    var username = usernameEl.value; // call service

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function (items) {
      showContent();
      renderTodos(items);
      updateStatus('');
    })["catch"](function (err) {
      updateStatus(err.error);
      console.log(err);
    });
  });
} //logout


logOutButton.addEventListener('click', function () {
  //call service
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.logout)().then(function (userInfo) {
    showLogin();
  })["catch"](function (error) {
    showContent();
  });
});
list.addEventListener('click', function (e) {
  //add
  if (e.target.classList.contains('add')) {
    var itemToBeAdded = input.value; //call service
    //get username from cookie

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.addItemToList)(itemToBeAdded).then(function (items) {
      showContent();
      renderTodos(items);
      updateStatus('');
    })["catch"](function (err) {
      updateStatus(err.error);
      console.log(err);
    });
  } //sortItems


  if (e.target.classList.contains('sortAsc')) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.sortedItems)().then(function (items) {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.sortByRank)(items, 'rank', 1);
      showContent();
      renderTodos(items);
      updateStatus('');
    })["catch"](function (err) {
      updateStatus(err.error);
      console.log(err);
    });
  }

  if (e.target.classList.contains('sortDec')) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.sortedItems)().then(function (items) {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.sortByRank)(items, 'rank', -1);
      showContent();
      renderTodos(items);
      updateStatus('');
    })["catch"](function (err) {
      updateStatus(err.error);
      console.log(err);
    });
  }
});
listItems.addEventListener('click', function (e) {
  //delete
  if (e.target.classList.contains('delete')) {
    var itemName = e.target.dataset.itemName;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.deleteItemFromList)(itemName).then(function (items) {
      showContent();
      renderTodos(items);
      updateStatus('');
    })["catch"](function (err) {
      updateStatus(err.error);
      console.log(err);
    });
  } //update rank


  if (e.target.classList.contains('update')) {
    var _itemName = e.target.dataset.itemName;
    var newRank = document.getElementById(_itemName).value;
    var cleanRank = newRank.replace(/[^0-9_]/g, ''); //call service
    //itemName, newRAnk

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.updateRank)(_itemName, cleanRank).then(function (items) {
      showContent();
      console.log('in update client');
      console.log({
        items: items
      });
      renderTodos(items);
      updateStatus('');
    })["catch"](function (err) {
      updateStatus(err.error);
      console.log(err);
    });
  }
});

function updateStatus(message) {
  status.innerText = message;
}

function convertError(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
}

function renderTodos(items) {
  var listEl = document.querySelector('#list-app .items');
  if (!items) return;
  var html = items.map(function (item) {
    return "<li class=\"item\"><span> #".concat(item.rank, "   ").concat(item.name, " </span>\n    <button data-item-name=\"").concat(item.name, "\" type=\"button\" class=\"delete\">Delete</button>\n    <input data-item-name=\"").concat(item.name, "\" class=\"rank\" id=\"").concat(item.name, "\">\n    <button data-item-name=\"").concat(item.name, "\" type=\"button\" class=\"update\">Update rank</button>\n    </li>");
  }).join("\n");
  listEl.innerHTML = html;
}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map