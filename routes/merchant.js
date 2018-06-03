const express = require('express');
const router = express.Router();
const db = require('./database');

// =====================================
// DASHBOARD ===========================
// =====================================
router.get('/dashboard', isLoggedIn, function(req, res, next) {
  db.getCoupons(function(coupons) {
    const colors = ['#007bff', '#dc3545', '#ffc107', '#28a745'];

    const data = {
      labels: coupons.map(coupon => coupon.name),
      datasets: [{
        data: coupons.map(coupon => coupon.redemed),
        backgroundColor: colors.slice(0, coupons.length),
      }],
    }
    console.log(data);

    res.render('./merchant/dashboard', {
      coupons: coupons,
      data: data
    });
  });
});

// =====================================
// COUPON ==============================
// =====================================
router.get('/add-coupon', isLoggedIn, function(req, res, next) {
  res.render('./merchant/add-coupon');
});

router.post('/add-coupon', function(req, res) {

  const coupon = {
    name: req.body.name,
    description: req.body.description,
    redemed: req.body.redemed,
    remaining: req.body.remaining
  }
  console.log(coupon);
  db.addCoupon(coupon);
  res.redirect('/merchant/dashboard');

});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/../login');
}

module.exports = router;