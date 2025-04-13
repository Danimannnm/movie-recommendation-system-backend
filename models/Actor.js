const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  biography: {
    type: String,
    maxLength: 2000
  },
  filmography: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  awards: [{
    name: String,
    year: Number,
    category: String,
    won: Boolean
  }],
  photos: [String],
  birthDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Actor', actorSchema);