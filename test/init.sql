CREATE DATABASE IF NOT EXISTS fpm CHARACTER SET utf8 COLLATE utf8_general_ci;
COMMIT;
use fpm;
DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createAt` bigint(20) NOT NULL DEFAULT '0',
  `updateAt` bigint(20) NOT NULL DEFAULT '0',
  `delflag` tinyint(4) NOT NULL DEFAULT '0',
  `name` varchar(200) NOT NULL,
  `val` varchar(200) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
COMMIT;