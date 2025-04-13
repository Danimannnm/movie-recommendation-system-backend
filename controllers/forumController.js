const Forum = require('../models/Forum');

// Create a new forum
exports.createForum = async (req, res) => {
  try {
    const { title, description } = req.body;
    const forum = new Forum({ title, description });
    await forum.save();
    res.status(201).json(forum);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all forums
exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find().sort({ createdAt: -1 });
    res.json(forums);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};