// controllers/diaryController.js
const Diary = require("../models/diary");
const User = require("../models/user");
const Admin = require("../models/admin");
const Love_ = require("../models/love_");
const { Op } = require("sequelize");
const sequelize = require("../utils/db_connection");
exports.getAllDiaries = async (req, res) => {
  try {
    const diaries = await Diary.findAll();
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.createDiary = async (req, res) => {
//   try {
//     const diary = await Diary.create(req.body);
//     res.status(201).json(diary);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

exports.getDiaryById = async (req, res) => {
  try {
    const diary = await Diary.findByPk(req.params.id);
    if (!diary) {
      res.status(404).json({ error: "游记丢失了！" });
    } else {
      res.json(diary);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.updateDiary = async (req, res) => {
//   try {
//     const [updated] = await Diary.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (updated) {
//       const updatedDiary = await Diary.findByPk(req.params.id);
//       res.json(updatedDiary);
//     } else {
//       res.status(404).json({ message: "Diary not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
    let { page, pageSize, category, user_id } = req.query; // 获取客户端发送的页码和每页数量参数
    let whereClause = {};
    if(!user_id){ // user_id为空，说明发送请求的是小程序用户
      whereClause = { checked_status: 1 }; // 初始化查询条件对象
    }
    category = parseInt(category);
    if (category !== 1) {
      switch (category) {
        case 2:
          whereClause.label = { [Op.like]: "%攻略%" };
          break;
        case 3:
          whereClause.label = { [Op.like]: "%风景%" };
          break;
        case 4:
          whereClause.label = { [Op.like]: "%美食%" };
          break;
        case 5:
          whereClause.label = { [Op.like]: "%交通%" };
          break;
        case 6:
          whereClause.label = { [Op.like]: "%住宿%" };
          break;
        case 7:
          whereClause.label = {
            [Op.notLike]: "%攻略%",
            [Op.notLike]: "%风景%",
            [Op.notLike]: "%美食%",
            [Op.notLike]: "%交通%",
            [Op.notLike]: "%住宿%",
          };
          break;
        default:
          break;
      }
    }

    // 查询总的记录数
    const totalCount = await Diary.count({
      where: whereClause, // 添加查询条件，查询符合条件的游记数量
    });

    // 计算总页数
    const totalPages = Math.ceil(totalCount / pageSize);

    // 计算数据库查询偏移量
    const offset = (page - 1) * pageSize;
    
    let include = [];
    if(user_id){
        include = [{ model: User, attributes: ["username", "avatarUrl"], as: "author" },
        { model: Love_, attributes: ["like_count"], as: "love_" },]
    }else{
        include = [{ model: User, attributes: ["username", "avatarUrl"], as: "author" },
        { model: Admin, attributes: ["name"], as: "checked" },
        { model: Love_, attributes: ["like_count"], as: "love_" },]
    }

    // 查询符合条件的游记数据
    const diaries = await Diary.findAll({
      where: { ...whereClause}, // 添加查询条件，只查询 checked_status 字段为 1 （审核通过的） 的游记
      offset: offset,
      limit: parseInt(pageSize), // 将每页数量转换为整数
      
      include: include, // 关联查询用户表，并指定返回的字段
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
      if(!diaryData.checked){
        diaryData.checked_person = '未审核';
      }else{
        diaryData.checked_person = diaryData.checked.name;
      }
      //从关联的点赞表中获取该条游记的点赞数
      diaryData.love_count = diaryData.love_.like_count;
      // 删除原始的 author 字段，如果不需要保留的话
      delete diaryData.author;
      delete diaryData.love_;
      return diaryData;
    });

    // 返回总页数和查询到的游记数据给前端
    res.json({
      totalCount: totalCount,
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
    const { page, pageSize, keyword, user_id } = req.query;
    const offset = (page - 1) * pageSize;
    let whereClause;
    if (!user_id) {
      //user_id为空 说明请求方是微信小程序用户，只查询审核通过的游记
      whereClause = { checked_status: 1 };
    }

    const diaries = await Diary.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } }, // 标题包含关键字
          // 使用关联查询，根据用户名搜索游记
          {
            "$author.username$": {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
        ...whereClause,
      },
      include: [
        { model: User, attributes: ["username", "avatarUrl"], as: "author" },
        { model: Admin, attributes: ["name"], as: "checked" },
        { model: Love_, attributes: ["like_count"], as: "love_" },
      ], // 关联查询用户表，并指定返回的字段
      offset,
      limit: parseInt(pageSize),
    });

    // 将 Sequelize 模型对象转换成普通的 JavaScript 对象，并处理时间戳字段等
    const diariesData = diaries.rows.map((diary) => {
      const diaryData = diary.toJSON();
      diaryData.create_at = new Date(diaryData.create_at).toLocaleString();
      diaryData.update_time = new Date(diaryData.update_time).toLocaleString();
      diaryData.checked_at = new Date(diaryData.checked_at).toLocaleString();
      diaryData.photoList = diaryData.photo.split(",").map((url) => url.trim());
      // 从关联的用户表中获取用户名和头像 URL
      diaryData.username = diaryData.author.username;
      diaryData.avatarUrl = diaryData.author.avatarUrl;
      //从关联的管理员表中获取审核员的姓名
      diaryData.checked_person = diaryData.checked.name;
      //从关联的点赞表中获取该条游记的点赞数
      diaryData.love_count = diaryData.love_.like_count;
      // 删除原始的 author 字段，如果不需要保留的话
      delete diaryData.author;
      delete diaryData.love_;
      return diaryData;
    });
    res.json({
      totalCount: diaries.count,
      totalPages: Math.ceil(diaries.count / pageSize),
      diaries: diariesData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//查询当前用户发布的所有的游记
exports.getUserDiaries = async (req, res) => {
  try {
    const { openid, page, pageSize } = req.query; // 获取客户端发送的openid、页码和每页数量参数

    // 查询总的记录数
    const totalCount = await Diary.count({
      where: { create_by: openid }, // 添加查询条件，只查询指定用户的游记
    });

    // 计算总页数
    const totalPages = Math.ceil(totalCount / pageSize);

    // 计算数据库查询偏移量
    const offset = (page - 1) * pageSize;

    // 查询符合条件的游记数据，并按创建时间从晚到早排序
    const diaries = await Diary.findAll({
      where: { create_by: openid }, // 添加查询条件，只查询指定用户的游记
      offset: offset,
      limit: parseInt(pageSize), // 将每页数量转换为整数
      order: [["create_at", "DESC"]], // 按创建时间从晚到早排序
      include: [
        { model: User, attributes: ["username", "avatarUrl"], as: "author" },
        { model: Admin, attributes: ["name"], as: "checked" },
        { model: Love_, attributes: ["like_count"], as: "love_" },
      ], // 关联查询用户表，并指定返回的字段
    });

    // 将 Sequelize 模型对象转换成普通的 JavaScript 对象，并处理时间戳字段，格式化图片列表等
    const diariesData = diaries.map((diary) => {
      const diaryData = diary.toJSON(); // 转换成普通的 JavaScript 对象
      diaryData.create_at = new Date(diaryData.create_at).toLocaleString(); // 转换创建时间
      diaryData.update_time = new Date(diaryData.update_time).toLocaleString(); // 转换更新时间
      diaryData.checked_at = new Date(diaryData.checked_at).toLocaleString(); // 转换审核时间
      diaryData.photoList = diaryData.photo.split(",").map((url) => url.trim()); // 分割图片
      // 从关联的用户表中获取用户名和头像 URL
      diaryData.username = diaryData.author.username;
      diaryData.avatarUrl = diaryData.author.avatarUrl;
      // 从关联的管理员表中获取审核员的姓名
      diaryData.checked_person = diaryData.checked.name;
      // 从关联的点赞表中获取该条游记的点赞数
      diaryData.love_count = diaryData.love_.like_count;
      // 删除原始的 author 字段，如果不需要保留的话
      delete diaryData.author;
      delete diaryData.love_;
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
//编辑游记内容
const updateDiary = (diary) => {
  try {
    //默认更新时间为当前时间
    diary.update_time = new Date();
    const [updated] = Diary.update(diary, {
      where: { id: diary.id },
    });
    if (updated) {
      const newdDiary = Diary.findByPk(diary.id);
      return { code: 200, data: newdDiary };
    } else {
      return { code: 404, data: "Diary not found" };
    }
  } catch (error) {
    return { code: 500, data: error.message };
  }
};

const createDiary = (diary) => {
  //默认创建时间为当前时间
  diary.create_at = new Date();
  //默认更新时间为当前时间
  diary.update_time = new Date();
  try {
    const newdDiary = Diary.create(diary);
    return { code: 200, data: newdDiary };
  } catch (error) {
    return { code: 500, data: error.message };
  }
};

exports.newDiary = async (req, res) => {
  try {
    if (req.body.status == 1) {
      //编辑状态
      const result = await updateDiary(req.body.diary);
      if (result.code == 200) {
        res.json(result.data);
      } else if (result.code == 404) {
        res.status(404).json({ error: result.data });
      } else {
        res.status(500).json({ error: result.data });
      }
    } else {
      const result = await createDiary(req.body.diary);
      if (result.code == 200) {
        res.json(result.data);
      } else {
        res.status(500).json({ error: result.data });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//更新游记状态
exports.updateDiaryStatus = async (req, res) => {
  try {
    const newDiaryList = req.body;
    const updateDiaryList = newDiaryList.map((diary) => {
      //设置审核时间为当前时间
      diary.checked_at = new Date();
      Diary.update(diary, {
        where: { id: diary.id },
      });
    });
    res.json({ status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//筛选游记
exports.getDiaryByStatus = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    // 计算数据库查询偏移量
    const offset = (page - 1) * pageSize;
    let statusList = req.query.status.split(",").map((status) => ({
      checked_status: Number(status),
    }));
    const diaries = await Diary.findAll({
      where: {
        [Op.or]: statusList,
        is_deleted: 0,
      },
      include: [
        { model: User, attributes: ["username", "avatarUrl"], as: "author" },
        { model: Admin, attributes: ["name"], as: "checked" },
      ], // 关联查询用户表，并指定返回的字段
      offset,
      limit: parseInt(pageSize),
    });

     // 查询总的记录数
     const totalCount = await Diary.count({
      where: {
        [Op.or]: statusList,
        is_deleted: 0,
      }, // 添加查询条件，查询符合条件的游记数量
    });

    // 计算总页数
    const totalPages = Math.ceil(totalCount / pageSize);
    // 将 Sequelize 模型对象转换成普通的 JavaScript 对象，并处理时间戳字段等
    const diariesData = diaries.map((diary) => {
      const diaryData = diary.toJSON();
      diaryData.create_at = new Date(diaryData.create_at).toLocaleString();
      diaryData.update_time = new Date(diaryData.update_time).toLocaleString();
      diaryData.checked_at = new Date(diaryData.checked_at).toLocaleString();
      diaryData.photoList = diaryData.photo.split(",").map((url) => url.trim());
      // 从关联的用户表中获取用户名和头像 URL
      diaryData.username = diaryData.author.username;
      diaryData.avatarUrl = diaryData.author.avatarUrl;
      //从关联的管理员表中获取审核员的姓名
      if (diaryData.checked) {
        diaryData.checked_person = diaryData.checked.name;
      } else {
        diaryData.checked_person = "未审核";
      }
      // 删除原始的 author 字段，如果不需要保留的话
      delete diaryData.author;
      delete diaryData.love_;
      return diaryData;
    });
    res.json({
      totalCount: totalCount,
      totalPages: totalPages,
      diaries: diariesData,
    });
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
