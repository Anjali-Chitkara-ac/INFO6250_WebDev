let guessedWords = [];
let acceptedGuesses = 0;
let matchingLetters = [];
const game = {
  gamePage: function(words,input,secretWord, isNewGame) {

    if(isNewGame) {
      guessedWords = [];
      acceptedGuesses = 0;
      matchingLetters = [];
      return `
      <!doctype html>
      <html>
        <head>
          <title>Guess Game</title>
        </head>
        <body>
        <div class = "form">
          <form action="/check" method="POST" >
            <label>
              Your Word <input name="input" placeholder="Enter here"/>
            </label>
            <label>
              <button type="submit">Submit</button>
            </label>
          </form>
        </div>
        <div class = "dict">Dictionary ${words} </div>

        <div class="logout">
        <form action="/logout" method="POST">
        <button type="submit">Logout</button></form>
        </div>

        <link href="/style.css" rel="stylesheet">
        </body>
        </html>`

    }
    return `
      <!doctype html>
      <html>
        <head>
          <title>Guess Game</title>
        </head>
        <body>
        <div class = "form">
          <form action="/check" method="POST" >
            <label>
              Your Word <input name="input" placeholder="Enter here"/>
            </label>
            <label>
              <button type="submit">Submit</button>
            </label>
          </form>
        </div>
        <div class = "dict">Dictionary ${words} </div>
        <div class = "validity"> ${game.validityCheck(words,input)}</div>

        <div class = "prev">
          <div> Previously guessed words 
            <div class="previously-guessed">${game.getPreviouslyGuessedWords(input)} </div>
          </div>
          <div class = "matches">Matches 
            <div >${game.getMatchingLetters(input,secretWord)}</div>
          </div>
        </div>

        <div class = "turns"> Turns Taken : ${game.numberOfAcceptedGuesses()} </div>

        <div class = "win"> ${game.checkWin(input,secretWord)}</div>

        <div class="logout">
        <form action="/logout" method="POST">
        <button type="submit">Logout</button></form>
        </div>

        <link href="/style.css" rel="stylesheet">
        </body>
      </html>
  `;
  },
  getSecretWord : function(words){
    const secretWord = words[Math.floor(Math.random() * words.length)];
    console.log('Secret Word is ' + secretWord);
    return secretWord;
  },
  validityCheck : function(words,input){
    if(words.indexOf(input) > -1 || input==''){
      if(guessedWords.indexOf(input) > -1){
        return `You have already guessed this word`;
      }
      ++acceptedGuesses;
      return `You have entered a valid word`;
    }
    if(input==='' || !input){
      return ``
    }
    return `Please enter a valid word from the dictionary`;
  },
  getPreviouslyGuessedWords : function(input){
    guessedWords.push(input);
    return guessedWords;
  },
  getMatchingLetters : function(input,secretWord){
    if(input){
    let matches = 0;
    let letterCount = {};
    for(let letter of secretWord){
      letterCount[letter] = letterCount + 1 || 1;
    }
    for(let letter of input){
      if(letterCount[letter]){
        letterCount[letter] -= 1;
        matches += 1;
      }
    }
    matchingLetters.push(matches);
  }
  return matchingLetters;
  },
  numberOfAcceptedGuesses : function(){
    return acceptedGuesses;
  },
  checkWin : function(input,secretWord){
    if(input===secretWord){
      return`<div>You win!!!</div> 
      <div class = "win-button">
      <form action="/" method="GET"><button type="submit">Start New Game</button></form>
      </div>`
    }
    if(input==='' || !input){
      return ``
    }
    return `Oops! that was not the correct word`
  }
};

module.exports = game;