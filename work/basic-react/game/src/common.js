export function getCommonLetters(playerGuess,secretWord) {
  let matches = 0;
  if(playerGuess){
    let letterCount = {};
    for(let letter of secretWord){
      letterCount[letter] = letterCount + 1 || 1;
    }
    for(let letter of playerGuess.toUpperCase()){
      if(letterCount[letter]){
        letterCount[letter] -= 1;
        matches += 1;
      }
    }
  }
  return matches;
}
