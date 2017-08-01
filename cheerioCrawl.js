const cheerio = require('cheerio');
const axios = require('axios');
const promise = require('bluebird');
const db = require('./db.js');
const followedStats = {
  'trb_per_g': 'rebounds',
  'ast_per_g': 'assists',
  'stl_per_g' : 'steals',
  'blk_per_g': 'blocks',
  'pts_per_g': 'points'
}

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
        var team;
        var location;
        
    
        if(title.length === 3) {
          location = title[0] + ' ' + title[1];
          team = title[2];
        } else {
          team = title[0];
          location = title[1];
        }
        createTeam(location, team, (id) => {
          fetchPlayers(link + teamObj.href, id);
        });
      }
      
    }
    
  })
};


var fetchPlayers = function(link, id){
  request(link, (err, resp, html) => {
    var $ = cheerio.load(html);
    var players = $("#roster").find('a');
    for(var i = 0; i < players.length; i++) {
      if (players[i].attribs.href.indexOf('/players/') > -1) {
        fetchPlayerStats(bball + players[i].attribs.href, id);
      }
    }
  });
  
};


var fetchPlayerStats = function(link, id) {
  //post stats to db
  request(link, (err, resp, html) => {
    var $ = cheerio.load(html);
    var stats = $('tfoot')[0].children[0].children;
    var fetchedStats = [$('h1')[0].children[0].data];
   
    for(var key in stats) {
      
      var statObj = stats[key].children;
      for(let stat in statObj) {
        let curStat = stats[key].attribs['data-stat'];
        if (followedStats.hasOwnProperty(curStat)) {
          fetchedStats.push(statObj[stat]['data']);
        }
      }    
    }
    createPlayer(fetchedStats, id);
  });
}

fetchTeam(bball);

const createTeam = (location, teamname, cb) => {
  db.query(`INSERT INTO teams (teamname, location) VALUES ("${teamname}", "${location}")`, (err, res) => {
    cb(res.insertId);
  })
};

const createPlayer = (player, id) => {  
  //player should be array with 6 params
  db.query(`INSERT INTO players (playerName, rebounds, assists, steals, blocks, points, teamID) VALUES (?, ?, ?, ?, ?, ?, "${id}")`, player, (err, resp) => {
    if (err) {
      console.log('cant add player');
    } 
  })
};
