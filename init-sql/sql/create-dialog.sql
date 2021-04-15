CREATE TABLE IF NOT EXISTS `dialog_t` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dialog_code` varchar(100) NOT NULL,
  `dialog_name` varchar(30) NOT NULL,
  `creator` varchar(30) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, # 创建时间
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, # 修改时间
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

INSERT INTO `login`.`dialog_t` (`id`, `dialog_code`, `dialog_name`, `creator`) VALUES (NULL, '2bf6d3a0-9d38-11eb-b2ff-1d2f55cfb698', '一家人', 'gavin');
INSERT INTO `login`.`dialog_t` (`id`, `dialog_code`, `dialog_name`, `creator`) VALUES (NULL, '3bf6d3a0-9d38-11eb-b2ff-1d2f55cfb698', '光大we谷', 'gavin2');
