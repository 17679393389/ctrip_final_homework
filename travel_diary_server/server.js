// server.js
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const loveRoutes = require("./routes/loveRoutes");
const followRoutes = require("./routes/followRoutes");
const sequelize = require("./utils/db_connection");
const app = express();
const cors = require("cors");
const session = require("express-session");
const ipRateLimit = require("./utils/ipRateLimit");
const ossRoutes = require("./utils/oss");

// 使用 CORS 中间件
app.use(cors());

// 解析请求体
app.use(bodyParser.json());

// 配置 Session 中间件
app.use(
  session({
    secret: "sdhgfuiashdgisadhgpaeihtwiehgjiashdj", // 用于签名 session ID 的密钥
    resave: false, // 是否每次请求都重新保存 session，false 表示只有当 session 数据发生变化时才会重新保存
    saveUninitialized: true, // 是否自动保存未初始化的 session 数据，true 表示每次请求都会创建一个 session，即使用户未登录
  })
);

// 限制请求频率
app.use(ipRateLimit);

// 设置路由
app.use("/user", userRoutes);
app.use("/diary", diaryRoutes);
app.use("/admin", adminRoutes);
app.use("/love", loveRoutes);
app.use("/follow", followRoutes);

// 设置 OSS 路由
app.use("/oss", ossRoutes);

// 启动服务器
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
