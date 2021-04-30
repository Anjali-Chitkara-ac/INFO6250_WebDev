const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

const session = require('./session');
let util = require('./util');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));


app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'session-required' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.status(403).json({ error: 'session-invalid' });
    return;
  }
    res.json(session.details[sid]);
});



app.post('/api/session', (req, res) => {
  const username = req.body.username;
  const { sid, error } = session.create({ username });
  if(error) {
    res.status(400).json({error : "Please enter a valid username"});
    return;
  }
  res.cookie('sid', sid);
  setTimeout(() => {
    res.json(session.details[sid]);
  },3000)

});


app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  session.remove(sid);
  res.clearCookie('sid');
  res.json({ sid, status: 'removed' });
});

app.post('/api/addSalad', express.json(), (req, res) => {
  const sid = req.cookies.sid;
  const user = session.details[sid].username;
  const saladItems = req.body.saladItems;
  const saladID = req.body.saladID;
  if(!saladItems.length) {
    res.status(400).json({error : "Please select at least one item from the menu to save."});
    return;
  }
  saladList = util.addToSaladList(user,saladID,saladItems);
  session.details[sid].info = saladList;
  res.json(saladList);
});


app.delete(`/api/app/:saladID`,(req, res) => {
  const saladID = req.params.saladID;
  const sid = req.cookies.sid;
  const user = session.details[sid].username;
  if(!saladID) {
    res.status(400).json({ error: 'missing-id' });
    return;
  }
  const userList = session.users[user];
  delete userList[saladID];
  res.json(session.users[user]);
  });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
