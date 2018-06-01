const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

router.use(expressLayouts);

router.get('/add-coupon', function(req, res, next) {
  res.render('add-coupon');
});

module.exports = router;
