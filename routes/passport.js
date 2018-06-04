const db = require('./database');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Merchant = require('../models/merchant');
const Coupon = require('../models/coupon');

module.exports = function(passport) {
  passport.serializeUser(function(merchant, done) {
    done(null, merchant._id);
  });

  passport.deserializeUser(function(id, done) {
    Merchant.findOne({_id: id}, function(err, merchant){
      if (err) throw err;
      done(null, merchant);
    });
  });

  passport.use('local-login', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, email, password, done) {
      process.nextTick(function() {
        Merchant.findOne({ email: email, password: password }, function(err, merchant){
          if (err) {
            return done(err);
          }
          if (!merchant) {
            return done(null, false);
          }
          return done(null, merchant);
        })
      });
    }
  ));
}
