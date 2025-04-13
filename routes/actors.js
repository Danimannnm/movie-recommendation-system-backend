const express = require('express');
const router = express.Router();
const Actor = require('../models/Actor');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { getActorAwards } = require('../controllers/actorController');

// @route   POST api/actors
// @desc    Add a new actor
// @access  Private/Admin
router.post('/', auth, admin, async (req, res) => {
  try {
    const actor = new Actor(req.body);
    await actor.save();
    res.status(201).json(actor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/actors/:id
// @desc    Get actor by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id).populate('filmography', 'title');
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }
    res.json(actor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/actors/:actorId/awards
// @desc    Get awards for an actor
// @access  Public
router.get('/:actorId/awards', getActorAwards);

module.exports = router;