import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Play from './Play';
import Result from './Result';
import PlayAgain from './PlayAgain';

function App() {
  const [playerGuess, setPlayerGuess] = useState();
  console.log("Player guess is " + playerGuess);

  const reset = () => {
  setPlayerGuess();
  };

  return (
    <div className="game">
      <h3>Welcome to the Guess Game !</h3>
      { playerGuess && <Result playerGuess={playerGuess}/> }
      { !playerGuess && <Play setPlayerGuess={setPlayerGuess}/> }
      { playerGuess && <PlayAgain onReset={reset}/> }
    </div>
  );
}

export default App;
