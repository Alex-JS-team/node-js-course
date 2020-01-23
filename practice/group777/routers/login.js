const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
  res.sendFile('login.html' , { root : __dirname+'/../public'});
});

router.post('/login', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  console.log(req.body)
  const user = await User.find({email: req.body.email});
  if(user.length > 0) {
    const isMatch = await bcrypt.compare(req.body.password, user[0].password);
    isMatch ? res.redirect(301, '/form') : res.status(401).send({ error: 'Please authenticate.' });
  }else {
    res.status(401).send({ error: 'No find user' });
  }
});

module.exports = router;
