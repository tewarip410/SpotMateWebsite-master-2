const merchantRouter = require('./merchant');
const indexRouter = require('./index.js');

module.exports = function(app, passport) {

  indexRouter(app, passport);
  app.use('/merchant', merchantRouter);

}
