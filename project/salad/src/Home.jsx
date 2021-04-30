/*
Shows :
1. Logged in as
2. Saved salads
3. Button to create a new salad
4. Log out
*/

import { useState } from 'react';
import ShowSalads from './ShowSalads';

const Home = function({userinfo, onLogout, onCustomize, onBuy, setUserState}){

//render userinfo & show
let content;
if(!userinfo.info){
  content = <p> You do not have any saved salads </p>;
}
else{
  content =
    <div>
      <h3> Your Saved Salads </h3>
      <ShowSalads userState={userinfo} onBuy={onBuy} setUserState={setUserState}/>
    </div>;
}


return(
  <div>
    <h4>Hi {userinfo.username}!</h4>
    <div> {content} </div>
    <button onClick={onCustomize}> Make a new salad </button>
    <button onClick={onLogout}> Log-out </button>
  </div>
);

}

export default Home;
