const User = require('../models/User');

async function logUserActivity(userId, activity) {
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { activityLog: activity }
    });
  } catch (err) {
    console.error(`Error logging activity for user ${userId}:`, err);
  }
}

module.exports = logUserActivity;