const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
    minlength: 6
  },
  profile: {
    bio: { 
      type: String,
      maxLength: 500 
    },
    location: { 
      type: String 
    },
    avatar: { 
      type: String,
      default: 'default-avatar.png'
    },
    dateOfBirth: { 
      type: Date 
    }
  },
  preferences: {
    favoriteGenres: [String],
    favoriteActors: [String],
    favoriteDirectors: [String],
    watchlist: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Movie' 
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  activityLog: {
    type: [String], // or a more complex type if needed
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);