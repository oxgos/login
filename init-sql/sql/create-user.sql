CREATE TABLE IF NOT EXISTS `user_t`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL, # 用户id
  `user_name` varchar(30) NOT NULL, # 用户名
  `account` varchar(30) NOT NULL, # 用户帐号
  `password` varchar(100) NOT NULL, # 用户密码
  `salt` varchar(100) NOT NULL, # 盐
  `avatar` varchar(255), # 用户头像
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user_t` VALUES (NULL, 'b412d0c0-8990-11eb-9397-85d068417234', 'gavin', 'admin', '123456', 'secret', NULL);
