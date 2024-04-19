// controllers/adminController.js
const Admin = require("../models/admin");
const passWordEncryption = require("../utils/pwdEncrypt.js");
const { signToken } = require("../utils/authMiddleware.js");

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (admin) {
      res.json({ message: "该账户已存在，请重新填写" });
    } else {
      //密码加密
      const pwd = passWordEncryption(req.body.password);
      req.body.password = pwd;
      const newAdmin = await Admin.create(req.body);
      //生成token
      const token = signToken({ username: req.body.username });
      res.json({ newAdmin, token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//管理员密码登录
exports.loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: {
        username: req.body.username,
      },
    });
    const pwdHash = passWordEncryption(req.body.password);
    if (!admin) {
      res.status(403).json({ message: "用户不存在，请注册哦" });
    } else if (admin.password !== pwdHash) {
      res.status(404).json({ message: "用户名或密码错误" });
    } else {
      //生成token
      const token = signToken({ username: req.body.username });
      res.json({ admin, token });
      // res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      res.status(404).json({ message: "Admin not found" });
    } else {
      res.json(admin);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const [updated] = await Admin.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedAdmin = await Admin.findByPk(req.params.id);
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const deleted = await Admin.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
