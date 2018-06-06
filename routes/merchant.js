const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Coupon = require('../models/coupon');

// =====================================
// DASHBOARD ===========================
// =====================================
router.get('/dashboard', isLoggedIn, function(req, res, next) {
  Coupon.find({user_id: req.user._id}).exec(function(err, coupons) {
    const colors = ['#007bff', '#dc3545', '#ffc107', '#28a745'];

    const data = {
      labels: coupons.map(coupon => coupon.name),
      datasets: [{
        data: coupons.map(coupon => coupon.redemed),
        backgroundColor: colors.slice(0, coupons.length),
      }],
    }

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
  Coupon.find({ user_id: req.user._id }, function(err, coupons) {
    if (coupons.length >= 3) {
      res.redirect('/merchant/dashboard');
    } else {
      const coupon = new Coupon( {
        _id: new mongoose.Types.ObjectId(),
        user_id: req.user._id,
        name: req.body.name,
        description: req.body.description,
        redemed: req.body.total - req.body.remaining,
        remaining: req.body.remaining
      })

      coupon
        .save()
        .then(function(result) {
          console.log(result);
        })
        .catch(function(err) {
          console.log(err)
        })
        res.redirect('/merchant/dashboard');
    }
  });

});

router.get('/edit-coupon/:id', function(req, res, next) {
  const id = req.params.id;
  Coupon.findOne({ _id: id, user_id: req.user._id}, function(err, coupon) {
    res.render('./merchant/edit-coupon', {
      coupon: coupon
    });
  });
});

router.post('/edit-coupon/:id', function(req, res, next) {
  const id = req.params.id;
  Coupon.findOne({ _id: id, user_id: req.user._id}, function(err, coupon) {
    coupon.name = req.body.name;
    coupon.description = req.body.description;
    coupon.redemed = req.body.total - req.body.remaining;
    coupon.remaining = req.body.remaining;
    coupon.save();
  })
  res.redirect('/merchant/manage-coupons');
})

router.post('/delete-coupon/:id', function(req, res) {
  const id = req.params.id;
  Coupon.deleteOne({ _id: id }, function (err) {
    if (err) throw  err;
  })

  res.redirect('/merchant/manage-coupons');
});

router.get('/manage-coupons', isLoggedIn, function(req, res, next) {
  Coupon.find({user_id: req.user._id}).exec(function(err, coupons) {
    const colors = ['#007bff', '#dc3545', '#ffc107', '#28a745', '#007bff', '#dc3545', '#ffc107', '#28a745'];

    const data = {
      labels: coupons.map(coupon => coupon.name),
      datasets: [{
        data: coupons.map(coupon => coupon.redemed),
        backgroundColor: colors.slice(0, coupons.length),
      }],
    }

    res.render('./merchant/manage-coupons', {
      coupons: coupons,
      data: data
    });
  });
})

router.get('/support', isLoggedIn, function(req, res, next) {
  res.render('./merchant/support');
});



function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/../login');
}

module.exports = router;
