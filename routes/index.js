// routes/index.js

const adsRoutes = require('./ads');
const adsApiRoutes = require('./ads_api');
const notificationsRoutes = require('./notifications');
const contactRoutes = require('./contact');
const sequelizeRoutes = require('./sequelize');
const pagesRoutes = require('./pages');

module.exports = function(app, db) {
    adsRoutes(app, db);
    adsApiRoutes(app, db);
    notificationsRoutes(app, db);
    contactRoutes(app, db);
    sequelizeRoutes(app, db);
    pagesRoutes(app, db);
};