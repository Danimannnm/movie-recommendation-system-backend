const express = require('express');
const router = express.Router();
const { createPost, getPostsByThread } = require('../controllers/postController');
const auth = require('../middleware/auth');

// @route   POST api/posts
// @desc    Create a new post
// @access  Private
router.post('/', auth, createPost);

// @route   GET api/posts/thread/:threadId
// @desc    Get posts by thread
// @access  Public
router.get('/thread/:threadId', getPostsByThread);

module.exports = router;