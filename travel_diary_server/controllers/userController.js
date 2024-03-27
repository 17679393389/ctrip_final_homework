// controllers/userController.js
const User = require("../models/user");
const passWordEncryption = require("../utils/pwdEncrypt.js");
const { signToken } = require("../utils/authMiddleware.js");
const getOpenid = require("../utils/wx.js");
// 获取所有用户
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 创建新用户
exports.createUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      res.status(403).json({ message: "该昵称已存在" });
    }
    //密码加密
    const pwd = passWordEncryption(req.body.password);
    req.body.password = pwd;
    const newUser = await User.create(req.body);
    //生成token
    const token = signToken({ id: newUser.openid });
    res.json({ newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 根据 ID 获取用户
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 更新用户信息
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 删除用户
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//用户密码登录
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const pwdHash = passWordEncryption(req.body.password);
    if (!user) {
      res.status(403).json({ message: "用户不存在，请注册哦" });
    } else if (user.password !== pwdHash) {
      res.status(404).json({ message: "用户名或密码错误" });
    } else {
      //生成token
      const token = signToken({ username: req.body.username });
      res.json({ user, token });
      // res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//用户授权登录
exports.loginWithWx = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        openid: req.body.openid,
      },
    });
    if (!user) {
      res
        .status(403)
        .json({ message: "用户不存在，请注册哦", openid: req.body.openid });
    } else {
      //生成token
      const token = signToken({ id: req.body.openid });
      // res.json(user);
      res.json({ user, token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取用户唯一标识
exports.getUserIdentifier = async (req, res) => {
  try {
    const wxRes = await getOpenid(req.body.code);
    res.json(wxRes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
