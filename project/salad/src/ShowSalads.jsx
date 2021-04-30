import ShowSaladItems from './ShowSaladItems';
import {deleteSalad} from './services';
import { useState } from 'react';

const ShowSalads = ({ userState, onBuy, setUserState}) => {
  const[saladState, setSaladState] = useState(Object.values(userState.info));
  const [status, setStatus] = useState('');

  const removeSalad = (event) => {
    const saladID = event.target.dataset.id;
    deleteSalad(saladID)
    .then( response => {
        setSaladState(Object.values(response));
        setUserState({
        isLoggedIn : true,
        isCustomizing : false,
        isPending : false,
        username : userState.username,
        info : response,
        isBuying:false
        })
      })
      .catch( err => {
        setStatus(err.error);
      })
  }

  let content= <div> </div>

  const buy = (event) =>{
    const price = event.target.dataset.price;
    onBuy(price);
  }



  const savedSalads = saladState.map((salad, index) =>
       <li className="salads" key={index} data-id={salad.id}>
       <ShowSaladItems salad={salad.saladItems}/>
       <p> Price = ${salad.price} </p>
       <button data-id={salad.id} onClick={removeSalad}> Remove </button>
       <button data-id={salad.id} data-price= {salad.price} onClick={buy}> Buy </button>
       <br/><br/></li>
   );

  return (
    <ul className="savedSalads">
      {savedSalads}
    </ul>
  );
};
export default ShowSalads;
