const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Task = require('./../models/task');

router.delete('/del/:id', function (req, res) {
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

module.exports = router;
