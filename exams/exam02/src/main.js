import{
  checkLoginStatus,
  loadKitchen,
  performLogin,
  addRecipeToList,
  logout,
  showDirections,
  showHome
} from './services'

import{
  showLogOutButton,
  showLoginButton,
  updateStatus,
  showAddDetails,
  hideAddDetails
} from './view'


const listEl = document.querySelector('.recipe-app .recipes');
const status = document.querySelector('.errors');
const titleInput = document.querySelector('.logged-in input');
const ingredientsInput = document.querySelector('.logged-in .ingredientsInput');
const directionsInput = document.querySelector('.logged-in .dirInput');
const addButton = document.querySelector('.recipe-app #add');
const logOutButton = document.querySelector('.recipe-app #logOut');
const newRecipe = document.querySelector('.newRec #new');
const directions = document.querySelector('.recipe-directions');
const det = document.querySelector('.det');
//const backButton = document.querySelector('#back');

//on page load
pageLoad();

function pageLoad(){
loadKitchen()
.then(items => {
  renderRecipes(items);
  updateStatus('');
})
.catch( err => {
  updateStatus("Sorry..could not load the kitchen");
})//end of fetch 1
.then(() => {
   checkLoginStatus()
  .then((response) => {//if you are logged in
    console.log('logged in');
    showLogOutButton();
    updateStatus('');
    hideAddDetails();
    directions.classList.add('hide');//hide directions
  })
  .catch( error => {//if you are logged out
    console.log('not logged in');
    showLoginButton();
    updateStatus("You are not logged in");
    directions.classList.add('hide');//hide directions
  })
})
}


 //when login is pressed
  document.querySelector('.recipe-app .login button').addEventListener('click', () => {
    const usernameEl = document.querySelector('.recipe-app .login input');
    const username = usernameEl.value;
    // call service
    performLogin(username)
    .then(() => {
      showLogOutButton();
      //renderRecipes(items);
      hideAddDetails();
      updateStatus('');
    })
    .catch( err => {
      updateStatus("Sorry..could not log you in");
    })
  });

logOutButton.addEventListener('click',() => {
  //call service
  logout()
  .then(() => {
    showLoginButton();
  })
  .catch( error => {
    showLogOutButton();
  })
});

addButton.addEventListener('click' , (e) => { //on pressing add
  const title = titleInput.value;
  const directions = directionsInput.value;
  const ingredients = ingredientsInput.value;
  //call service
  addRecipeToList(title,ingredients,directions)
  .then( items => {
      showLogOutButton();
      renderRecipes(items);
       updateStatus('');
       hideAddDetails();
    })
    .catch( err => {
      updateStatus(err);
    })
})

newRecipe.addEventListener('click' ,(e) => {
  showAddDetails();
})

listEl.addEventListener('click' , (e) => {
  if(e.target.classList.contains('item')){
    const id = e.target.dataset.id;
    //call service
    showDirections(id)
    .then((response) => {
      renderInstructions(response)
      updateStatus('');
    })
    .catch( err => {
      updateStatus(err.error);
    })
  }
})

function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

function renderInstructions(item){
  if(!item){
    return;
  }
  else{
    const html = `<div class="detailed-recipe">
    <h3 class="title"> ${item.title} </h3>
    <h4 class="author"> Author : ${item.author} </h4>
    <p class="ingredients">Ingredients : ${item.ingredients} </p>
    <p class="instructions">Instructions : ${item.instructions}</p>
    </div>`;
    det.innerHTML = html;
  }
  //hide everything & show only directions
  document.querySelector('.recipe-app').classList.add('hide');
  directions.classList.remove('hide');
}

//back button when logged-in
document.querySelector('.return').addEventListener('click' ,() => {
  pageLoad();
});

//back button should re-load the page
document.querySelector('.back').addEventListener('click' ,() => {
  document.querySelector('.recipe-app').classList.remove('hide');
  pageLoad();//shows home page
});

function renderRecipes(items) {
  if(!items){
    return `<p> No recipes in the Kitchen ! Please login to add new recipes </p>`;
  }
  else {
    const html = items.map( item => {
      return `<li class="item" data-id="${item.id}">
      <a href="/details:${item.id}" onclick="event.preventDefault()">
      <span class="item" data-id="${item.id}"> ${item.title} ---->  ${item.author} </span>
      </a>
      </li>`;
    }).join("\n");
    listEl.innerHTML = html;
  }
}
