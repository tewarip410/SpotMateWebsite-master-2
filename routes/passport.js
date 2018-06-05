const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const Coupon = require('../models/coupon');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}, function(err, user){
      done(err, user);
    });
  });

  passport.use('local-login', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, email, password, done) {
      process.nextTick(function() {
        User.findOne({ email: email, password: password }, function(err, user){
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        })
      });
    }
  ));
}
