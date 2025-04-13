const express = require('express');
const router = express.Router();
const { addArticle, getAllArticles, getArticlesByTag } = require('../controllers/newsController');
const auth = require('../middleware/auth');

// @route   POST api/news
// @desc    Add a new article
// @access  Private (admin only)
router.post('/', auth, addArticle);

// @route   GET api/news
// @desc    Get all articles
// @access  Public
router.get('/', getAllArticles);

// @route   GET api/news/tag/:tag
// @desc    Get articles by tag
// @access  Public
router.get('/tag/:tag', getArticlesByTag);

module.exports = router;