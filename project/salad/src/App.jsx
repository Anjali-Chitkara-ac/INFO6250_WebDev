import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Login from './Login';
import Home from './Home';
import { checkSession, endSession } from './services';
import Customize from './Customize';
import Buy from './Buy';


function App() {

  const[userState, setUserState] = useState({ isLoggedIn: false, isPending: false, isCustomizing:false, isBuying:false });
  const[total,setTotal] = useState(0);
  const [status, setStatus] = useState('');

  useEffect( () => {
    checkSession()
    .then( userinfo => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
        username: userinfo.username,
        info: userinfo.info,
      });
      setTotal(0);
    })
    .catch( () => {
      // We treat any failure as not logged in
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    });
  }, []); // only run on initial render


  const login = function({username, info}) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      username,
      info,
    });
  };

  const customize = function(){
    setUserState({
      isLoggedIn : true,
      isCustomizing : true,
      username : userState.username,
      info : userState.info
    });
  };

  const back = function(){
    setUserState({
      isLoggedIn : true,
      isCustomizing : false,
      username : userState.username,
      info : userState.info,
      isBuying : false
    });
  }

  let content;

  const logout = function() {
      setUserState({
        ...userState,
        isPending: true,
      });
      endSession()
      .then( () => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      })
      .catch( () => {
        setUserState({
          ...userState,
          isPending: false,
        });
      });
    };

    if(userState.isPending) {
      return (
        <div className="app">
          Loading...
        </div>
      );
    }


    const buy = function(price){
        setUserState({isLoggedIn : true,
        isCustomizing : false,
        username : userState.username,
        info : userState.info,
        isBuying:true
        });
        setTotal(price);
    }


  if(userState.isLoggedIn){
    //show content
    content = <Home userinfo={userState} onLogout={logout} onCustomize={customize} onBuy={buy} setUserState={setUserState}/>
    if(userState.isCustomizing){
      content = <Customize userinfo={userState} onBack={back}/>
    }
    if(userState.isBuying){
      content = <Buy price={total} onBack={back}/>
    }
  } else{
    //show login
    content = <Login onLogin={login}/>
  }


  return (
    <div className="app">
      <div class="status">{status}</div>
      {content}
    </div>
  );
}

export default App;
