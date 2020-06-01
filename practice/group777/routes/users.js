const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/user', async function (req, res) {
  const users = await User.find();
  res.send(users)
});

router.get('/user/:id', async function (req, res) {
  const user = await User.find({_id: req.params.id});
  res.send(user)
});

router.post('/user', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = new User({
    name: req.body.userName,
    age: req.body.age
  });
  console.log(req.body)
  try{
    await user.save()
    res.status(201).send(user)
  }catch (e) {
    res.status(500).send(e.message)
    //console.log(e.errors)
  }

  // user.save()
  //     .then(user=>{
  //       res.sendStatus(200);
  //       console.log(`Save: ${user}`)
  //     })
  //     .catch((e) => {
  //       if(e.errors['age']) {
  //         console.log(e.errors['age']);
  //         res.sendStatus(525)
  //       }else if(e.errors['name']) {
  //         console.log(e.errors['name']);
  //         res.sendStatus(526)
  //       }
  //     })
});

module.exports = router