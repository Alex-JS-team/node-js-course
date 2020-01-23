const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Task = require('./../models/task');

router.get('/', async function (req, res) {
  const users = await User.find();
  const tasks = await Task.find();
  res.render('index.hbs', {
    tasks: tasks,
    users: users
  });
});

module.exports = router;
