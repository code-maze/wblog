DROP DATABASE IF EXISTS wblog;

CREATE DATABASE wblog;

USE wblog;

GRANT SELECT, INSERT, UPDATE, DELETE ON wblog.* TO 'moling'@'localhost' IDENTIFIED BY 'www-data';

CREATE TABLE users (
    `uid` INT PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(100) UNIQUE KEY NOT NULL,
    `upwd` VARCHAR(50) NOT NULL,
    `admin` BOOLEAN NOT NULL,
    `uimg` VARCHAR(200) NOT NULL,
    `regTime` BIGINT NOT NULL
) engine=innodb;
