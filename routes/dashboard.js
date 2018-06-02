const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

router.use(expressLayouts);

router.get('/', function(req, res, next) {
  db.getCoupons(function(coupons) {
    res.render('dashboard', { coupons: coupons });
  })

});

module.exports = router;
