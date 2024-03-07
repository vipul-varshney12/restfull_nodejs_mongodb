const mongoose = require('mongoose');

// Create a user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

// Create a user model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
