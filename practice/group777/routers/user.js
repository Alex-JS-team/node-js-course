const express = require('express');
const router = express.Router();
const User = require('./../models/user');

router.get('/user', async function (req, res) {
  const users = await User.find();
  res.send(users)
});

router.get('/user/:id', async function (req, res) {
  const user = await User.find({_id: req.params.id});
  res.send(user)
});

router.post('/user', function (req, res) {
  if(!req.body) return res.sendStatus(500);
  const user = new User({
    name: req.body.userName,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password
  });
  console.log('body:', user);
  user.save()
      .then(user=>{
        res.sendStatus(200);
        console.log(`Save: ${user}`);
      })
      .catch((e) => {
        console.log(e.errmsg);
        res.status(501).send([{error: e.errmsg}]);
      })
});

module.exports = router;
