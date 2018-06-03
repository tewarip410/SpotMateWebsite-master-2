const mailer = require('./mailer');
const db = require('./database');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE ===========================
  // =====================================
  app.get('/', function(req, res, next) {
    res.render('index');
  });

  // =====================================
  // MERCHANT FORM =======================
  // =====================================
  app.post('/merchant', function(req, res) {
    let msg = 'Merchant submit for entry' + '\n'
            + 'Business Name: ' + req.body.business_name + '\n'
            + 'Business Phone: ' + req.body.business_phone + '\n'
            + 'Business Address: ' + req.body.business_address + '\n'
            + 'Business City: ' + req.body.business_city + '\n'
            + 'Business State: ' + req.body.business_state + '\n'
            + 'Business Website: ' + req.body.business_website + '\n'
            + 'Business Category: ' + req.body.business_category + '\n'
            + 'Business Platform: ' + req.body.business_platform + '\n'
            + 'Full name: ' + req.body.full_name + '\n'
            + 'Title: ' + req.body.title + '\n'
            + 'Email Address: ' + req.body.email_address + '\n'
            + 'Phone Number: ' + req.body.phone_number + '\n'
            + 'Additional Comments: ' + req.body.additional_comments;

    mailer.sendMail(msg);

    res.redirect('/');
  });

  // =====================================
  // CONTACT FORM ========================
  // =====================================
  app.post('/contact', function(req, res) {
    console.log(req.query);
    let msg = 'Contact Entry' + '\n'
            + 'Business Name: ' + req.body.contact_name + '\n'
            + 'Business Phone: ' + req.body.contact_email + '\n'
            + 'Additional Comments: ' + req.body.contact_message;

    mailer.sendMail(msg);

    res.redirect('/');
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  app.get('/login', function(req, res, next) {
    res.render('login');
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/merchant/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  })

  // =====================================
  // SETUP ===============================
  // =====================================
  app.get('/setup/:id', function(req, res, next) {
    //let id = req.params.id;
    if (true) {
      res.render('setup');
    };
  });

  app.post('/setup/:id', function(req, res) {
    merchant = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    db.addMerchant(merchant);

    res.redirect('/login');
  });

}
