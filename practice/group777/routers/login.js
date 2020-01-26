const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
  res.sendFile('login.html' , { root : __dirname+'/../public'});
});

router.post('/login', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = await User.findOne({email: req.body.email});
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  const token = await user.generateAuthToken();
  const data = {
    token,
    redirect: true,
    redirectUrl: '/form'
  };
  isMatch ? res.send(data) : res.status(401).send({ error: 'Please authenticate.' });
  //res.status(401).send({ error: 'No find user' });
});

module.exports = router;
