// controllers/followController.js
const Follow = require('../models/follow');
const User = require('../models/user')
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


//获取当前用户的关注或者粉丝，flag==1:关注，flag==2:粉丝
exports.getFollowAndFansListByUserId = async (req,res) => {
  try {
    // console.log(req.query)
    let whereClause = {};
    if(req.query.flag==1){
      whereClause = {fans_id:req.query.user_id};
    }else if(req.query.flag==2){
      whereClause = {up_id:req.query.user_id};
    }
    const follows = await Follow.findAll({
      where: whereClause,
      include: [
        { model: User, attributes: ["id","username", "avatarUrl","tips","gender"], as: "user2" }
      ] // 关联查询用户表，并指定返回的字段
    });
    // console.log(follows)
    const followsData = follows.map((follow)=>{
      const followData = follow.toJSON()
      followData.user_id = followData.user2.id;
      followData.avatarUrl = followData.user2.avatarUrl;
      followData.username = followData.user2.username;
      followData.tips = followData.user2.tips;
      followData.gender = followData.user2.gender==1?'♂':'♀';
      delete followData.user2;
      return followData;

    })
    res.status(200).json(followsData);

  }catch(error){
    res.status(500).json({error:error.message})
  }
}