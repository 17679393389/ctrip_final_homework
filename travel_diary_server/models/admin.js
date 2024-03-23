// models/admin.js 管理员实体
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection");

const Admin = sequelize.define("Admin", {
  id: {   //管理员用户id
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  avatar: {  //用户头像url
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {   //用户名
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  role: {    //角色，0：审核员，1：管理员
    type: DataTypes.TINYINT,
    allowNull: false,
    unique: false,
  }
},{
    tableName: 'admin', // 指定表格名称
    freezeTableName: true, // 禁止自动命名表格
    timestamps: false, // 禁止自动生成 createdAt 和 updatedAt 字段
  });

module.exports = Admin;
