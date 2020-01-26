const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Task = require('./../models/task');
const auth = require('./../midlleware/auth');

router.get('/', async function (req, res) {
  const users = await User.find();
  const tasks = await Task.find();
  //console.log(req.user.email, '***')
  // res.render('index.hbs', {
  //   tasks: tasks,
  //   users: users
  // });
  res.sendFile('index.html' , { root : __dirname+'/../public'});
});

module.exports = router;
