const express = require('express');
const router = express.Router();
const Director = require('../models/Director');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/directors
// @desc    Add a new director
// @access  Private/Admin
router.post('/', auth, admin, async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/directors/:id
// @desc    Get director by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const director = await Director.findById(req.params.id).populate('filmography', 'title');
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }
    res.json(director);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;