// controllers/diaryController.js
const Diary = require('../models/diary');

exports.getAllDiaries = async (req, res) => {
  try {
    const diaries = await Diary.findAll();
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDiary = async (req, res) => {
  try {
    const diary = await Diary.create(req.body);
    res.status(201).json(diary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDiaryById = async (req, res) => {
  try {
    const diary = await Diary.findByPk(req.params.id);
    if (!diary) {
      res.status(404).json({ message: 'Diary not found' });
    } else {
      res.json(diary);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDiary = async (req, res) => {
  try {
    const [updated] = await Diary.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedDiary = await Diary.findByPk(req.params.id);
      res.json(updatedDiary);
    } else {
      res.status(404).json({ message: 'Diary not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDiary = async (req, res) => {
  try {
    const deleted = await Diary.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Diary not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
