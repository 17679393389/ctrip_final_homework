// controllers/diaryController.js
const Diary = require("../models/diary");
const User = require("../models/user");
const Admin = require("../models/admin");
const Love = require("../models/love");
const { Op } = require("sequelize");
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

// exports.getDiaryById = async (req, res) => {
//   try {
//     const diary = await Diary.findByPk(req.params.id);
//     if (!diary) {
//       res.status(404).json({ message: "Diary not found" });
//     } else {
//       res.json(diary);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updateDiary = async (req, res) => {
  try {
    const [updated] = await Diary.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDiary = await Diary.findByPk(req.params.id);
      res.json(updatedDiary);
    } else {
      res.status(404).json({ message: "Diary not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDiary = async (req, res) => {
  try {
    const deleted = await Diary.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Diary not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//按照分页获取游记
exports.getDiariesList = async (req, res) => {
  try {
    const { page, pageSize, category } = req.query; // 获取客户端发送的页码和每页数量参数
    let whereClause = { checked_status: 1 }; // 初始化查询条件对象

    if (category !== '1') {
      switch (category) { // 将 category 转换为数字
        case '2':
          whereClause.label = { [Op.like]: '%攻略%' };
          break;
        case '3':
          whereClause.label = { [Op.like]: '%风景%' };
          break;
        case '4':
          whereClause.label = { [Op.like]: '%美食%' };
          break;
        case '5':
          whereClause.label = { [Op.like]: '%交通%' };
          break;
        case '6':
          whereClause.label = { [Op.like]: '%住宿%' };
          break;
        case '7':
          whereClause.label = { [Op.notLike]: '%攻略%', [Op.notLike]: '%风景%', [Op.notLike]: '%美食%', [Op.notLike]: '%交通%', [Op.notLike]: '%住宿%' };
          break;
        default:
          break;
      }
    }
    

    // 查询总的记录数
    const totalCount = await Diary.count({
      where: whereClause, // 添加查询条件，只查询 checked_status 字段为 1 （审核通过的） 的游记
    });

    // 计算总页数
    const totalPages = Math.ceil(totalCount / pageSize);

    // 计算数据库查询偏移量
    const offset = (page - 1) * pageSize;

    // 查询符合条件的游记数据
    const diaries = await Diary.findAll({
      where: { ...whereClause,checked_status: 1 }, // 添加查询条件，只查询 checked_status 字段为 1 （审核通过的） 的游记
      offset: offset,
      limit: parseInt(pageSize), // 将每页数量转换为整数
      include: [
        { model: User, attributes: ["username", "avatarUrl"], as: "author" },
        { model: Admin, attributes: ["name"], as: "checked" },
        { model: Love, attributes: ["like_count"], as: "love" },
      ], // 关联查询用户表，并指定返回的字段
    });

    // 将 Sequelize 模型对象转换成普通的 JavaScript 对象，并处理时间戳字段
    const diariesData = diaries.map((diary) => {
      const diaryData = diary.toJSON(); // 转换成普通的 JavaScript 对象
      diaryData.create_at = new Date(diaryData.create_at).toLocaleString(); // 转换创建时间
      diaryData.update_time = new Date(diaryData.update_time).toLocaleString(); // 转换更新时间
      diaryData.checked_at = new Date(diaryData.checked_at).toLocaleString(); // 转换审核时间
      diaryData.photoList = diaryData.photo.split(",").map((url) => url.trim()); //分割图片
      // 从关联的用户表中获取用户名和头像 URL
      diaryData.username = diaryData.author.username;
      diaryData.avatarUrl = diaryData.author.avatarUrl;
      //从关联的管理员表中获取审核员的姓名
      diaryData.checked_person = diaryData.checked.name;
      //从关联的点赞表中获取该条游记的点赞数
      diaryData.love_count = diaryData.love.like_count;
      // 删除原始的 author 字段，如果不需要保留的话
      delete diaryData.author;
      delete diaryData.love;
      return diaryData;
    });

    // 返回总页数和查询到的游记数据给前端
    res.json({
      totalPages: totalPages,
      diaries: diariesData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 按照标题和用户名模糊搜索游记
exports.searchDiaries = async (req, res) => {
  try {
    const { page, pageSize, keyword } = req.query;
    const offset = (page - 1) * pageSize;

    const diaries = await Diary.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } }, // 标题包含关键字
          // 使用关联查询，根据用户名搜索游记
          {
            '$author.username$': {
              [Op.like]: `%${keyword}%`
            }
          }
        ],
        checked_status: 1 // 只查询审核通过的游记
      },
      include: [{ model: User, as: 'author', attributes: ['username'] }], // 关联查询用户表，只返回用户名
      offset,
      limit: parseInt(pageSize)
    });

    // 将 Sequelize 模型对象转换成普通的 JavaScript 对象，并处理时间戳字段等
    const diariesData = diaries.rows.map(diary => {
      const diaryData = diary.toJSON();
      diaryData.create_at = new Date(diaryData.create_at).toLocaleString();
      diaryData.update_time = new Date(diaryData.update_time).toLocaleString();
      diaryData.checked_at = new Date(diaryData.checked_at).toLocaleString();
      diaryData.photoList = diaryData.photo.split(',').map(url => url.trim());
      return diaryData;
    });

    res.json({
      totalPages: Math.ceil(diaries.count / pageSize),
      diaries: diariesData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



