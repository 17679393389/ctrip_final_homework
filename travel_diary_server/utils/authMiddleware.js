// utils/authMiddleware.js

const jwt = require('jsonwebtoken');
const { secretKey } = require('../config'); // 导入你的密钥

// JWT 验证中间件
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // 验证 Token

    // 将用户信息保存在请求对象中，以便后续路由使用
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
