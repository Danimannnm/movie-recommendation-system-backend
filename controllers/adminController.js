const Movie = require('../models/Movie');
const Review = require('../models/Review');
const User = require('../models/User');

// Get most active users
exports.getMostActiveUsers = async (req, res) => {
    try {
      const userActivity = await User.aggregate([
        {
          $project: {
            username: 1,
            activityCount: { $size: { $ifNull: ["$activityLog", []] } } // Use $ifNull to default to an empty array
          }
        },
        { $sort: { activityCount: -1 } },
        { $limit: 5 }
      ]);
  
      res.json(userActivity);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

// Get site statistics
exports.getSiteStatistics = async (req, res) => {
  try {
    const mostPopularMovies = await Movie.find().sort({ averageRating: -1 }).limit(5);
    const userActivity = await User.aggregate([
      { $project: { username: 1, activityCount: { $size: { $ifNull: ["$activityLog", []] } } } },
      { $sort: { activityCount: -1 } },
      { $limit: 5 }
    ]);

    res.json({ mostPopularMovies, userActivity });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get trending genres and most searched actors
exports.getTrends = async (req, res) => {
  try {
    // Example logic for trending genres and actors
    const trendingGenres = await Movie.aggregate([
      { $unwind: "$genre" },
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const mostSearchedActors = await User.aggregate([
      { $unwind: "$searchHistory" },
      { $group: { _id: "$searchHistory.actor", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({ trendingGenres, mostSearchedActors });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};