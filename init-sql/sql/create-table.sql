CREATE TABLE IF NOT EXISTS `user_t`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL, # 用户id
  `user_name` varchar(30) NOT NULL, # 用户名
  `account` varchar(30) NOT NULL, # 用户帐号
  `avatar` varchar(255), # 用户头像
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user_t` VALUES (NULL, '1', 'gavin', 'admin', NULL);
