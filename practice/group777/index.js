const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/user');
const bodyParser = require("body-parser");
const path = require('path');
const hbs = require("hbs");

mongoose.connect('mongodb://localhost:27017/task-manager-api', {useNewUrlParser: true});

const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/public'), {index: false}));

//Увеличиваю позволенный размер файла
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', async function (req, res) {
  const users = await User.find();
  const tasks = await Task.find();
  res.render('index.hbs', {
    tasks: tasks,
    users: users
  });
});

app.get('/form', (req, res) => {
  res.sendFile('form.html' , { root : __dirname+'/public'});
});

app.get('/api', async function (req, res) {
  const users = await User.find();
  const tasks = await Task.find();
  const json = [{
      users: users,
      tasks: tasks,
    }
  ];
  res.send(json)
});

app.get('/user', async function (req, res) {
  const users = await User.find();
  res.send(users)
});

app.get('/user/:id', async function (req, res) {
  const user = await User.find({_id: req.params.id});
  res.send(user)
});

app.post('/user', jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = new User({
    name: req.body.userName,
    age: req.body.age
  });
  console.log(user)
  user.save()
      .then(user=>{
        res.sendStatus(200);
        console.log(`Save: ${user}`)
      })
      .catch((e) => {
        if(e.errors['age']) {
          console.log(e.errors['age']);
          res.sendStatus(525)
        }else if(e.errors['name']) {
          console.log(e.errors['name']);
          res.sendStatus(526)
        }
      })
});

app.post('/task', jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const task = new Task({
    title: req.body.title,
    status: req.body.status
  });
  console.log(task);
  task.save()
      .then(task=>{
        console.log(`Save: ${task}`);
        res.sendStatus(200)
      })
      .catch((e) => {
        if(e.errors['title']) {
          console.log(e.errors['title']);
          res.sendStatus(527)
        }
      });
  ;
});

app.get('/task/:id', async function (req, res) {
  const task = await Task.find({_id: req.params.id});
  res.send(task)
});

app.delete('/del/:id', function (req, res) {
  console.log(req.params.id);
  User.deleteOne({_id: req.params.id})
    .then(del => {
      console.log(del);
    })
    .catch(() => {
      res.sendStatus(500)
    });
  Task.deleteOne({_id: req.params.id})
    .then(del => {
      console.log(del);
    })
    .catch(() => {
      res.sendStatus(500)
    });
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
