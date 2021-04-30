import { useState } from 'react';

function Play({setPlayerGuess}) {
  const [input, setValue] = useState("");

  const handleInput = (event) => {
  setValue(event.target.value);
}

  const updateName = (event) => {
  event.preventDefault();
  setPlayerGuess(input);
  setValue("");
}

  return (
    <div>
      <input name="playerGuess" value={input} onChange={handleInput}/>
      <button onClick={updateName}>Check</button>
    </div>
  );
};
export default Play;
