const express = require('express');
const router = express.Router();
const CrewMember = require('../models/CrewMember');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   POST api/crewMembers
// @desc    Add a new crew member
// @access  Private/Admin
router.post('/', auth, admin, async (req, res) => {
  try {
    const crewMember = new CrewMember(req.body);
    await crewMember.save();
    res.status(201).json(crewMember);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/crewMembers/:id
// @desc    Get crew member by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const crewMember = await CrewMember.findById(req.params.id).populate('filmography', 'title');
    if (!crewMember) {
      return res.status(404).json({ message: 'Crew member not found' });
    }
    res.json(crewMember);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;