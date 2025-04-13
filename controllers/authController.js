const logUserActivity = require('../utils/activityLogger');

exports.loginUser = async (req, res) => {
  // ... existing login logic ...

  // Log the login activity
  await logUserActivity(user._id, 'User logged in');

  // ... continue with response ...
};