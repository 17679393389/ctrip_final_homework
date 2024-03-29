// models/diary.js 游记实体
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db_connection.js");
const User = require("./user")
const Admin = require("./admin")
const Love_ = require("./love_.js")
// const Follow = require("./follow")

const Diary = sequelize.define("Diary", {
  id: {   //游记id
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
    primaryKey: true
  },
  title: {   //游记标题
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  content: {   //游记内容
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  photo: {  //图片url，可以是多图
    type: DataTypes.TEXT,
    allowNull: false,
    unique: false,
  },
  label: {    //标签：攻略/美食/住宿......
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  create_by: {   //创建人用户id
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  create_at: {   //创建时间
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  update_time: {   //最近一次编辑的时间
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  checked_by: {   //审核人的用户名
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  checked_at: {   //审核时间
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  checked_status: {    //审核状态：-1：未审核，0：拒绝，1：通过
    type: DataTypes.TINYINT,
    allowNull: false,
    unique: false
  },
  checked_opinion: {   //审核意见
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  is_deleted: {   //是否删除，逻辑删除
    type: DataTypes.TINYINT,
    allowNull: false,
    unique: false,
  }
},{
    tableName: 'diary', // 指定表格名称
    freezeTableName: true, // 禁止自动命名表格
    timestamps: false, // 禁止自动生成 createdAt 和 updatedAt 字段
  });

// 设置 Diary 与 User 的关联关系
Diary.belongsTo(User, { foreignKey: 'create_by', as: 'author' });
// 设置 Diary 与 Admin 的关联关系
Diary.belongsTo(Admin, { foreignKey: 'checked_by', as: 'checked' });
// 设置 Diary 与 Love 的关联关系
Diary.belongsTo(Love_, { foreignKey: 'id', as: 'love_' });

module.exports = Diary;
