const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.post('/task', jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const task = new Task({
    title: req.body.title,
    status: req.body.status
  });
  console.log(task);
  task.save()
      .then(task=>{
        console.log(`Save: ${task}`);
        res.sendStatus(200);
      })
      .catch((e) => {
        if(e.errors['title']) {
          console.log(e.errors['title']);
          res.sendStatus(527);
        }
      });
});

router.get('/task/:id', async function (req, res) {
  const task = await Task.find({_id: req.params.id});
  res.send(task)
});

module.exports = router