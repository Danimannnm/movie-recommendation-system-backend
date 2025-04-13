const express = require('express');
const router = express.Router();
const { getRecommendedMovies, getSimilarTitles, getTrendingMovies, getTopRatedMovies } = require('../utils/recommendations');
const auth = require('../middleware/auth');

// @route   GET api/recommendations
// @desc    Get personalized movie recommendations
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const recommendedMovies = await getRecommendedMovies(req.user.id);
    res.json(recommendedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/recommendations/similar/:movieId
// @desc    Get similar titles for a movie
// @access  Public
router.get('/similar/:movieId', async (req, res) => {
  try {
    const similarMovies = await getSimilarTitles(req.params.movieId);
    res.json(similarMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/recommendations/trending
// @desc    Get trending movies
// @access  Public
router.get('/trending', async (req, res) => {
  try {
    const trendingMovies = await getTrendingMovies();
    res.json(trendingMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/recommendations/top-rated
// @desc    Get top-rated movies
// @access  Public
router.get('/top-rated', async (req, res) => {
  try {
    const topRatedMovies = await getTopRatedMovies();
    res.json(topRatedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;