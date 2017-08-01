DROP DATABASE if exists nba;
CREATE DATABASE nba;

USE nba;

CREATE TABLE teams(
  id int NOT NULL AUTO_INCREMENT,
  teamname varchar(50),
  location varchar(50),
  PRIMARY KEY (id)

);

CREATE TABLE players(
  id int AUTO_INCREMENT,
  playerName varchar(50),
  rebounds VARCHAR(50),
  assists VARCHAR(50),
  steals VARCHAR(50),
  blocks VARCHAR(50),
  points VARCHAR(50),
  teamID int,
  PRIMARY KEY(id),
  FOREIGN KEY (teamID) REFERENCES teams (id)

);