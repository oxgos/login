CREATE TABLE IF NOT EXISTS `user_t`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL, # 用户id
  `user_name` varchar(30) NOT NULL, # 用户名
  `account` varchar(30) NOT NULL, # 用户帐号
  `password` varchar(100) NOT NULL, # 用户密码
  `salt` varchar(100) NOT NULL, # 盐
  `avatar` varchar(255), # 用户头像
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, # 创建时间
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, # 修改时间
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `login`.`user_t` (`id`, `user_id`, `user_name`, `account`, `password`, `salt`, `avatar`) VALUES (NULL, '4f6d3aa0-9d38-11eb-b2ff-1d2f55cfb698', 'g', 'gavin', '2f29f27f3484f6b900c10a47140f1cde', 'f7952adedf823b9c1d74d9e18e6ab65b', NULL);
