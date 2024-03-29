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

exports.getMyNotesList = async (req, res) => {
  try {
    const { _page, _limit, user_id} = req.query; 
    let whereClause = { create_by: user_id  };
    
    // 查询总的记录数
    const totalCount = await Diary.count({
      where: whereClause
    });

    // 计算数据库查询偏移量
    const offset = (_page - 1) * _limit;

    const notes = await Diary.findAll({
      where: { ...whereClause, create_by: user_id },
      offset: offset,
      limit: parseInt(_limit),
    });

    const notesData = notes.map((diary) => {
      const noteData = diary.toJSON(); 
      noteData.create_at = new Date(noteData.create_at).toLocaleString(); 
      noteData.update_time = new Date(noteData.update_time).toLocaleString(); 
      noteData.checked_at = new Date(noteData.checked_at).toLocaleString(); 
      noteData.photoList = noteData.photo.split(",").map((url) => url.trim()); 
      
      return noteData;
    });

    // 返回总页数和查询到的游记数据给前端
    res.json({
      totalPages: totalCount,
      noteList: notesData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};