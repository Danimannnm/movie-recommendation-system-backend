const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const CrewMember = require('../models/CrewMember');


// Add a new movie
exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();

    // Update filmography for actors
    if (req.body.cast) {
      await Actor.updateMany(
        { _id: { $in: req.body.cast } },
        { $addToSet: { filmography: movie._id } }
      );
    }

    // Update filmography for director
    if (req.body.director) {
      await Director.updateOne(
        { _id: req.body.director },
        { $addToSet: { filmography: movie._id } }
      );
    }

    // Update filmography for crew members
    if (req.body.crew) {
      await CrewMember.updateMany(
        { _id: { $in: req.body.crew } },
        { $addToSet: { filmography: movie._id } }
      );
    }

    res.status(201).json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get box office information for a movie
exports.getBoxOfficeInfo = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).select('boxOffice');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie.boxOffice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get awards for a movie
exports.getMovieAwards = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).select('awards');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie.awards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Update filmography for actors
    if (req.body.cast) {
      await Actor.updateMany(
        { _id: { $in: req.body.cast } },
        { $addToSet: { filmography: movie._id } }
      );
    }

    // Update filmography for director
    if (req.body.director) {
      await Director.updateOne(
        { _id: req.body.director },
        { $addToSet: { filmography: movie._id } }
      );
    }

    // Update filmography for crew members
    if (req.body.crew) {
      await CrewMember.updateMany(
        { _id: { $in: req.body.crew } },
        { $addToSet: { filmography: movie._id } }
      );
    }

    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};