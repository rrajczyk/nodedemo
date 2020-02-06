var express = require('express');

var notifications = require("../controllers/notifications");

module.exports = function(app, db) {

     app.post('/notifications/firebasetyping', notifications.firebase_typing );
     app.post('/notifications/firebasemessage', notifications.firebase_message );
}