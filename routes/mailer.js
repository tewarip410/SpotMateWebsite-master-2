'use strict';
const nodemailer = require('nodemailer');
const keys = require('./keys');

module.exports = {
  sendMail: function(message) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 5,
        secure: false, // true for 465, false for other ports
        auth: {
            user: keys.email.address, // generated ethereal user
            pass: keys.email.password // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"SpotMate" <' + keys.email.address + '>', // sender address
        to: keys.email.address, // list of receivers
        subject: 'SpotMate Form', // Subject line
        text: message, // plain text body
        //html: '<b>' + message + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    }
}
