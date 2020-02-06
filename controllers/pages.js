var express = require('express');

var app = express();

exports.pages_home = function(req, res, next) {

    var title = "devmode Robert Rajczyk nodejs demo";

    res.render("pages/home", {
        title
    });
}

exports.pages_api = function(req, res, next) {

    var title = "JSON Api Calls";

    res.render("pages/api", {
        title
    });
}

exports.pages_web = function(req, res, next) {

    var title = "Website links";

    res.render("pages/web", {
        title
    });
}

exports.pages_firebase = function(req, res, next) {

    var title = "Firebase Notifications";

    res.render("pages/firebase", {
        title
    });
}