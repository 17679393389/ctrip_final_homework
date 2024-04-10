// controllers/diaryController.js
const Diary = require('../models/diary');
const User = require('../models/user');
const Love = require('../models/love');
const Follow = require('../models/follow');

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
    const deleted_d = await Diary.destroy({
      where: { id: req.body.d_id }
    });

    const deleted_l = await Love.destroy({
      where: { diary_id: req.body.d_id }
    });
 
    if (deleted_d && deleted_l) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Diary details do not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyNotesList = async (req, res) => {
  try {
    const { _page, _limit, user_id, status} = req.query; 
    let whereClause = { create_by: user_id  };

    if (status !== '1') {
      switch (status) { 
        case '2':
          whereClause.checked_status = -1;
          break;
        case '3':
          whereClause.checked_status = 0;
          break;
        case '4':
          whereClause.checked_status = 1;
          break;
        default:
          break;
      }
    }
    
    // 查询总的记录数
    const totalCount = await Diary.count({
      where: whereClause
    });

    // 计算数据库查询偏移量
    const offset = (_page - 1) * _limit;
  
    const notes = await Diary.findAll({
      where: { ...whereClause, create_by: user_id  },
      offset: offset,
      limit: parseInt(_limit),
    });

    const notesData = notes.map((diary) => {
      const noteData = diary.toJSON(); 
      noteData.create_at = new Date(noteData.create_at).toLocaleString(); 
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

exports.getMyNoteDetail = async (req, res) => {
  try {
    const {d_id} = req.query; 
    
    const note = await Diary.findByPk(d_id);

    const noteData = note.toJSON(); 
    noteData.create_at = new Date(noteData.create_at).toLocaleString(); 
    noteData.update_time = new Date(noteData.update_time).toLocaleString(); 
    noteData.checked_at = new Date(noteData.checked_at).toLocaleString(); 
    noteData.photoList = noteData.photo.split(",").map((url) => url.trim()); 

    res.json({
      noteDetail:noteData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNoteDetail = async (req, res) => {
  try {
    const {d_id} = req.query; 
    
    // 查询符合条件的游记数据
    const note = await Diary.findAll({
      where: {id: d_id}, 
      include: [
        { model: User, attributes: ["username", "avatarUrl"], as: "author" },
        { model: Love, attributes: ["like_count"], as: "love"},
      ], 
    });

    const noteData = note[0].toJSON(); 
    noteData.create_at = new Date(noteData.create_at).toLocaleString(); 
    noteData.update_time = new Date(noteData.update_time).toLocaleString(); 
    noteData.checked_at = new Date(noteData.checked_at).toLocaleString(); 
    noteData.photoList = noteData.photo.split(",").map((url) => url.trim());
    noteData.username = noteData.author.username;
    noteData.avatarUrl = noteData.author.avatarUrl;
    noteData.love_count = noteData.love.like_count;
    delete noteData.author;
    delete noteData.love;

    const fans =  await Follow.findAll({
      attributes:['fans_id'] ,
      where:{up_id : noteData.create_by}
    });  

    const fansData = fans.map((fan) => {
        const fanData = fan.toJSON();
        return fanData
    });

    const fanList = fansData.map(item => item.fans_id);
  
    res.json({
      noteDetail:noteData,
      fansData: fanList
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalDiary = async (req, res) => {
  try {
    // 查询总的记录数
    const totalCount = await Diary.count();
    res.json({
      totalDiaries: totalCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getToBeCheckedDiary = async (req, res) => {
  try {
    // 查询总的记录数
    const totalCount = await Diary.count({where:{checked_status:-1}});
    res.json({
      totalCheckingDiaries: totalCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

