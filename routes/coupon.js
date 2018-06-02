const express = require('express');
const router = express.Router();
const db = require('./database');
const expressLayouts = require('express-ejs-layouts');

router.use(expressLayouts);

router.get('/add-coupon', function(req, res, next) {
  res.render('add-coupon');
});

router.post('/add-coupon', function(req, res) {
  const coupon = {
    name: req.body.name,
    description: req.body.description,
    redemed: 0,
    remaining: req.body.total
  }

  db.addCoupon(coupon);
  res.redirect('/dashboard');
})

module.exports = router;
