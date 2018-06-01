const express = require('express');
const router = express.Router();
const mailer = require('./mailer')

// GET homepage
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/merchant', function(req, res) {
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

router.post('/contact', function(req, res) {
  console.log(req.query);
  let msg = 'Contact Entry' + '\n'
          + 'Business Name: ' + req.body.contact_name + '\n'
          + 'Business Phone: ' + req.body.contact_email + '\n'
          + 'Additional Comments: ' + req.body.contact_message;

  mailer.sendMail(msg);

  res.redirect('/');
});

module.exports = router;
