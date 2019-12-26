const express = require('express');
const path = require('path');
const config = require('./config.js');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('/api', (req, res) => {
  res.send({
    data: 1,
    text: 0
  })
})

app.get('/', (req, res) => {
  res.sendFile('index.html' , { root : __dirname+'/public'});

});

app.listen(config.port, ()=>console.log('Start on port 3000..'));
