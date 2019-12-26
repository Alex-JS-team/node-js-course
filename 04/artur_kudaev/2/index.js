const express = require('express');
const path = require('path');
const config = require('./config.js');
const data = require('./data');

const app = express();

var err = '';

app.use(express.static(path.join(__dirname, '/public')));

function error404(req, res, next) {
  err = `https://${req.hostname+req.url}`;
  console.log(`Error page - ${err} || ${new Date().toLocaleString()}`);
  next();
}

app.get('/api', (req, res) => {
  res.json(data)
});

app.get('/', (req, res) => {
  res.sendFile('index.html' , { root : __dirname+'/public'});
});
app.use(error404);

app.use(function(req, res) {
  res.status(404).send(`<h1>404</h1><h2>${err?err:null}</h2>`);
});

app.listen(config.port, ()=>console.log('Start on port 3000..'));
