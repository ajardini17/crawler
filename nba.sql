DROP DATABASE if exists nba;
CREATE DATABASE nba;

USE nba;

CREATE TABLE teams(
  id int AUTO_INCREMENT,
  teamname varchar(50),
  location varchar(50),
  PRIMARY KEY (id)

);

CREATE TABLE players(
  id int AUTO_INCREMENT,
  playerName varchar(50),
  ppg TEXT,
  trb TEXT,
  assists TEXT,
  steals TEXT,
  blocks TEXT,
  teamID int,
  PRIMARY KEY(id),
  FOREIGN KEY (teamID) REFERENCES teams (id)

);