const Movie = require('../models/Movie');

async function searchMovies(query) {
  const { title, genre, director, actor, rating, popularity, releaseYear, releaseDecade, country, language, keywords } = query;

  const filter = {};

  if (title) {
    filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
  }

  if (genre) {
    filter.genre = { $in: genre.split(',') };
  }

  if (director) {
    filter.director = director;
  }

  if (actor) {
    filter.cast = actor;
  }

  if (rating) {
    filter.averageRating = { $gte: parseFloat(rating) };
  }

  if (popularity) {
    // Assuming popularity is a field in the Movie model
    filter.popularity = { $gte: parseInt(popularity) };
  }

  if (releaseYear) {
    filter.releaseDate = { $gte: new Date(`${releaseYear}-01-01`), $lte: new Date(`${releaseYear}-12-31`) };
  }

  if (releaseDecade) {
    const startYear = Math.floor(releaseDecade / 10) * 10;
    filter.releaseDate = { $gte: new Date(`${startYear}-01-01`), $lte: new Date(`${startYear + 9}-12-31`) };
  }

  if (country) {
    filter.country = country;
  }

  if (language) {
    filter.language = language;
  }

  if (keywords) {
    filter.synopsis = { $regex: keywords, $options: 'i' };
  }

  const movies = await Movie.find(filter).sort({ averageRating: -1, releaseDate: -1 });

  return movies;
}

async function getTopMoviesOfTheMonth() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);

  const topMovies = await Movie.find({
    releaseDate: { $gte: startOfMonth, $lt: endOfMonth }
  }).sort({ averageRating: -1 }).limit(10);

  return topMovies;
}

async function getTop10ByGenre(genre) {
  const topMovies = await Movie.find({ genre: { $in: [genre] } }).sort({ averageRating: -1 }).limit(10);
  return topMovies;
}

module.exports = {
  searchMovies,
  getTopMoviesOfTheMonth,
  getTop10ByGenre
};