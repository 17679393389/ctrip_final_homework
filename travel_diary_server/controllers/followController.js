// controllers/followController.js
const Follow = require('../models/follow');

exports.getAllFollows = async (req, res) => {
  try {
    const follows = await Follow.findAll();
    res.json(follows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFollow = async (req, res) => {
  try {
    const follow = await Follow.create(req.body);
    res.status(201).json(follow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFollowById = async (req, res) => {
  try {
    const follow = await Follow.findByPk(req.params.id);
    if (!follow) {
      res.status(404).json({ message: 'Follow not found' });
    } else {
      res.json(follow);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFollow = async (req, res) => {
  try {
    const [updated] = await Follow.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedFollow = await Follow.findByPk(req.params.id);
      res.json(updatedFollow);
    } else {
      res.status(404).json({ message: 'Follow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFollow = async (req, res) => {
  try {
    const deleted = await Follow.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Follow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const deleted = await Follow.destroy({
      where: req.body
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Follow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
