const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    // Optional for social logins in the future
    required: function() {
      return this.authProvider === 'local';
    }
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
