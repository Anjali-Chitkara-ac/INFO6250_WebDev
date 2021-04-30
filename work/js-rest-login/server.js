const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;


app.use(express.static('./public'));
app.use(cookieParser());

const sessionMap = {};
const addToSessionMap = function(username){
  const sid = uuid();
  sessionMap[username] = sid;
  return username;
}


//const sessions = require('./session.js')
let itemMap = require('./ItemMap');

const addToItemMap = function(username, item,r){
  let currItems = getFromItemMap(username);
  if(!currItems){
    itemMap = Object.assign({ [username]: [{name: item, rank:r}]}, itemMap);
    return;
  }
  currItems.push({name: item, rank:r});

}


const getFromItemMap = function(username){
  let currentItems = itemMap[username];

  if(!currentItems)
    return currentItems;

  return currentItems;
}

const isValidSession = function(username) {
  if(!sessionMap[username]) {
      return -1;
  }
  return sessionMap[username];
};

const validateUsername = function(username) {
  const errors = [];
  const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
  if( clean !== username ) {
    errors.push('username contained disallowed characters');
  }
  if(!username) {
    errors.push('username was empty');
  }

  return errors.lengths ? errors : '';
};


app.get('/session', (req, res) => {
  // check cookie from request
  const name = req.cookies.name;
  if(!name) {
    res.status(401).json({ error: 'login-required'});
    return;
  }
  const sessionId = isValidSession(name);
  if(sessionId != -1) {
    res.status(200);
    return;
  }
  else {
    res.status(401).json({ error: 'login-required'});
    return;
  }
});


app.post('/login', express.json(), (req, res) => {
  const { username } = req.body;
  const errors = validateUsername(username);
  if( errors ) {
    res.status(400).json({ errors });
    return;
  }
  const name = addToSessionMap(username);
  res.cookie('name', name);//setting the cookie
  let items = getFromItemMap(name);
  if(!items)
    items = "";

  res.status(200).json(items);
});


app.post('/getItems', express.json(), (req, res) => {
  const username = req.cookies.name;
  const errors = validateUsername(username);
  if( errors ) {
    res.status(400).json({ errors });
    return;
  }

  res.status(200).json(Object.values(getFromItemMap(username)));
});


app.post('/addItem', express.json(), (req, res) => {
  const username = req.cookies.name;
  const item = req.body.item;

  const errors = validateUsername(username);
  if( errors ) {
    res.status(400).json({ errors });
    return;
  }

  addToItemMap(username,item,1); //pass item to be added here
  res.json(Object.values(getFromItemMap(username)));
});

app.post('/addItemWithRank', express.json(), (req, res) => {
  const username = req.cookies.name;
  const item = req.body.item;
  let rank = req.body.rank;

  if(rank > 5)
    rank = 5;
  else if(rank < 1)
    rank = 1;

  
  const errors = validateUsername(username);
  if( errors ) {
    res.status(400).json({ errors });
    return;
  }

  addToItemMap(username,item,rank); //pass item to be added here
  res.status(200).json(Object.values(getFromItemMap(username)));
});


app.delete('/deleteItem/:itemName', (req, res) => {
  const itemName = req.params.itemName;
  if(!itemName) {
    res.status(400).json({ error: 'missing-id' });
    return;
  }
  const username = req.cookies.name;

  const currList = getFromItemMap(username);

  const indx = currList.findIndex(v => v.name === itemName);
  currList.splice(indx, indx >= 0 ? 1 : 0);

  res.json(Object.values(getFromItemMap(username)));

  });

app.post('/logout',express.json(),(req,res) => {
  res.clearCookie('name');
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  const name = req.cookies.name;
  if(!name) {
    res.status(200).json({ message: 'error' });
  }
  else{
    res.status(401).json({ message: 'success' });
  }
});




app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
