export const checkLoginStatus = function() {
  return fetch('/session', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  });
};

export const performLogin = function( username ) {
  return fetch('/login', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  });
};


export const addItemToList = function(item){
  return fetch('/addItem',{
    method : 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({item}),
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err));
  });
}

export const sortByRank = function(items, rank, num) {
  return items.sort(function(a, b) {
      let x = a[rank]; let y = b[rank];
      return ((x < y) ? num * -1 : ((x > y) ? num * 1 : 0));
  });
}

export const sortedItems = function() {

   return fetch('/getItems',{
     method : 'POST',
   })
   .catch( () => {
     return Promise.reject({ error: 'network-error' });
    })
   .then( response => {
     if(response.ok) {
       return response.json();
     }
     return response.json().then( err => Promise.reject(err) );
   });
}
export const addItemToListWithRank = function(item,rank){
  return fetch('/addItemWithRank',{
    method : 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({item,rank}),
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      //console.log("addItemToListWithRank response is ok");
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  });
}

  export const deleteItemFromList = function(itemName){
  return fetch(`/deleteItem/${itemName}`,{
    method : 'DELETE'
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  });
 }

 export const logout = function(){
  return fetch('/logout', {
    method: 'POST'
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  });
 }

 export const updateRank = function(itemName,newRank){
  return deleteItemFromList(itemName)
  .then(response => {
     return addItemToListWithRank(itemName,newRank);
  });

 }
