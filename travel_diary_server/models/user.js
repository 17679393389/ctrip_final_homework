// models/user.js 用户实体
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection.js");

const User = sequelize.define("User", {
  id: {   //用户id
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  openid: {   //微信用户唯一标识
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
  avatarUrl: {  //用户微信头像url
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gender: {    //性别，0：女，1：男
    type: DataTypes.TINYINT,
    allowNull: true,
    unique: true,
  },
  username: {   //用户名
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  nickname: {   //用户的微信昵称
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  phone: {     //用户手机号码
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isPhone: true,
    },
  },
  tips: {    //个性签名
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
    tableName: 'user', // 指定表格名称
    freezeTableName: true, // 禁止自动命名表格
    timestamps: false, // 禁止自动生成 createdAt 和 updatedAt 字段
  });

module.exports = User;
