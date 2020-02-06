var pages = require("../controllers/pages");

module.exports = function(app, db) {

     app.get('/', pages.pages_home );
     app.get('/pages/home', pages.pages_home );
     app.get('/pages/api', pages.pages_api );
     app.get('/pages/web', pages.pages_web );
     app.get('/pages/firebase', pages.pages_firebase );
}