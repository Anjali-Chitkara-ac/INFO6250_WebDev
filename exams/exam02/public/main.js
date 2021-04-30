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
/* harmony export */   "loadKitchen": () => (/* binding */ loadKitchen),
/* harmony export */   "performLogin": () => (/* binding */ performLogin),
/* harmony export */   "addRecipeToList": () => (/* binding */ addRecipeToList),
/* harmony export */   "logout": () => (/* binding */ logout),
/* harmony export */   "showDirections": () => (/* binding */ showDirections),
/* harmony export */   "showHome": () => (/* binding */ showHome)
/* harmony export */ });
var checkLoginStatus = function checkLoginStatus() {
  return fetch('/login', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return true;
    }

    return false.then(function (err) {
      return Promise.reject(err);
    });
  });
};
var loadKitchen = function loadKitchen() {
  return fetch('/kitchen', {
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

    console.log(err + 'in performLogin');
    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var addRecipeToList = function addRecipeToList(title, ingredients, directions) {
  return fetch('/addRecipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      directions: directions
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
var showDirections = function showDirections(id) {
  return fetch("/detail/".concat(id), {
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
var showHome = function showHome() {
  return fetch('/', {
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

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showLogOutButton": () => (/* binding */ showLogOutButton),
/* harmony export */   "showLoginButton": () => (/* binding */ showLoginButton),
/* harmony export */   "showAddDetails": () => (/* binding */ showAddDetails),
/* harmony export */   "hideAddDetails": () => (/* binding */ hideAddDetails),
/* harmony export */   "updateStatus": () => (/* binding */ updateStatus)
/* harmony export */ });
var showLogOutButton = function showLogOutButton() {
  //shows content
  document.querySelector('.recipe-app .login').classList.add('hidden');
  document.querySelector('.recipe-app .logged-in').classList.remove('hidden');
};
var showLoginButton = function showLoginButton() {
  //when logged out
  document.querySelector('.recipe-app .login').classList.remove('hidden');
  document.querySelector('.recipe-app .logged-in').classList.add('hidden');
};
var showAddDetails = function showAddDetails() {
  //input details for recipe
  console.log('show det is called');
  document.querySelector('.recipe-app .newRec').classList.add('hide');
  document.querySelector('.recipe-app .recipe-detail').classList.remove('hide');
};
var hideAddDetails = function hideAddDetails() {
  //shows new recipe & logout button
  console.log('hide det is called');
  document.querySelector('.newRec').classList.remove('hide');
  document.querySelector('.recipe-app .recipe-detail').classList.add('hide');
};
var status = document.querySelector('.errors');
var updateStatus = function updateStatus(message) {
  status.innerText = message;
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
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


var listEl = document.querySelector('.recipe-app .recipes');
var status = document.querySelector('.errors');
var titleInput = document.querySelector('.logged-in input');
var ingredientsInput = document.querySelector('.logged-in .ingredientsInput');
var directionsInput = document.querySelector('.logged-in .dirInput');
var addButton = document.querySelector('.recipe-app #add');
var logOutButton = document.querySelector('.recipe-app #logOut');
var newRecipe = document.querySelector('.newRec #new');
var directions = document.querySelector('.recipe-directions');
var det = document.querySelector('.det'); //const backButton = document.querySelector('#back');
//on page load

pageLoad();

function pageLoad() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.loadKitchen)().then(function (items) {
    renderRecipes(items);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)('');
  })["catch"](function (err) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("Sorry..could not load the kitchen");
  }) //end of fetch 1
  .then(function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.checkLoginStatus)().then(function (response) {
      //if you are logged in
      console.log('logged in');
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.showLogOutButton)();
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)('');
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.hideAddDetails)();
      directions.classList.add('hide'); //hide directions
    })["catch"](function (error) {
      //if you are logged out
      console.log('not logged in');
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.showLoginButton)();
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("You are not logged in");
      directions.classList.add('hide'); //hide directions

      console.log('end');
    });
  });
} //when login is pressed


document.querySelector('.recipe-app .login button').addEventListener('click', function () {
  var usernameEl = document.querySelector('.recipe-app .login input');
  var username = usernameEl.value; // call service

  (0,_services__WEBPACK_IMPORTED_MODULE_0__.performLogin)(username).then(function () {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.showLogOutButton)(); //renderRecipes(items);

    (0,_view__WEBPACK_IMPORTED_MODULE_1__.hideAddDetails)();
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)('');
  })["catch"](function (err) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)("Sorry..could not log you in");
  });
});
logOutButton.addEventListener('click', function () {
  //call service
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.logout)().then(function () {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.showLoginButton)();
  })["catch"](function (error) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.showLogOutButton)();
  });
});
addButton.addEventListener('click', function (e) {
  //on pressing add
  var title = titleInput.value;
  var directions = directionsInput.value;
  var ingredients = ingredientsInput.value; //call service

  (0,_services__WEBPACK_IMPORTED_MODULE_0__.addRecipeToList)(title, ingredients, directions).then(function (items) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.showLogOutButton)();
    renderRecipes(items);
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)('');
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.hideAddDetails)();
  })["catch"](function (err) {
    (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)(err);
  });
});
newRecipe.addEventListener('click', function (e) {
  (0,_view__WEBPACK_IMPORTED_MODULE_1__.showAddDetails)();
});
listEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('item')) {
    var id = e.target.dataset.id; //call service

    (0,_services__WEBPACK_IMPORTED_MODULE_0__.showDirections)(id).then(function (response) {
      renderInstructions(response);
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)('');
    })["catch"](function (err) {
      (0,_view__WEBPACK_IMPORTED_MODULE_1__.updateStatus)(err.error);
    });
  }
});

function convertError(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
}

function renderInstructions(item) {
  if (!item) {
    return;
  } else {
    var html = "<div class=\"detailed-recipe\">\n    <h3 class=\"title\"> ".concat(item.title, " </h3>\n    <h4 class=\"author\"> Author : ").concat(item.author, " </h4>\n    <p class=\"ingredients\">Ingredients : ").concat(item.ingredients, " </p>\n    <p class=\"instructions\">Instructions : ").concat(item.instructions, "</p>\n    </div>");
    det.innerHTML = html;
  } //hide everything & show only directions


  document.querySelector('.recipe-app').classList.add('hide');
  directions.classList.remove('hide');
} //back button when logged-in


document.querySelector('.return').addEventListener('click', function () {
  pageLoad();
}); //back button should re-load the page

document.querySelector('.back').addEventListener('click', function () {
  document.querySelector('.recipe-app').classList.remove('hide');
  pageLoad(); //shows home page
});

function renderRecipes(items) {
  if (!items) {
    return "<p> No recipes in the Kitchen ! Please login to add new recipes </p>";
  } else {
    var html = items.map(function (item) {
      return "<li class=\"item\" data-id=\"".concat(item.id, "\">\n      <a href=\"/details:").concat(item.id, "\" onclick=\"event.preventDefault()\">\n      <span class=\"item\" data-id=\"").concat(item.id, "\"> ").concat(item.title, " ---->  ").concat(item.author, " </span>\n      </a>\n      </li>");
    }).join("\n");
    listEl.innerHTML = html;
  }
}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map