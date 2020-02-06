var settings = require('./../settings.json');

const Sequelize = require('sequelize');

module.exports = function(app, db) {

    app.get('/sequelize', function (req, res){

        const sequelize = new Sequelize(settings.SQL_DATABASE, settings.SQL_USER, settings.SQL_PASSWORD, {
            host: settings.SQL_HOST,
            dialect: 'mysql'
        });

        sequelize
          .authenticate()
            .then(() => {
                res.json({"code" : 200, "message" : "Connection has been established successfully."});
                sequelize.close();
            })
            .catch(err => {
                res.json({"code" : 500, "message" : err});
            });
    });

    app.get('/sequelize_auto', function (req, res){

        var SequelizeAuto = require('sequelize-auto');
        var auto = new SequelizeAuto(settings.SQL_DATABASE, settings.SQL_USER, settings.SQL_PASSWORD);

        auto.run(function (err) {
            if (err) throw err;

            console.log(auto.tables); // table list
            console.log(auto.foreignKeys); // foreign key list

            res.json({"code" : 200, "message" : "Done"});
        });

    });
}