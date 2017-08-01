var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'nba'
});

db.connect(err => {
  if(err) {
    console.log('can\'t connect to db');
  } else {
    console.log('connected to db!');
  }
});



module.exports = db;
