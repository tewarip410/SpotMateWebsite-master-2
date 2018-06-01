const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

router.use(expressLayouts);

router.get('/', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
