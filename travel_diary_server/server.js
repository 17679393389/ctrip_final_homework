// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const loveRoutes = require('./routes/loveRoutes');
const followRoutes = require('./routes/followRoutes');
const sequelize = require('./utils/db_connection')
const app = express();
const cors = require('cors');
// 使用 CORS 中间件
app.use(cors());
// 解析请求体
app.use(bodyParser.json());

// 设置路由
app.use('/user', userRoutes);
app.use('/diary', diaryRoutes);
app.use('/admin', adminRoutes);
app.use('/love', loveRoutes);
app.use('/follow', followRoutes);

// 启动服务器
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
