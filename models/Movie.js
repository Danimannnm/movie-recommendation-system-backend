const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: [String],
    required: true
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true
  },
  cast: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actor'
  }],
  crew: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CrewMember'
  }],
  releaseDate: {
    type: Date,
    required: true
  },
  runtime: {
    type: Number,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  coverPhoto: {
    type: String,
    required: true
  },
  trivia: [String],
  goofs: [String],
  soundtrack: [String],
  ageRating: {
    type: String,
    required: true
  },
  parentalGuidance: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  trailerUrl: {
    type: String
  },
  isUpcoming: {
    type: Boolean,
    default: function() {
      return this.releaseDate > new Date();
    }
  },
  boxOffice: {
    openingWeekend: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    },
    internationalRevenue: {
      type: Number,
      default: 0
    }
  },
  awards: [{
    name: String,
    year: Number,
    category: String,
    won: Boolean
  }]
});

module.exports = mongoose.model('Movie', movieSchema);