const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;

app.use(cookieParser());
app.use(express.static('./public'));

const session = {}; //sid, secret, username

let secretWord;
app.get('/',(req,res) => {
	const sid = req.cookies.sid;
	if(!sid || sid != session.sid){
		res.send(`<body>
		<p>You are not logged in yet</p>
		<form action="/login" method="POST" >
  		<label>
  			Username <input name="username" placeholder="Enter here"/>
  		</label>
  		<label>
  			<button type="submit">LogIn</button>
  		</label>
		</form>
		<link href="/style.css" rel="stylesheet">
		</body>`);
	} else {
		secretWord = generateSecretWord();
		session.secret = secretWord;

		//console.log('session parameters ' + JSON.stringify(session));
		res.send(`You are logged in as ${session.username}` + 
			guessGame.gamePage(wordList,input,secretWord, true));
	}
});

app.get('/submit',(req,res) => {
	
	res.send(`You are logged in as ${session.username}` + 
	guessGame.gamePage(wordList,input,secretWord, false));
	
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
	const username = req.body.username;
    sid = uuidv4();

    session.sid = sid;
    session.username = username;

    res.cookie('sid', sid);

	res.redirect('/');
});

app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  delete session[sid];
  res.clearCookie('sid');
  res.redirect('/');
});

const wordList = require('./words');
const guessGame = require('./game');

function generateSecretWord() {
	return guessGame.getSecretWord(wordList).toUpperCase();
}

let input;

app.post('/check', express.urlencoded({ extended: false }), (req, res) => {
  input = req.body.input.toUpperCase(); 
  res.redirect('/submit');
});

app.listen(PORT,() => {
	console.log(`listening on http://localhost:${PORT}`);
});