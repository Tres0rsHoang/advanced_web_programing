/*
 Navicat Premium Data Transfer

 Source Server         : AdvanceWebPrograming
 Source Server Type    : MySQL
 Source Server Version : 50562 (5.5.62-0ubuntu0.14.04.1)
 Source Host           : sql12.freesqldatabase.com:3306
 Source Schema         : sql12661265

 Target Server Type    : MySQL
 Target Server Version : 50562 (5.5.62-0ubuntu0.14.04.1)
 File Encoding         : 65001

 Date: 15/11/2023 21:09:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for refresh_authen
-- ----------------------------
DROP TABLE IF EXISTS `refresh_authen`;
CREATE TABLE `refresh_authen` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `token` varchar(255) DEFAULT NULL,
  `is_revoked` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
