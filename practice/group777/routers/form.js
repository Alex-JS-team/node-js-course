const express = require('express');
const router = express.Router();

router.get('/form', (req, res) => {
  res.sendFile('form.html' , { root : __dirname+'/../public'});
});

module.exports = router;
