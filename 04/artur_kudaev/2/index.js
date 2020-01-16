const express = require('express');
const path = require('path');
const config = require('./config.js');
const data = require('./data');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hbs = require("hbs");

const app = express();



const jsonParser = bodyParser.json();

//Увеличиваю позволенный размер файла
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true });

const userScheme = new Schema({
  name: String,
  age: Number
});
const User = mongoose.model("User", userScheme);

var err = '';

app.use(express.static(path.join(__dirname, '/public'), {index: false}));

function error404(req, res, next) {
  err = `https://${req.hostname+req.url}`;
  console.log(`Error page - ${err} || ${new Date().toLocaleString()}`);
  next();
}

app.get('/api', (req, res) => {
  res.json(data)
});

app.get('/', (req, res) => {
  User.find({}, function (error, response) {
    if(error) throw error;
    res.render('index.hbs', {
      arr: response
    })
  })
});

app.get('/form', (req, res) => {
  res.sendFile('form.html' , { root : __dirname+'/public'});
});

app.post('/save', jsonParser, function(req, res){
  if(!req.body) return res.sendStatus(400);
  const user = new User({
    name: req.body.userName,
    age: req.body.age
  });
  user.save().then(user=>console.log(`Save: ${user}`))
  res.sendStatus(200)
});

app.post('/del', jsonParser, function(req, res){
  if(!req.body) return res.sendStatus(400);
  const id = req.body.id;
  User.deleteOne({_id: id}).then(del => console.log(del) )
  console.log(id)
  res.sendStatus(200)
});

app.use(error404);

app.use(function(req, res) {
  res.status(404).send(`<h1>404</h1><h2>${err?err:null}</h2>`);
});

app.listen(config.port, ()=>console.log('Start on port 3000..'));

