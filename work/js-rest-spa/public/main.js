(function iife() {

	const add = document.querySelector('.add');
	const list = document.querySelector('.items');
	const toAdd = document.querySelector('.add-item');
  const status = document.querySelector('.status');
	//let items = [];

  const errMsgs = {
    'duplicate': 'That name already exists',
    'network-error': 'There was a problem connecting to the network, try again',
    'missing-name' : 'Please enter a valid name',
    'missing-id' : 'Cannot be deleted',
  };

  function updateStatus( message ) {
    status.innerText = message;
  }

	function getItems(item, index) {
	//console.log("item is " + JSON.stringify(item));
	}

    //key press
	toAdd.addEventListener('keydown', () => {
		let value = document.getElementById("b1").value;
		if(!value || value.length == 0)
			add.disabled = true;
		else
			add.disabled = false;
	
    });
	
	function renderItems( items ) {
	items.forEach(getItems);
    const html = items.map(
      (item) => {
      	if(item.quantity==0){
      		return `<li>
      	  <button class="decrease" data-item-id="${item.itemId}" data-quantity="${item.quantity}" disabled>-</button>
          <span class="item">${item.name} : ${item.quantity}</span>
          <button class="increase" data-item-id="${item.itemId}" data-quantity="${item.quantity}">+</button>
          <button class="delete" data-item-id="${item.itemId}">X</button>
        </li>`
    	}
    	else{
    		return `<li>
      	  <button class="decrease" data-item-id="${item.itemId}" data-quantity="${item.quantity}">-</button>
          <span class="item">${item.name} : ${item.quantity}</span>
          <button class="increase" data-item-id="${item.itemId}" data-quantity="${item.quantity}">+</button>
          <button class="delete" data-item-id="${item.itemId}">X</button>
        </li>`
    	}
    }).join('');
    list.innerHTML = html;
    add.disabled = !toAdd.value; 
  }

  list.addEventListener('click', (e) => {
  	//delete item
    if(e.target.classList.contains('delete') ) {
      const itemId = e.target.dataset.itemId;
      fetch(`/inventory/${itemId}`, {
        method: 'DELETE',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( items => {
        renderItems(items);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
    //increase
    if(e.target.classList.contains('increase')){
  		const itemId = e.target.dataset.itemId;
  		fetch(`/inventoryInc/${itemId}`, {
        method: 'POST',
      })
  		.catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( items => {
        renderItems(items);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
  	}
  	//decrease
    if(e.target.classList.contains('decrease')){
  		const itemId = e.target.dataset.itemId;
  		fetch(`/inventoryDec/${itemId}`, {
        method: 'POST',
      })
  		.catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( items => {
        renderItems(items);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
  	}
  });

  //add item
  add.addEventListener('click', () => {
    const itemName = toAdd.value;
    if(itemName) {
      fetch(`/inventory/${itemName}`, {
        method: 'POST',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError )
      .then( items => {
        toAdd.value = '';
        renderItems(items);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });

  function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

  //on page load
  fetch('/inventory/', {
    method: 'GET',
  })
    .catch( () => Promise.reject( { error: 'network-error' }) )
    .then( convertError )
    .then( items => {
      renderItems(items);
      updateStatus('');
    })
    .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
    });

})();