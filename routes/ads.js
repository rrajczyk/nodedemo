const bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash-messages');

var ads = require("../controllers/ads");

module.exports = function(app, db) {

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(session({ 
        cookie: { maxAge: 60000 }, 
        secret: 'woot',
        resave: false, 
        saveUninitialized: false
    }));

    app.use(flash());

    app.get('/ads/search', ads.ads_search );
    app.get('/ads/add', ads.ads_add );
    app.post('/ads/add/submit', ads.ads_add_submit );
    app.get('/ads/delete', ads.ads_delete );
}