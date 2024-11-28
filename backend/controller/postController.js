const Post = require('../models/Post');

// Krijimi i Post-it
const createPost = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const postData = {
      title,
      content,
      date,
      userId: req.user.id, // Lidh me përdoruesin që ka bërë kërkesën
    };
    const post = await Post.create(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Merr postimet
const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: req.user.id, // Merr postimet e përdoruesit të identifikuar
      }
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Azhurnimi i postit
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (post) {
      await post.update(req.body);
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Postimi nuk u gjet.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fshirja e postit
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (post) {
      await post.destroy();
      res.status(200).json({ message: 'Postimi u fshi me sukses.' });
    } else {
      res.status(404).json({ error: 'Postimi nuk u gjet.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
