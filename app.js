const express = require('express');
const cookieSession = require('cookie-session');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const keys = require('./routes/keys');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://spotmate-worker:qwerty123@cluster0-dy9kc.mongodb.net/test?retryWrites=true');

// passport configuration
require('./routes/passport')(passport);

// view engine setup to be able to render the HTML files
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

// sets the default direcotry to the public folder which webstie users will have access to
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cookieSession({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000,
}));
app.use(passport.initialize());
app.use(passport.session( { secret: keys.cookieKey }));

// use Routes
require('./routes/routes')(app, passport);

// starts listining on port 8080
// found at localhost:8080
app.listen(8080, () => {
  console.log('Server listining on Port 8080')
});
