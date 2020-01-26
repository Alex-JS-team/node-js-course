const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Task = require('./../models/task');
const auth = require('./../midlleware/auth');

router.get('/api', async function (req, res) {
  const users = await User.find();
  const tasks = await Task.find();
  const json = [{
    users: users,
    tasks: tasks,
  }
  ];
  res.send(json)
});

module.exports = router;
