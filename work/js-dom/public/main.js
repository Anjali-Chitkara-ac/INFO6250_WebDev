"use strict";
(function iife() {

  const items = [
    {
      text: 'books',
      quantity: 5,
    },
    {
      text: 'table',
      quantity: 2,
    },
    {
      text: 'cushions',
      quantity: 8,
    },
  ];

  const listEl = document.querySelector('#inventory .stock');
  const inputEl = document.querySelector('#inventory input');
  const buttonEl = document.querySelector('#inventory .add');

  disableButtonIfNoInput();
  addAbilityToAddItems();
  addAbilityToIncreaseQuantity();
  addAbilityToDecreaseQuantity();
  addAbilityToDeleteItems();
  
  render(items);

  function render(items){
      const html = items.map((item, index) => { 

        if(item.quantity > 0) {
          console.log("button should be enabled");
          return `
            <li>
              <button class="decrease" data-index="${index}" id="${item.text}"> - </button>
              <span data-index="${index}"> ${item.text} : ${item.quantity} </span>
              <button class="increase" data-index="${index}"> + </button>
              <button class="delete" data-index="${index}">X</botton>
            </li>
          `;
        } else {
          console.log("button should be disabled");
          return `
            <li>
              <button class="decrease" data-index="${index}" id="${item.text}" disabled> - </button>
              <span data-index="${index}"> ${item.text} : ${item.quantity} </span>
              <button class="increase" data-index="${index}"> + </button>
              <button class="delete" data-index="${index}">X</button>
            </li>
          `;
        }

      }).join('');

      listEl.innerHTML = html;
      buttonEl.disabled = !inputEl.value; 
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', (e) => {
      
      const newItem = {
        text: inputEl.value,
        quantity: 0,
      };
      items.push(newItem);

      inputEl.value = '';
      
      render(items);
    });
  }

  function addAbilityToIncreaseQuantity(){
    listEl.addEventListener('click', (e) => {
      if(e.target.classList.contains('increase')) {
        
        const index = e.target.dataset.index;
        items[index].quantity += 1;

      render(items);
      }
      else return;
    });
  }

  function addAbilityToDecreaseQuantity(){
    listEl.addEventListener('click', (e) => {
      if(e.target.classList.contains('decrease')) {
        
        const index = e.target.dataset.index;
        items[index].quantity -= 1;

      render(items);
      }
      else return;
    });
  }

  function disableButtonIfNoInput() {
    inputEl.addEventListener('input', () => {
      if(!inputEl.value){
        buttonEl.disabled=true;
      }
      else {
        buttonEl.disabled=false};
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', (e) => { 

      if(!e.target.classList.contains('delete')) {
        return;
      }

      const index = e.target.dataset.index; 
      items.splice(index, 1);
      render(items);
    });
  }

  })();