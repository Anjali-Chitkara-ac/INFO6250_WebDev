
import {
  checkLoginStatus,
  performLogin,
  addItemToList,
  deleteItemFromList,
  logout,
  updateRank,
  sortedItems,
  sortByRank
} from './services';

let items = {};

addLogin();

const list = document.querySelector('#list-app .logged-in'); //loggedin div
const input = document.querySelector('#list-app .logged-in .add-item');
const listItems = document.querySelector('#list-app .logged-in .items');
const logOutButton = document.querySelector('#list-app .logged-in .logout');
const status = document.querySelector('.status');

checkLoginStatus()
.then((userInfo) => {
  showContent();
  items = userInfo.items;
  renderTodos(items);
   updateStatus('');
})
.catch( error => {
  showLogin();
  updateStatus(error.error);
});

//Move these HTML-changing functions to an import from another file
function showContent() {
  document.querySelector('#list-app .login').classList.add('hidden');
  document.querySelector('#list-app .logged-in').classList.remove('hidden');
}

function showLogin() {
  document.querySelector('#list-app .login').classList.remove('hidden');
  document.querySelector('#list-app .logged-in').classList.add('hidden');
}

function addLogin() { //when login is pressed
  document.querySelector('#list-app .login button').addEventListener('click', () => {
    const usernameEl = document.querySelector('#list-app .login input');
    const username = usernameEl.value;
    // call service
    performLogin(username)
    .then( items => {
      showContent();
      renderTodos(items);
       updateStatus('');
    })
    .catch( err => {
      updateStatus(err.error);
      console.log(err);
    })
  });
}

//logout
logOutButton.addEventListener('click',() => {
  //call service
  logout()
  .then((userInfo) => {
  showLogin();
  })
  .catch( error => {
  showContent();
  })
  });


list.addEventListener('click',(e) => {
  //add
  if(e.target.classList.contains('add')){
    const itemToBeAdded = input.value;
    //call service
    //get username from cookie
    addItemToList(itemToBeAdded)
    .then( items => {
      showContent();
      renderTodos(items);
       updateStatus('');
    })
    .catch( err => {
      updateStatus(err.error);
      console.log(err);
    })
  }
  //sortItems
  if(e.target.classList.contains('sortAsc')){
    sortedItems()
    .then( items => {
      sortByRank(items, 'rank',1);
      showContent();
      renderTodos(items);
       updateStatus('');
    })
    .catch( err => {
      updateStatus(err.error);
      console.log(err);
    })
  }
  if(e.target.classList.contains('sortDec')){
    sortedItems()
    .then( items => {
      sortByRank(items, 'rank',-1);
      showContent();
      renderTodos(items);
       updateStatus('');
    })
    .catch( err => {
      updateStatus(err.error);
      console.log(err);
    })
  }
});


listItems.addEventListener('click',(e) =>{
  //delete
  if(e.target.classList.contains('delete') ) {
      const itemName = e.target.dataset.itemName;
      deleteItemFromList(itemName)
      .then( items => {
        showContent();
        renderTodos(items);
         updateStatus('');
      })
      .catch( err => {
      updateStatus(err.error);
      console.log(err);
      }) ;
    }
  //update rank
  if(e.target.classList.contains('update')){
    const itemName = e.target.dataset.itemName;

    const newRank = document.getElementById(itemName).value;
    const cleanRank = newRank.replace(/[^0-9_]/g, '');

    //call service
    //itemName, newRAnk
    updateRank(itemName,cleanRank)
    .then( items => {
        showContent();
        console.log('in update client');
        console.log({items});
        renderTodos(items);
         updateStatus('');
      })
      .catch( err => {
      updateStatus(err.error);
      console.log(err);
      }) ;
  }

});

function updateStatus( message ) {
    status.innerText = message;
  }

function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

function renderTodos(items) {
  const listEl = document.querySelector('#list-app .items');

  if(!items)
    return;

  const html = items.map( item => {
    return `<li class="item"><span> #${item.rank}   ${item.name} </span>
    <button data-item-name="${item.name}" type="button" class="delete">Delete</button>
    <input data-item-name="${item.name}" class="rank" id="${item.name}">
    <button data-item-name="${item.name}" type="button" class="update">Update rank</button>
    </li>`;
  }).join("\n");
  listEl.innerHTML = html;
}
