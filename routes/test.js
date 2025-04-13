const express = require('express');
const router = express.Router();
const { sendNotifications } = require('../controllers/upcomingController');

// @route   GET api/test/send-notifications
// @desc    Manually trigger sending notifications
// @access  Private (for testing purposes)
router.get('/send-notifications', async (req, res) => {
  try {
    await sendNotifications();
    res.send('Notifications sent');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;