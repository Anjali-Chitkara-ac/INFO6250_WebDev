/*
Shows :
1. customize options
2. save button : saves customozed salad to userinfo
3. back button : takes to home page (set isCustomizing to false)
*/

import { useState } from 'react';
import {addSaladToUserList} from './services';

const Customize = function({userinfo, onBack}){
let saladItems = [];
const [status, setStatus] = useState('');

const uuid = require('uuid').v4;

const handleInput = (event) => {
  const target = event.target;
  const value = target.value;

  if(target.checked){
    saladItems.push(value);
  } else{
    const index = saladItems.indexOf(value);
    if (index > -1) {
      saladItems.splice(index, 1);
    }
  }
}

const save = function(){
  //make a service call & save the salad
  const saladID = uuid();
  addSaladToUserList({saladID,saladItems})
  .then( response => {
      //response -> saved salads of that user
      userinfo.info = response;
      setStatus('');
      onBack();
    })
    .catch( err => {
      setStatus(err.error);
    })
}


  return(
    <div>
      <div class="status">{status}</div>
      <h4> Customizing as {userinfo.username} </h4>
      <p> Select from the following menu to customize your salad </p>
      <ul className="menu">
        <li className="menuItem">
          <label>
            <img className="image" src="images/apple.png"/>
            <input value="Apple" onChange={handleInput} type="checkbox" />
            <div className="overlay">Apple</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/orange.png"/>
            <input value="Orange" onChange={handleInput} type="checkbox" />
            <div className="overlay">Orange</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/grapes.png"/>
            <input value="Grapes" onChange={handleInput} type="checkbox" />
            <div className="overlay">Grapes</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/bread.png"/>
            <input value="Bread" onChange={handleInput} type="checkbox" />
            <div className="overlay">Bread</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/strawberry.png"/>
            <input value="Strawberry" onChange={handleInput} type="checkbox" />
            <div className="overlay">Strawberry</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/mango.png"/>
            <input value="Mango" onChange={handleInput} type="checkbox" />
            <div className="overlay">Mango</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/vanilla.png"/>
            <input value="Vanilla-essence" onChange={handleInput} type="checkbox" />
            <div className="overlay">Vanilla essence</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/honey.png"/>
            <input value="Honey" onChange={handleInput} type="checkbox" />
            <div className="overlay">Honey</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/banana.png"/>
            <input value="Banana" onChange={handleInput} type="checkbox" />
            <div className="overlay">Banana</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/butter.png"/>
            <input value="Butter" onChange={handleInput} type="checkbox" />
            <div className="overlay">Butter</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/egg.png"/>
            <input value="Egg" onChange={handleInput} type="checkbox" />
            <div className="overlay">Egg</div>
          </label>
        </li>
        <li className="menuItem">
          <label>
            <img className="image" src="images/pine.png"/>
            <input value="Pineapple" onChange={handleInput} type="checkbox" />
            <div className="overlay">Pineapple</div>
          </label>
        </li>
      </ul>
      <button onClick={save}> Save </button>
      <button onClick={onBack}> Back </button>
    </div>
  );
}

/*
TODO : disable the save button if nothing is selected
*/

export default Customize;
