const express = require('express');
const router = express.Router();
const { getUpcomingMovies, setReminder } = require('../controllers/upcomingController');
const auth = require('../middleware/auth');

// @route   GET api/upcoming
// @desc    Get upcoming movies
// @access  Public
router.get('/', getUpcomingMovies);

// @route   POST api/upcoming/reminder
// @desc    Set a reminder for a movie
// @access  Private
router.post('/reminder', auth, setReminder);

module.exports = router;