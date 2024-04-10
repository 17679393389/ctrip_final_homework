// db_connection.js
const { Sequelize } = require('sequelize');

// 创建 Sequelize 实例并配置数据库连接
const sequelize = new Sequelize('travel_diary', 'root', 'Ik17l60u0.', {
  host: 'localhost',
  dialect: 'mysql'
});

// 导出数据库连接对象
module.exports = sequelize;
