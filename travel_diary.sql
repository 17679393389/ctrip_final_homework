/*
 Navicat Premium Data Transfer

 Source Server         : MySQL8.0
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : travel_diary

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 23/03/2024 15:52:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '管理员账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '管理员密码',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '头像',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '姓名',
  `role` tinyint(0) NULL DEFAULT 0 COMMENT '角色：0-审核人员，只能审核游记通过或者拒绝。1-管理员，可以通过、拒绝和删除游记',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for diary
-- ----------------------------
DROP TABLE IF EXISTS `diary`;
CREATE TABLE `diary`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记标题',
  `content` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记内容',
  `photo` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记配图的url，支持多图',
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记标签，例如：攻略/风景/摄影/美食/住宿',
  `create_by` int(0) NULL DEFAULT NULL COMMENT '创建人的用户id',
  `create_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '最近的更新时间',
  `checked_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '审核员的用户名',
  `checked_at` datetime(0) NULL DEFAULT NULL COMMENT '审核时间',
  `checked_status` tinyint(0) NULL DEFAULT -1 COMMENT '-1：审核中，0：拒绝，1：通过，默认-1',
  `checked_opinion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '审核意见',
  `is_deleted` tinyint(0) NULL DEFAULT 0 COMMENT '是否删除，0：拒绝，1：通过，默认为0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of diary
-- ----------------------------

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `up_id` int(0) NULL DEFAULT NULL COMMENT '博主的用户id',
  `fans_id` int(0) NULL DEFAULT NULL COMMENT '粉丝的id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of follow
-- ----------------------------

-- ----------------------------
-- Table structure for like
-- ----------------------------
DROP TABLE IF EXISTS `like`;
CREATE TABLE `like`  (
  `id` int(0) NOT NULL COMMENT '主键，自增',
  `diary_id` int(0) NULL DEFAULT NULL COMMENT '游记id',
  `author_id` int(0) NULL DEFAULT NULL COMMENT '作者id',
  `like_count` int(0) NULL DEFAULT 0 COMMENT '点赞数，默认为0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of like
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `openid` int(0) NULL DEFAULT NULL COMMENT '微信用户唯一标识，从微信官方获取',
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户头像地址',
  `gender` tinyint(0) NULL DEFAULT NULL COMMENT '性别：0代表女，1代表男',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户在应用内的名字',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户微信昵称',
  `phone` int(0) NULL DEFAULT NULL COMMENT '手机号码',
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '个性签名',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
