const bodyParser = require('body-parser');

var ads_api = require("../controllers/ads_api");

module.exports = function(app, db) {

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.get('/ads/api/search', ads_api.ads_api_search );
    app.get('/ads/api/users', ads_api.ads_api_users );
    app.post('/ads/api/add', ads_api.ads_api_add );
    app.post('/ads/api/deleteimage', ads_api.ads_api_delete_image );
    app.post('/ads/api/delete', ads_api.ads_api_delete );
    app.post('/ads/api/deletepermanently', ads_api.ads_api_deletepermanently );
}