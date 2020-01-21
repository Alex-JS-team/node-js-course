const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./models/task');
const User = require('./models/user');
const bodyParser = require("body-parser");
const path = require('path');
const hbs = require("hbs");
const userRouter = require('./routes/users')
const taskRouter = require('./routes/tasks')
const bcrypt = require('bcryptjs')

const myFunction = async () => {
  const password = 'Red12345!'
  const hashedPassword = await bcrypt.hash(password, 10)

  console.log(password)
  console.log(hashedPassword)

  const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
  console.log(isMatch)
}

myFunction()



mongoose.connect('mongodb://localhost:27017/task-manager-api', {useNewUrlParser: true});

const jsonParser = bodyParser.json();
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public'), {index: false}));

//Увеличиваю позволенный размер файла
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(userRouter)
app.use(taskRouter)

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

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    const user = await User.findById(req.params.id);
    // user.name = req.body.name;
    // user.save();
    const updatedUser = req.body.name;
    updatedUser.save();
    if (!user) {
      return res.status(404).send()
    }

    res.send(updatedUser)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
