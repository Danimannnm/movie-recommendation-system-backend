const express = require('express');
const router = express.Router();
const { createList, updateList, followList, getUserLists, getPublicLists } = require('../controllers/listController');
const auth = require('../middleware/auth');

// @route   POST api/lists
// @desc    Create a new list
// @access  Private
router.post('/', auth, createList);

// @route   PUT api/lists/:listId
// @desc    Update a list
// @access  Private
router.put('/:listId', auth, updateList);

// @route   POST api/lists/follow/:listId
// @desc    Follow a list
// @access  Private
router.post('/follow/:listId', auth, followList);

// @route   GET api/lists/user
// @desc    Get lists created by the user
// @access  Private
router.get('/user', auth, getUserLists);

// @route   GET api/lists/public
// @desc    Get public lists
// @access  Public
router.get('/public', getPublicLists);

module.exports = router;