const Review = require('../models/Review');
const Movie = require('../models/Movie');
const logUserActivity = require('../utils/activityLogger');

// Add a new review
exports.addReview = async (req, res) => {
  try {
    const { movieId, rating, reviewText } = req.body;

    // Check if the user has already reviewed this movie
    let review = await Review.findOne({ user: req.user.id, movie: movieId });
    if (review) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    review = new Review({
      user: req.user.id,
      movie: movieId,
      rating,
      reviewText
    });

    await review.save();

    // Update movie's average rating
    await updateMovieRating(movieId);

    // Log the review activity
    await logUserActivity(req.user.id, `Added a review for movie ${movieId}`);

    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const review = await Review.findOneAndUpdate(
      { user: req.user.id, movie: req.params.movieId },
      { rating, reviewText, updatedAt: Date.now() },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update movie's average rating
    await updateMovieRating(req.params.movieId);

    // Log the review activity
    await logUserActivity(req.user.id, `Updated a review for movie ${req.params.movieId}`);

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get reviews for a movie
exports.getReviewsForMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    // Log the review activity
    await logUserActivity(req.user.id, `Viewed reviews for movie ${req.params.movieId}`);

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get review highlights for a movie
exports.getReviewHighlights = async (req, res) => {
    try {
      const movieId = req.params.movieId;
  
      // Fetch all reviews for the movie
      const reviews = await Review.find({ movie: movieId });
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for this movie' });
      }
  
      // Calculate top-rated reviews (e.g., reviews with a rating of 5)
      const topRatedReviews = reviews.filter(review => review.rating === 5);
  
      // Calculate most-discussed reviews (e.g., reviews with the most text)
      const mostDiscussedReviews = reviews.sort((a, b) => b.reviewText.length - a.reviewText.length).slice(0, 3);
  
      res.json({
        topRatedReviews,
        mostDiscussedReviews
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };


// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    // Log the review activity
    await logUserActivity(req.user.id, `Deleted a review for movie ${req.params.reviewId}`);
    
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Helper function to update movie's average rating
async function updateMovieRating(movieId) {
  const reviews = await Review.find({ movie: movieId });
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  await Movie.findByIdAndUpdate(movieId, { averageRating });
}