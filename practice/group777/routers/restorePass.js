const express = require('express');
const router = express.Router();
const User = require('./../models/user');

const sendMail = require('./../email');

router.post('/restore', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const {email} = req.body;
  if(email) {
    const user = await User.findOne({email});
    const token = await user.restoreToken();
    sendMail(user.email, token);
    res.sendStatus(200)
  }else {
    res.sendStatus(500)
  }
});

module.exports = router;

