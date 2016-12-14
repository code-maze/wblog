SET NAMES UTF8;

DROP DATABASE IF EXISTS wblog;

CREATE DATABASE wblog CHARSET=UTF8;

USE wblog;

GRANT ALL ON wblog.* TO 'moling'@'localhost' IDENTIFIED BY 'www-data';
