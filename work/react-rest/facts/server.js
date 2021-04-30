const express = require('express');
const app = express();
const PORT = 5000;

let facts = require('./facts');
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/facts', (req, res) => {
  setTimeout(() => {
        res.json({ facts });
    }, 3000);
});

app.post('/api/facts', (req, res) => {
  const pgSize = req.body.pgSize;
  const startIdx = req.body.startIdx;
  let sliced = [];
  sliced = facts.facts.slice(startIdx, startIdx + pgSize);
  setTimeout(() => {
        res.json({ sliced });
    }, 3000);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
