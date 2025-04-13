const express = require('express');
const router = express.Router();
const { getSiteStatistics, getTrends, getMostActiveUsers } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET api/admin/statistics
// @desc    Get site statistics
// @access  Private (admin only)
router.get('/statistics', auth, admin, getSiteStatistics);

// @route   GET api/admin/trends
// @desc    Get trending genres and most searched actors
// @access  Private (admin only)
router.get('/trends', auth, admin, getTrends);

// @route   GET api/admin/most-active-users
// @desc    Get most active users
// @access  Private (admin only)
router.get('/most-active-users', auth, admin, getMostActiveUsers);

module.exports = router;