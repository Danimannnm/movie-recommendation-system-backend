const express = require('express');
const router = express.Router();
const { createThread, getThreadsByForum } = require('../controllers/threadController');
const auth = require('../middleware/auth');

// @route   POST api/threads
// @desc    Create a new thread
// @access  Private
router.post('/', auth, createThread);

// @route   GET api/threads/forum/:forumId
// @desc    Get threads by forum
// @access  Public
router.get('/forum/:forumId', getThreadsByForum);

module.exports = router;