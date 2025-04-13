const News = require('../models/News');

// Add a new article
exports.addArticle = async (req, res) => {
  try {
    const { title, content, author, tags, sourceUrl } = req.body;

    const article = new News({
      title,
      content,
      author,
      tags,
      sourceUrl
    });

    await article.save();
    res.status(201).json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await News.find().sort({ publishedDate: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get articles by tag
exports.getArticlesByTag = async (req, res) => {
  try {
    const articles = await News.find({ tags: req.params.tag }).sort({ publishedDate: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};