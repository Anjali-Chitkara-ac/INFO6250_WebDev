export const checkSession = () => {
  return fetch('/api/session',  {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const createSession = ({username}) => {
  return fetch('/api/session',  {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const endSession = () => {
  return fetch('/api/session',  {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'network-error'} ) )
  .then( response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then( json => Promise.reject(json) );
  });
};

export const addSaladToUserList = ({saladID,saladItems}) => {
  return fetch('/api/addSalad',{
    method : 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({saladID,saladItems}),
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

export const deleteSalad = (saladID) => {
  return fetch(`/api/app/${saladID}`, {
        method: 'DELETE',
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
