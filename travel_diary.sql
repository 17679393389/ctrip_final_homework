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

 Date: 29/03/2024 16:34:15
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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'qsl', '123456', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/bc3efae08b0441de9d66509218e9a6de.png', 'sl', 0);

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
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '创建人的用户id',
  `create_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT NULL COMMENT '最近的更新时间',
  `checked_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '审核员的用户名',
  `checked_at` datetime(0) NULL DEFAULT NULL COMMENT '审核时间',
  `checked_status` tinyint(0) NULL DEFAULT -1 COMMENT '-1：审核中，0：拒绝，1：通过，默认-1',
  `checked_opinion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '审核意见',
  `is_deleted` tinyint(0) NULL DEFAULT 0 COMMENT '是否删除，0：拒绝，1：通过，默认为0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of diary
-- ----------------------------
INSERT INTO `diary` VALUES (1, '鸡鸣寺', '好多人啊 看樱花了', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E9%B8%A1%E9%B8%A3%E5%AF%BA.png', '攻略', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 10:58:53', '2024-03-25 10:58:56', '1', '2024-03-25 11:07:15', 1, '通过', 0);
INSERT INTO `diary` VALUES (2, '玄武湖', '玄武湖好多人啊啊啊啊', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%8E%84%E6%AD%A6%E6%B9%96.jpg', '美食', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:11:06', '2024-03-25 12:11:13', '1', '2024-03-25 12:11:17', 1, '通过', 0);
INSERT INTO `diary` VALUES (3, '栖霞山', '枫叶好美 10月份去可以免门票但是要早上7点前', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E6%A0%96%E9%9C%9E%E5%B1%B1.jpg', '风景', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:13:09', '2024-03-25 12:13:12', '1', '2024-03-25 12:13:16', 1, '通过', 0);
INSERT INTO `diary` VALUES (4, '老山aaa', '面积很大', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E8%80%81%E5%B1%B1.jpeg', '住宿', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:21:16', '2024-03-25 12:21:21', '1', '2024-03-25 12:21:25', 0, '通过', 0);
INSERT INTO `diary` VALUES (5, '紫金山', '爬阶梯', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%B4%AB%E9%87%91%E5%B1%B1.jpg', '风景', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:24:57', '2024-03-25 12:25:51', '1', '2024-03-25 12:25:20', 1, '通过', 0);
INSERT INTO `diary` VALUES (6, '中山陵', '看看先生', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E4%B8%AD%E5%B1%B1%E9%99%B5.jpeg', '风景', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:26:19', '2024-03-25 12:25:53', '1', '2024-03-25 12:25:23', 0, '通过', 0);
INSERT INTO `diary` VALUES (7, '音乐台', '喂鸽子', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E9%9F%B3%E4%B9%90%E5%8F%B0.jpg', '攻略', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:26:22', '2024-03-25 12:25:56', '1', '2024-03-25 12:25:27', 1, '通过', 0);
INSERT INTO `diary` VALUES (8, '夫子庙', '感受古城', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E5%A4%AB%E5%AD%90%E5%BA%99.jpg', '攻略', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:26:25', '2024-03-25 12:26:00', '1', '2024-03-25 12:25:30', 1, '通过', 0);
INSERT INTO `diary` VALUES (9, '总统府', '民国时期', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E6%80%BB%E7%BB%9F%E5%BA%9C.jpeg', '风景', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:26:28', '2024-03-25 12:26:04', '1', '2024-03-25 12:25:33', 1, '通过', 0);
INSERT INTO `diary` VALUES (10, '秦淮河', '夜游秦淮近酒家', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%A7%A6%E6%B7%AE%E6%B2%B3.jpeg', '交通', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:26:31', '2024-03-25 12:26:07', '1', '2024-03-25 12:25:37', 1, '通过', 0);
INSERT INTO `diary` VALUES (11, '熙南里', '古镇', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%86%99%E5%8D%97%E9%87%8C.jpeg', '交通', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:26:34', '2024-03-25 12:26:10', '1', '2024-03-25 12:25:39', 1, '通过', 0);
INSERT INTO `diary` VALUES (12, '牛首山', '佛教圣地', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/%E7%89%9B%E9%A6%96%E5%B1%B1.jpeg', '攻略', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-25 12:26:36', '2024-03-25 12:26:13', '1', '2024-03-25 12:25:43', 0, '禁止发布违反规则的内容', 0);
INSERT INTO `diary` VALUES (14, '测试', '描述描述', 'http://tmp/a7eAnMFyKqB4efb7ff28b525d882eb8edfbfcee7d340.png,http://tmp/O5sTzBmdCg9Nfebc562473fd00726bc2e416b4191d21.png,http://tmp/yJEi8S9nRA9t120e6fb6b223bbded7101e6097f8260f.png', '攻略', 'o4VqY5sJfSWnl92Btl0YXphUdafQ', '2024-03-29 15:59:55', '2024-03-29 15:59:55', '1', '2024-03-29 16:19:11', 1, '通过', 0);

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `up_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '博主的用户id',
  `fans_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '粉丝的id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of follow
-- ----------------------------
INSERT INTO `follow` VALUES (1, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 'o4VqY5sJfSWnl92Btl0YXphUdafQ');

-- ----------------------------
-- Table structure for love
-- ----------------------------
DROP TABLE IF EXISTS `love`;
CREATE TABLE `love`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `diary_id` int(0) NULL DEFAULT NULL COMMENT '游记id',
  `author_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '作者id',
  `like_count` int(0) NULL DEFAULT 0 COMMENT '点赞数，默认为0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of love
-- ----------------------------
INSERT INTO `love` VALUES (1, 1, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 5);
INSERT INTO `love` VALUES (2, 2, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 0);
INSERT INTO `love` VALUES (3, 3, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 11);
INSERT INTO `love` VALUES (4, 4, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 43);
INSERT INTO `love` VALUES (5, 5, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 0);
INSERT INTO `love` VALUES (6, 6, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 1);
INSERT INTO `love` VALUES (7, 7, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 1);
INSERT INTO `love` VALUES (8, 8, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 3);
INSERT INTO `love` VALUES (9, 9, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 1);
INSERT INTO `love` VALUES (10, 10, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 545);
INSERT INTO `love` VALUES (11, 11, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 111);
INSERT INTO `love` VALUES (12, 12, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 5);
INSERT INTO `love` VALUES (13, 14, 'o4VqY5sJfSWnl92Btl0YXphUdafQ', 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '用户唯一标识，从微信官方获取',
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户头像地址',
  `gender` tinyint(0) NULL DEFAULT NULL COMMENT '性别：0代表女，1代表男',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户在应用内的名字',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户微信昵称',
  `phone` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT '手机号码',
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '个性签名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户登录密码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('o4VqY5sJfSWnl92Btl0YXphUdafQ', 'https://it-recite.oss-cn-shenzhen.aliyuncs.com/2b56fa24d81742f48531e00079e41101.jpg', 1, '哆啦A梦', 'sl', '1765454545', '少说多做', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225');

SET FOREIGN_KEY_CHECKS = 1;
