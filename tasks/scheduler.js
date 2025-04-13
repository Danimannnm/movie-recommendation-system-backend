const cron = require('node-cron');
const { sendNotifications } = require('../controllers/upcomingController');

// Schedule the task to run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Running scheduled task: sendNotifications');
  await sendNotifications();
});