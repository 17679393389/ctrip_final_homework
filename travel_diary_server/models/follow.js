// models/follow.js 关注与粉丝实体
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection.js");
const User = require("../models/user")
const Follow = sequelize.define("Follow", {
  id: {   //关注id
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  up_id: {   //博主的用户id
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  fans_id: {   //粉丝的用户id
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  }
},{
    tableName: 'follow', // 指定表格名称
    freezeTableName: true, // 禁止自动命名表格
    timestamps: false, // 禁止自动生成 createdAt 和 updatedAt 字段
  });

// 设置 Diary 与 User 的关联关系
Follow.belongsTo(User, { foreignKey: "fans_id", as: "user1" });
Follow.belongsTo(User, { foreignKey: "up_id", as: "user2" });
module.exports = Follow;
