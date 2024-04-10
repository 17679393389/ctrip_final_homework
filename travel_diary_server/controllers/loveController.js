// controllers/likeController.js
const Like = require('../models/love_');

exports.getAllLoves = async (req, res) => {
  try {
    const likes = await Like.findAll();
    res.json(likes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLove = async (req, res) => {
  try {
    const like = await Like.create(req.body);
    res.status(201).json(like);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLoveById = async (req, res) => {
  try {
    const like = await Like.findByPk(req.params.id);
    if (!like) {
      res.status(404).json({ message: 'Like not found' });
    } else {
      res.json(like);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLove = async (req, res) => {
  try {
    const deleted = await Like.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Like not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateNoteLikes = async (req, res) => {
  try {

      const [updated] = await Like.update({like_count: req.body.like_count}, {
      where: { diary_id: req.body.d_id }
    });
    if (updated) {
      const updatedLike = await Like.findByPk(req.body.d_id);
      res.json(updatedLike);
    } else {
      res.status(404).json({ message: 'Like_count not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};


