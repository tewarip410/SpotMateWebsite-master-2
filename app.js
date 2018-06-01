const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const setupRouter = require('./routes/setup');
const dashboardRouter = require('./routes/dashboard');
const couponRouter = require('./routes/coupon');

// view engine setup to be able to render the HTML files
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

// sets the default direcotry to the public folder which webstie users will have access to
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(expressLayouts);

// use Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/setup', setupRouter);
app.use('/dashboard', dashboardRouter);
app.use('/coupon', couponRouter);

// starts listining on port 8080
// found at localhost:8080
app.listen(8080, () => {
  console.log('Server listining on Port 8080')
});
