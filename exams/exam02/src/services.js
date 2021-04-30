export const checkLoginStatus = function() {
  return fetch('/login', {
    method: 'GET',
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
   })
  .then( response => {
    if(response.ok) {
      return true;
    }
    return false.then( err => Promise.reject(err) );
  });
};

export const loadKitchen = function() {
  return fetch('/kitchen',{
    method: 'GET'
  })
  .catch(() => {
    return Promise.reject({ error: 'network-error' });
  })
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( err => Promise.reject(err) );
  })
}

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
    console.log(err + 'in performLogin')
    return response.json().then( err => Promise.reject(err) );
  });
};

export const addRecipeToList = function(title,ingredients, directions) {
  return fetch('/addRecipe',{
    method : 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({title,ingredients,directions}),
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

export const showDirections = function (id) {
  return fetch(`/detail/${id}`, {
    method: 'GET'
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

export const showHome = function(){
  return fetch('/', {
    method: 'GET'
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
