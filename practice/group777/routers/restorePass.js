const express = require('express');
const router = express.Router();
const User = require('./../models/user');

router.post('/restore', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const {email} = req.body;
  if(email) {
    console.log(email)
    const user = await User.findOne({email});
    const token = await user.restoreToken();
    console.log(token)
  }
  res.sendStatus(500)
});

module.exports = router;

