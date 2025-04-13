const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { threadId, content } = req.body;
    const post = new Post({ thread: threadId, content, user: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get posts by thread
exports.getPostsByThread = async (req, res) => {
  try {
    const posts = await Post.find({ thread: req.params.threadId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};