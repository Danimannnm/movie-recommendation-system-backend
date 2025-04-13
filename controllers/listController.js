const List = require('../models/List');

// Create a new list
exports.createList = async (req, res) => {
  try {
    const { title, description, movies, isPublic } = req.body;

    const list = new List({
      user: req.user.id,
      title,
      description,
      movies,
      isPublic
    });

    await list.save();
    res.status(201).json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a list
exports.updateList = async (req, res) => {
  try {
    const { title, description, movies, isPublic } = req.body;
    const list = await List.findOneAndUpdate(
      { _id: req.params.listId, user: req.user.id },
      { title, description, movies, isPublic },
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ message: 'List not found or not authorized' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Follow a list
exports.followList = async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    if (list.followers.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already following this list' });
    }

    list.followers.push(req.user.id);
    await list.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get lists created by a user
exports.getUserLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get public lists
exports.getPublicLists = async (req, res) => {
  try {
    const lists = await List.find({ isPublic: true });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};