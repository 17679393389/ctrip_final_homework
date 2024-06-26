// models/love.js 点赞实体
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection.js");
const Love_ = sequelize.define(
  "Love_",
  {
    id: {
      //点赞id
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    diary_id: {
      //游记id
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    author_id: {
      //作者id
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    like_count: {
      //点赞数量
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
    },
  },
  {
    tableName: "love", // 指定表格名称
    freezeTableName: true, // 禁止自动命名表格
    timestamps: false, // 禁止自动生成 createdAt 和 updatedAt 字段
  }
);

module.exports = Love_;
