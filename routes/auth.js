const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('./database');
const localStrategy = require('passport-local').Stragety;

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

passport.use('local-signup', new localStrategy({
  function(email, password, done) {
    const merchant = { email: email, password: password };

    db.findMerchantByLogin(merchant, function(results) {
      if (results) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect Login' });
      }
    })
  }
}))
