CREATE TABLE IF NOT EXISTS `dialog_t`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `dialog_code` varchar(30) NOT NULL, # 会话编码
  `dialog_name` varchar(30) NOT NULL, # 会话名称
  `creator` varchar(30) NOT NULL, # 创建者id
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `dialog_t` VALUES (NULL, '100001', 'gavin你好', '1');

SELECT * FROM `dialog_t`;