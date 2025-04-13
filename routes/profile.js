const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('preferences.watchlist', 'title poster'); // Assuming Movie model has these fields
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put('/', [auth, [
  check('username', 'Username is required').optional().notEmpty(),
  check('bio', 'Bio cannot exceed 500 characters').optional().isLength({ max: 500 }),
  check('favoriteGenres', 'Favorite genres must be an array').optional().isArray(),
  check('favoriteActors', 'Favorite actors must be an array').optional().isArray(),
  check('favoriteDirectors', 'Favorite directors must be an array').optional().isArray(),
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      username,
      bio,
      location,
      dateOfBirth,
      favoriteGenres,
      favoriteActors,
      favoriteDirectors
    } = req.body;

    const user = await User.findById(req.user.id);

    // Update profile fields
    if (username) user.username = username;
    if (bio) user.profile.bio = bio;
    if (location) user.profile.location = location;
    if (dateOfBirth) user.profile.dateOfBirth = dateOfBirth;

    // Update preferences
    if (favoriteGenres) user.preferences.favoriteGenres = favoriteGenres;
    if (favoriteActors) user.preferences.favoriteActors = favoriteActors;
    if (favoriteDirectors) user.preferences.favoriteDirectors = favoriteDirectors;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/profile/watchlist/:movieId
// @desc    Add movie to watchlist
// @access  Private
router.post('/watchlist/:movieId', auth, async (req, res) => {
    try {
      const movieId = req.params.movieId;
  
      // Validate movieId
      if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ msg: 'Invalid movie ID' });
      }
  
      const user = await User.findById(req.user.id);
  
      // Check if movie already exists in watchlist
      if (user.preferences.watchlist.includes(movieId)) {
        return res.status(400).json({ msg: 'Movie already in watchlist' });
      }
  
      user.preferences.watchlist.push(movieId);
      await user.save();
  
      res.json(user.preferences.watchlist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  // @route   DELETE api/profile/watchlist/:movieId
  // @desc    Remove movie from watchlist
  // @access  Private
  router.delete('/watchlist/:movieId', auth, async (req, res) => {
    try {
      const movieId = req.params.movieId;
  
      // Validate movieId
      if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ msg: 'Invalid movie ID' });
      }
  
      const user = await User.findById(req.user.id);
  
      user.preferences.watchlist = user.preferences.watchlist.filter(
        movie => movie.toString() !== movieId
      );
  
      await user.save();
      res.json(user.preferences.watchlist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;