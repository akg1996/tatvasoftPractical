const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  dob: String,
  role: String,
  city: String,
  state: String,
  password: String
})

module.exports = mongoose.model('users', userSchema)