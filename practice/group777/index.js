const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/user');
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/task-manager-api', {useNewUrlParser: true});

const jsonParser = bodyParser.json();

//Увеличиваю позволенный размер файла
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// const user = new User({
//   name: 'Artur',
//   age: 30
// });
// const task = new Task({
//   title: 'My first task',
//   status: false
// });
// user.save().then(user=>console.log(`Save: ${user}`));
// task.save().then(task=>console.log(`Save: ${task}`));

app.get('/api', function (req, response) {
  let users;
  let tasks;
  User.find()
    .then(res=>{
      users = res;
      return Task.find()
    })
    .then(res=>{
      tasks = res;
      const json = [
        {
          users: users,
          tasks: tasks,
        }
      ];
      response.send(json)
    })
});

app.post('/user', jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = new User({
    name: req.body.userName,
    age: req.body.age
  });
  user.save().then(user=>console.log(`Save: ${user}`));
  res.sendStatus(200);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});