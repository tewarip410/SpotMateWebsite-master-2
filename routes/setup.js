const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  //let id = req.params.id;
  if (true) {
    res.render('setup');
  };
});

router.post('/', function(req, res) {
  let password = req.body.password;


  res.redirect('/dashboard');
});

module.exports = router;
