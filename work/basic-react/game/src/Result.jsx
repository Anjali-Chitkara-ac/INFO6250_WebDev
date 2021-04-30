import { getCommonLetters } from './common';

const secretWord = "RECAT";

function Result({playerGuess}){

  if(playerGuess.length!==5){
    return (
    <div>
      <p> {playerGuess} is not a valid word</p>
    </div>
    );
  }

  const commonLetters = getCommonLetters(playerGuess,secretWord);

  let result = "computing";
  if(playerGuess.toUpperCase() === secretWord){
    result = 'win';
  }
  else{
    result = 'lose';
  }
  if(result==='win'){
  return (
  <div>
    <p> {playerGuess} was the secret word</p>
  </div>
  );
  }
  else {
    return (
    <div>
      <p> {playerGuess} had {commonLetters} letters common with the secret word</p>
    </div>
    );
  }
}

export default Result;
