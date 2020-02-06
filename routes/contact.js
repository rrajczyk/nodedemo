const bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('express-flash-messages');

var contact = require("../controllers/contact");

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

    app.get('/contact/form', contact.contact_form );
    app.post('/contact/sendemail', contact.contact_sendemail );
}