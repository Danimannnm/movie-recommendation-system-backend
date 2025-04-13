const Thread = require('../models/Thread');

// Create a new thread
exports.createThread = async (req, res) => {
  try {
    const { forumId, title } = req.body;
    const thread = new Thread({ forum: forumId, title, user: req.user.id });
    await thread.save();
    res.status(201).json(thread);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get threads by forum
exports.getThreadsByForum = async (req, res) => {
  try {
    const threads = await Thread.find({ forum: req.params.forumId }).sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};