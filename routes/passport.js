const db = require('./database');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log(user.merchant_id);
    done(null, user.merchant_id);
  });

  passport.deserializeUser(function(id, done) {
    db.findMerchantByID(id, function(user) {
      if (user) {
        done(null, user);
      } else {
        console.log('ERROR 404: user not found');
      }
    })
  });

  passport.use('local-login', new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, email, password, done) {
      process.nextTick(function() {
        const login = { email: email, password: password };

        db.findMerchantByLogin(login, function(results) {
          if (results) {
            return done(null, results);
          } else {
            return done(null, false);
          }
        });
      });
    }
  ));
}
