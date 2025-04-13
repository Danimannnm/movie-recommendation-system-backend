const express = require('express');
const router = express.Router();
const { addMovie, updateMovie, deleteMovie, getBoxOfficeInfo, getMovieAwards } = require('../controllers/movieController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/movies
// @desc    Add a new movie
// @access  Private/Admin
router.post('/', auth, admin, addMovie);

// @route   PUT api/movies/:id
// @desc    Update a movie
// @access  Private/Admin
router.put('/:id', auth, admin, updateMovie);

// @route   DELETE api/movies/:id
// @desc    Delete a movie
// @access  Private/Admin
router.delete('/:id', auth, admin, deleteMovie);

// @route   GET api/movies/:movieId/box-office
// @desc    Get box office information for a movie
// @access  Public
router.get('/:movieId/box-office', getBoxOfficeInfo);

// @route   GET api/movies/:movieId/awards
// @desc    Get awards for a movie
// @access  Public
router.get('/:movieId/awards', getMovieAwards);

module.exports = router;