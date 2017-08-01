const cheerio = require('cheerio');
const axios = require('axios');
const promise = require('bluebird');
const db = require('./db.js');






const request = require('request');
var bball = "https://www.basketball-reference.com";
var fetchTeam = function(link){
  request(link, (err, resp, html) => {
    if(err) {
      console.log('whoops');
    } else {
      var $ = cheerio.load(html);
      var results = $(".full_table").find('a');
      for (var i = 0; i <= 116; i += 4) {
        //add team to teams database, grab id from it and pass id to fetchPlayers
        var teamObj = results[i]['attribs'];
        var title = teamObj.title.split(' ');
        var team, location;
        
    
        if(location.length === 3) {
          location = title[0] + ' ' + title[1];
          team = title[2];
        } else {
          team = location[0];
          team = title[1];
        }
        createTeam(location, team, (err, res) => {
          
          fetchPlayers(link + teamObj.href, res.id)
        });
        //fetchPlayers(results[i])
      }
      
    }
    
  })
};

//fetchTeam(bball);

var fetchPlayers = function(link, id){
  request(link, (err, resp, html) => {
    
  });
  
};

var fetchPlayerStats = function() {
  //post stats to db
}

const createTeam = (location, teamname, cb) => {
  db.query(`INSERT INTO teams (teamname, location) VALUES ("${teamname}", "${location}")`, (err, res) => {
    console.log(res.insertId,'result');
  })
};

createTeam('los ang55667eles','clappers');

const createPlayer = (player, id) => {  
  //player should be array with 6 params
  db.query(`INSERT INTO players VALUES (?, ?, ?, ?, ?, ?, id)`, player, (err, resp) => {
    
  })
};


