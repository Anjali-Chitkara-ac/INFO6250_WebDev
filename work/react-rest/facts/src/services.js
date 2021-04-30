export const showFacts = () => {
  return fetch('/api/facts',  {
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

export const showFactsInRange = function(pgSize,startIdx){
  return fetch('/api/facts',{
    method : 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({"pgSize" : pgSize,"startIdx" : startIdx}),
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
};
