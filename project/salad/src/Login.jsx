import { useState } from 'react';
import { createSession } from './services';

const Login = function({ onLogin }){

  const [username, setUsername] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState('');

  const onChange = (e) => {
    setUsername(e.target.value);
    setIsDisabled(!e.target.value);
  };

  const login = () => {
    setIsPending(true);
    createSession({ username })
    .then( userinfo => {
      setIsPending(false);
      setStatus('');
      onLogin({ username, info: userinfo.info });
    })
    .catch( err => {
      setIsPending(false);
      setStatus(err.error);
    });
  };

  if(isPending) {
    console.log('ispending');
    return (
      <div className="pending">
        <img align="middle" className="loading" src="images/loading.gif"/>
      </div>
    );
  }

  return (
  <div>
    <div class="status">{status}</div>
    <p> Please login to customize your salad </p>
    <label>
      Username:
      <input onChange={onChange} value={username} />
    </label>
    <button onClick={login} disabled={isDisabled || isPending}> Login </button>
  </div>
);

}

export default Login;
