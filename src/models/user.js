const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name       : String,
  avatar     : String,
  email      : String,
  facebook_id: String,
});

module.exports = mongoose.model('User', userSchema);
