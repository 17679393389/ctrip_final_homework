const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

// 检查 token 是否快要过期
const checkTokenExpiration = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const currentTime = Math.floor(Date.now() / 1000); // 当前时间（秒）
    const tokenExp = decoded.exp; // token 过期时间（秒）

    // 如果 token 快要过期（例如还剩 5 分钟），则重新生成新的 token 并发送给用户
    if (tokenExp - currentTime < 50) { // 300 秒 = 5 分钟
        console.log("token要过期了",decoded.user)
      const newToken = jwt.sign(decoded.user, secretKey, { expiresIn: "60s" }); // 生成新的 token
      console.log(newToken)
      res.set("Authorization", newToken); // 发送新的 token 给用户
    }
    next(); // 继续执行下一个中间件或路由处理程序
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = checkTokenExpiration;
