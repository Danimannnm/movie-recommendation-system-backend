const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');

async function getRecommendedMovies(userId) {
  const user = await User.findById(userId);
  if (!user) return [];

  // Get user's favorite genres
  const favoriteGenres = user.preferences.favoriteGenres || [];

  // Find movies in favorite genres
  const genreBasedMovies = await Movie.find({ genre: { $in: favoriteGenres } });

  // Find top-rated movies
  const topRatedMovies = await Movie.find().sort({ averageRating: -1 }).limit(10);

  // Combine and deduplicate movie lists
  const recommendedMovies = [...new Set([...genreBasedMovies, ...topRatedMovies])];

  return recommendedMovies;
}

async function getSimilarTitles(movieId) {
  const movie = await Movie.findById(movieId);
  if (!movie) return [];

  // Find similar movies by genre or director
  const similarMovies = await Movie.find({
    $or: [
      { genre: { $in: movie.genre } },
      { director: movie.director }
    ],
    _id: { $ne: movieId }
  }).limit(10);

  return similarMovies;
}

async function getTrendingMovies() {
  // Find movies with the most reviews in the last week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const trendingMovies = await Review.aggregate([
    { $match: { createdAt: { $gte: oneWeekAgo } } },
    { $group: { _id: '$movie', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    { $lookup: { from: 'movies', localField: '_id', foreignField: '_id', as: 'movie' } },
    { $unwind: '$movie' }
  ]);

  return trendingMovies.map(item => item.movie);
}

async function getTopRatedMovies() {
  // Find top-rated movies
  const topRatedMovies = await Movie.find().sort({ averageRating: -1 }).limit(10);
  return topRatedMovies;
}

module.exports = {
  getRecommendedMovies,
  getSimilarTitles,
  getTrendingMovies,
  getTopRatedMovies
};