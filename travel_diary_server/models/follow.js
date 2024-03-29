// models/follow.js 关注与粉丝实体
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection.js");

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

module.exports = Follow;
