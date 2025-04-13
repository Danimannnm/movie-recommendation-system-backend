const Movie = require('../models/Movie');
const Reminder = require('../models/Reminder');
const Notification = require('../models/Notification');
const { sendEmail } = require('../utils/emailService');

// Get upcoming movies
exports.getUpcomingMovies = async (req, res) => {
  try {
    const upcomingMovies = await Movie.find({ isUpcoming: true }).sort({ releaseDate: 1 });
    res.json(upcomingMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Set a reminder for a movie
exports.setReminder = async (req, res) => {
  try {
    const { movieId, reminderDate } = req.body;

    const reminder = new Reminder({
      user: req.user.id,
      movie: movieId,
      reminderDate
    });

    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Send notifications for upcoming releases
exports.sendNotifications = async () => {
  try {
    const reminders = await Reminder.find({ notified: false, reminderDate: { $lte: new Date() } }).populate('user movie');

    for (const reminder of reminders) {
      const notification = new Notification({
        user: reminder.user._id,
        message: `Reminder: The movie "${reminder.movie.title}" is releasing soon!`
      });

      await notification.save();

      // Send an email notification
      await sendEmail(reminder.user.email, 'Movie Release Reminder', notification.message);

      reminder.notified = true;
      await reminder.save();
    }
  } catch (err) {
    console.error(err.message);
  }
};