const Sequelize = require('sequelize');

var settings = require('./../settings.json');

const sequelize = new Sequelize(settings.SQL_DATABASE, settings.SQL_USER, settings.SQL_PASSWORD, {
    host: settings.SQL_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

var ads = require("./ads");
var uploads = require("./uploads");

module.exports = {
    Ads: ads(sequelize, Sequelize.DataTypes),
    Uploads: uploads(sequelize, Sequelize.DataTypes),
}