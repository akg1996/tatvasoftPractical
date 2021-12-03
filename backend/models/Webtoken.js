const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: String,
  date: {type: String, default: Date.now()},
  status: Number
}, {collection: "authTokens"})

module.exports = mongoose.model('authTokens', tokenSchema)