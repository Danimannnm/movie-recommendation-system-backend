const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  tags: [String], // e.g., ['movies', 'actors', 'industry']
  publishedDate: {
    type: Date,
    default: Date.now
  },
  sourceUrl: {
    type: String
  }
});

module.exports = mongoose.model('News', newsSchema);