var mysql = require('mysql');

var db;
var config;

function connectDatabase() {
    if (!db) {
        var settings = require('./settings.json');

        config = {
          host: settings.SQL_HOST,
          user: settings.SQL_USER,
          password: settings.SQL_PASSWORD,
          database: settings.SQL_DATABASE
        };

        db = mysql.createConnection( config );

        db.connect(function(err){
            if(err) {
                console.log(err);
            }
        });
    }
    return db;
}

module.exports = connectDatabase();