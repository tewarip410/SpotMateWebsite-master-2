const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (password == 'letmein') {
    res.redirect('/dashboard');
  } else {
    res.redirect('/index');
  }
});

module.exports = router;
