/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : travel_diary

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 27/03/2024 10:32:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '管理员账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '管理员密码',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '头像',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '姓名',
  `role` tinyint(4) NULL DEFAULT 0 COMMENT '角色：0-审核人员，只能审核游记通过或者拒绝。1-管理员，可以通过、拒绝和删除游记',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'qsl', '123456', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/bc3efae08b0441de9d66509218e9a6de.png', 'sl', 0);

-- ----------------------------
-- Table structure for diary
-- ----------------------------
DROP TABLE IF EXISTS `diary`;
CREATE TABLE `diary`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记标题',
  `content` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记内容',
  `photo` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记配图的url，支持多图',
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '游记标签，例如：攻略/风景/摄影/美食/住宿',
  `create_by` int(11) NULL DEFAULT NULL COMMENT '创建人的用户id',
  `create_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '最近的更新时间',
  `checked_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '审核员的用户名',
  `checked_at` datetime NULL DEFAULT NULL COMMENT '审核时间',
  `checked_status` tinyint(4) NULL DEFAULT -1 COMMENT '-1：审核中，0：拒绝，1：通过，默认-1',
  `checked_opinion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '审核意见',
  `is_deleted` tinyint(4) NULL DEFAULT 0 COMMENT '是否删除，0：拒绝，1：通过，默认为0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of diary
-- ----------------------------
INSERT INTO `diary` VALUES (1, '鸡鸣寺', '好多人啊 看樱花了', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E9%B8%A1%E9%B8%A3%E5%AF%BA.png', '攻略', 1, '2024-03-25 10:58:53', '2024-03-25 10:58:56', '1', '2024-03-25 11:07:15', 1, '通过', 0);
INSERT INTO `diary` VALUES (2, '玄武湖', '玄武湖好多人啊啊啊啊', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%8E%84%E6%AD%A6%E6%B9%96.jpg', '美食', 1, '2024-03-25 12:11:06', '2024-03-25 12:11:13', '1', '2024-03-25 12:11:17', 1, '通过', 0);
INSERT INTO `diary` VALUES (3, '栖霞山', '枫叶好美 10月份去可以免门票但是要早上7点前', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E6%A0%96%E9%9C%9E%E5%B1%B1.jpg', '风景', 1, '2024-03-25 12:13:09', '2024-03-25 12:13:12', '1', '2024-03-25 12:13:16', 1, '通过', 0);
INSERT INTO `diary` VALUES (4, '老山aaa', '面积很大', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E8%80%81%E5%B1%B1.jpeg', '住宿', 1, '2024-03-25 12:21:16', '2024-03-25 12:21:21', '1', '2024-03-25 12:21:25', 1, '通过', 0);
INSERT INTO `diary` VALUES (5, '紫金山', '爬阶梯', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%B4%AB%E9%87%91%E5%B1%B1.jpg', '风景', 1, '2024-03-25 12:24:57', '2024-03-25 12:25:51', '1', '2024-03-25 12:25:20', 1, '通过', 0);
INSERT INTO `diary` VALUES (6, '中山陵', '看看先生', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E4%B8%AD%E5%B1%B1%E9%99%B5.jpeg', '风景', 1, '2024-03-25 12:26:19', '2024-03-25 12:25:53', '1', '2024-03-25 12:25:23', 1, '通过', 0);
INSERT INTO `diary` VALUES (7, '音乐台', '喂鸽子', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E9%9F%B3%E4%B9%90%E5%8F%B0.jpg', '攻略', 1, '2024-03-25 12:26:22', '2024-03-25 12:25:56', '1', '2024-03-25 12:25:27', 1, '通过', 0);
INSERT INTO `diary` VALUES (8, '夫子庙', '感受古城', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E5%A4%AB%E5%AD%90%E5%BA%99.jpg', '攻略', 1, '2024-03-25 12:26:25', '2024-03-25 12:26:00', '1', '2024-03-25 12:25:30', 1, '通过', 0);
INSERT INTO `diary` VALUES (9, '总统府', '民国时期', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E6%80%BB%E7%BB%9F%E5%BA%9C.jpeg', '风景', 1, '2024-03-25 12:26:28', '2024-03-25 12:26:04', '1', '2024-03-25 12:25:33', 1, '通过', 0);
INSERT INTO `diary` VALUES (10, '秦淮河', '夜游秦淮近酒家', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%A7%A6%E6%B7%AE%E6%B2%B3.jpeg', '交通', 1, '2024-03-25 12:26:31', '2024-03-25 12:26:07', '1', '2024-03-25 12:25:37', 1, '通过', 0);
INSERT INTO `diary` VALUES (11, '熙南里', '古镇', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%86%99%E5%8D%97%E9%87%8C.jpeg', '交通', 1, '2024-03-25 12:26:34', '2024-03-25 12:26:10', '1', '2024-03-25 12:25:39', 1, '通过', 0);
INSERT INTO `diary` VALUES (12, '牛首山', '佛教圣地', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%89%9B%E9%A6%96%E5%B1%B1.jpeg', '攻略', 1, '2024-03-25 12:26:36', '2024-03-25 12:26:13', '1', '2024-03-25 12:25:43', 1, '通过', 0);

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `up_id` int(11) NULL DEFAULT NULL COMMENT '博主的用户id',
  `fans_id` int(11) NULL DEFAULT NULL COMMENT '粉丝的id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of follow
-- ----------------------------

-- ----------------------------
-- Table structure for like
-- ----------------------------
DROP TABLE IF EXISTS `like`;
CREATE TABLE `like`  (
  `id` int(11) NOT NULL COMMENT '主键，自增',
  `diary_id` int(11) NULL DEFAULT NULL COMMENT '游记id',
  `author_id` int(11) NULL DEFAULT NULL COMMENT '作者id',
  `like_count` int(11) NULL DEFAULT 0 COMMENT '点赞数，默认为0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of like
-- ----------------------------

-- ----------------------------
-- Table structure for love
-- ----------------------------
DROP TABLE IF EXISTS `love`;
CREATE TABLE `love`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `diary_id` int(11) NULL DEFAULT NULL COMMENT '游记id',
  `author_id` int(11) NULL DEFAULT NULL COMMENT '作者id',
  `like_count` int(11) NULL DEFAULT 0 COMMENT '点赞数，默认为0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of love
-- ----------------------------
INSERT INTO `love` VALUES (1, 1, 1, 5);
INSERT INTO `love` VALUES (2, 2, 1, 0);
INSERT INTO `love` VALUES (3, 3, 1, 11);
INSERT INTO `love` VALUES (4, 4, 1, 43);
INSERT INTO `love` VALUES (5, 5, 1, 0);
INSERT INTO `love` VALUES (6, 6, 1, 1);
INSERT INTO `love` VALUES (7, 7, 1, 1);
INSERT INTO `love` VALUES (8, 8, 1, 3);
INSERT INTO `love` VALUES (9, 9, 1, 1);
INSERT INTO `love` VALUES (10, 10, 1, 545);
INSERT INTO `love` VALUES (11, 11, 1, 111);
INSERT INTO `love` VALUES (12, 12, 1, 5);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '微信用户唯一标识，从微信官方获取',
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户头像地址',
  `gender` tinyint(4) NULL DEFAULT NULL COMMENT '性别：0代表女，1代表男',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户在应用内的名字',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户微信昵称',
  `phone` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '手机号码',
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '个性签名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户登录密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'fefafa', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/2b56fa24d81742f48531e00079e41101.jpg', 1, '哆啦A梦', 'sl', '1765454545', '少说多做', NULL);
INSERT INTO `user` VALUES (2, NULL, 'http://tmp/5zQhBCigC6WLe05551318a71e1b68871908f67fdc4b7.jpg', 1, '酸甜土豆丝', NULL, NULL, NULL, 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f');

SET FOREIGN_KEY_CHECKS = 1;
