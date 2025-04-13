const express = require('express');
const router = express.Router();
const { searchMovies, getTopMoviesOfTheMonth, getTop10ByGenre } = require('../utils/searchFilter');

// @route   GET api/search
// @desc    Search and filter movies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const movies = await searchMovies(req.query);
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/search/top-month
// @desc    Get top movies of the month
// @access  Public
router.get('/top-month', async (req, res) => {
  try {
    const topMovies = await getTopMoviesOfTheMonth();
    res.json(topMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/search/top-genre/:genre
// @desc    Get top 10 movies by genre
// @access  Public
router.get('/top-genre/:genre', async (req, res) => {
  try {
    const topMovies = await getTop10ByGenre(req.params.genre);
    res.json(topMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;