CREATE TABLE IF NOT EXISTS `message_t`(
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `dialog_code` varchar(30) NOT NULL, # 会话编码
  `message_id` varchar(30) NOT NULL, # 消息id
  `creator` varchar(30) NOT NULL, # 创建者id
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `message_t` VALUES (NULL, '100001', '100001', '1');