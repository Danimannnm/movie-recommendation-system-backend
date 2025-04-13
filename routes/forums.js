const express = require('express');
const router = express.Router();
const { createForum, getAllForums } = require('../controllers/forumController');
const auth = require('../middleware/auth');

// @route   POST api/forums
// @desc    Create a new forum
// @access  Private (admin only)
router.post('/', auth, createForum);

// @route   GET api/forums
// @desc    Get all forums
// @access  Public
router.get('/', getAllForums);

module.exports = router;