const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: String,
  name: String,
  description: String,
  redemed: Number,
  remaining: Number
});

module.exports = mongoose.model('Coupons', couponSchema);
