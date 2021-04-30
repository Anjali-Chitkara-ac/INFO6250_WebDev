export const showLogOutButton = function() {//shows content
  document.querySelector('.recipe-app .login').classList.add('hidden');
  document.querySelector('.recipe-app .logged-in').classList.remove('hidden');
}

export const showLoginButton = function() {//when logged out
  document.querySelector('.recipe-app .login').classList.remove('hidden');
  document.querySelector('.recipe-app .logged-in').classList.add('hidden');
}

export const showAddDetails = function(){//input details for recipe
  document.querySelector('.recipe-app .newRec').classList.add('hide');
  document.querySelector('.recipe-app .recipe-detail').classList.remove('hide');
}

export const hideAddDetails = function(){//shows new recipe & logout button
  document.querySelector('.newRec').classList.remove('hide');
  document.querySelector('.recipe-app .recipe-detail').classList.add('hide');
}

const status = document.querySelector('.errors');
export const updateStatus = function( message ) {
    status.innerText = message;

  }
