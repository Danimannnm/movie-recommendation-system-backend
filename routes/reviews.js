const express = require('express');
const router = express.Router();
const { addReview, updateReview, getReviewsForMovie,  getReviewHighlights, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/reviews
// @desc    Add a new review
// @access  Private
router.post('/', auth, addReview);

// @route   PUT api/reviews/:movieId
// @desc    Update a review
// @access  Private
router.put('/:movieId', auth, updateReview);

// @route   GET api/reviews/:movieId
// @desc    Get reviews for a movie
// @access  Public
router.get('/:movieId', getReviewsForMovie);


// @route   GET api/reviews/highlights/:movieId
// @desc    Get review highlights for a movie
// @access  Public
router.get('/highlights/:movieId', getReviewHighlights);


// @route   DELETE api/reviews/:reviewId
// @desc    Delete a review
// @access  Private (admin only)
router.delete('/:reviewId', auth, admin, deleteReview);

module.exports = router;