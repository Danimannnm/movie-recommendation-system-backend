const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
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
  awards: [String],
  photos: [String],
  birthDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Director', directorSchema);