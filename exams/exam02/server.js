const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;

app.use(express.static('./public'));
app.use(cookieParser());

let recipeList = require('./recipes');
let sessionMap = require('./sessionMap');
let util = require('./util');


app.get('/kitchen', (req, res) => {
    res.status(200).json(Object.values(recipeList));
});



app.get('/login', (req, res) => {
  // check cookie from request
  const name = req.cookies.name;
  if(!name) { //login required
     res.status(401).json({ error: 'login-required'});
    return;
  }
  const sessionId = util.isValidSession(name);
  if(sessionId != -1) { // logged-in, can add recipes
    res.status(200).json("response is ok");
    return;
  }
  else { //session not present
    res.status(401).json({ error: 'login-required'});
    return;
  }
});



app.post('/login', express.json(), (req, res) => {
  const { username } = req.body;
  const errors = util.validateUsername(username);
  if( errors || username=='dog') {
    res.status(400).json({ errors });
    return;
  }
  const name = util.addToSessionMap(username);
  res.cookie('name', name);//setting the cookie
  res.status(200).json(Object.values(recipeList));
});



app.post('/addRecipe', express.json(), (req, res) => {
  const author = req.cookies.name;
  const title = req.body.title;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  if(!title || !directions || !ingredients) {
    res.status(400).json("Please fill all the fields");
    return;
  }
  recipeList = util.addToRecipes(author,title,ingredients,directions); //pass recipe to be added here
  res.json(Object.values(recipeList));
});

app.get('/details/:itemID', (req, res) => {
  const itemID = req.params.itemID;
  });

app.post('/logout',express.json(),(req,res) => {
  res.clearCookie('name');
  res.redirect('/logout');
});

app.get('/logout', (req, res) => {
  const name = req.cookies.name;
  if(!name) {
    res.status(200).json({ message: 'error' });
  }
  else{
    res.status(401).json({ message: 'success' });
  }
});

app.get('/detail/:id' , (req,res) => {
  const id = req.params.id;
  if(!id) {
    res.status(400).json({ error: 'missing-id' });
    return;
  }
  res.json(recipeList[id]);
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
