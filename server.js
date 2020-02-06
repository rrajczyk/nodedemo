// server.js
const express = require('express');
const app = express();
const port = 9000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

require('./routes')(app, {});

app.listen(port, () => {
    console.log('We are live on ' + port);
});

/*
var firebaseadmin = require("firebase-admin");
var serviceAccount = require("./keys/YOUR_SECRET_JSON_KEY_CONFIG.json");

firebaseadmin.initializeApp({
   credential: firebaseadmin.credential.cert(serviceAccount),
   databaseURL: "https://yourlink.firebaseio.com"
});
*/

var cleanExit = function() { process.exit() };
process.on('SIGINT', cleanExit); // catch ctrl-c
process.on('SIGTERM', cleanExit); // catch kill