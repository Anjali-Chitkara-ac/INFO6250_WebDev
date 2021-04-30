const express = require('express');
const app = express();
const PORT = 3000;

const uuidv4 = require('uuid').v4;
let inventory = require('./inventory');

app.use(express.static('./public'));

//page load
app.get('/inventory/', (req,res) => {
	res.json(Object.values(inventory));
});

//add item to list
app.post('/inventory/:name', express.json(), (req, res) => {
  const rawItemName = req.params.name;
  const itemName = rawItemName.replace(/[^A-Za-z0-9_]/g, '');
  if(!itemName) { //check
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  const duplicatePresent = checkDuplicate(itemName);
  if(duplicatePresent){
    res.status(409).json({ error: 'duplicate' });
    return;
  }
  else{
  const id = uuidv4();
  inventory = Object.assign({ [id]: {itemId: id, name:itemName, quantity:0}}, inventory)
  res.json(Object.values(inventory));
  }
});

function checkDuplicate(itemName){
  const itemList = Object.values(inventory);
  for( let item of itemList ) {
        if(itemName === item.name) {
            return true;
        }
    }
    return false;
}

//increase
app.post('/inventoryInc/:itemId', express.json(), (req, res) => {
  const itemId = req.params.itemId;
  const item = inventory[itemId];
  item.quantity += 1;
  res.json(Object.values(inventory));
});

//decrease
app.post('/inventoryDec/:itemId', express.json(), (req, res) => {
  const itemId = req.params.itemId;
  const item = inventory[itemId];
  if(item.quantity >0 ){
  	item.quantity -= 1;
  }
  res.json(Object.values(inventory));
});

//delete
app.delete('/inventory/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  if(!itemId) {
    res.status(400).json({ error: 'missing-id' });
    return;
  }
  delete inventory[itemId];
  res.json(Object.values(inventory));
  });

app.listen(PORT,() => {
	console.log(`listening on http://localhost:${PORT}`);
});