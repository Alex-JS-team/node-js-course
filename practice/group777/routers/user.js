const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const auth = require('./../midlleware/auth');
const config = require('./../config');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../email');

router.get('/users', async function (req, res) {
  const users = await User.find();
  res.send(users)
});

router.get('/user/:id', async function (req, res) {
  const user = await User.findOne({_id: req.params.id});
  res.send(user)
});

router.post('/registration', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = new User({
    name: req.body.userName,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    confirm: {
      token: jwt.sign({ email: req.body.email }, config.secret)
    }
  });
  console.log('body:', user);
  const token = await user.generateAuthToken();
  console.log(token)
  user.save()
    .then(user=>{
      sendEmail.confirmEmail(user.email, user.confirm.token)
      res.send({token});
      console.log(`Save: ${user}`);
    })
    .catch((e) => {
      console.log(e.errmsg);
      res.status(501).send([{error: e.errmsg}]);
    })
});

router.get('/user/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(!user || !user.avatar) throw new Error('Error avatar');

    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
  }catch (e) {
    console.log(e)
  }
});



module.exports = router;
