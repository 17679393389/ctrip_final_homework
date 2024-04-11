// db_connection.js
const { Sequelize } = require('sequelize');

// 创建 Sequelize 实例并配置数据库连接
const sequelize = new Sequelize('travel_diary', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+08:00' // 设置时区为东八区，即中国的时区
});

// 导出数据库连接对象
module.exports = sequelize;
