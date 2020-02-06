var express = require('express');
var waterfall = require('async-waterfall');
var async = require('async');
var db = require('./../db');

const mysql_test = require('mysql');
const likes = require('./../model_no_orm/likes');

module.exports = function(app, db) {

    app.get('/likes/get', function (req, res){

        var param = req.query;

        likes.getLikes(param, function(err, result) {
             res.json({"code" : 200, "result" : result});
        });
    });

    app.get('/likes/count', function (req, res){

        var param = req.query;

        likes.countLikes(param, function(err, result) {
             res.json({"code" : 200, "result" : result});
        });
    });

    app.get('/likes/add', function (req, res){

        var param = req.query;

        likes.addLike(param, function(err, result) {
             res.json({"code" : 200, "result" : result});
        });
    });

    app.get('/likes/delete', function (req, res){

        var param = req.query;

        likes.deleteLike(param, function(err, result) {
             res.json({"code" : 200, "result" : result});
        });
    });

    app.post('/likes/flex', function (req, res){

        var param = req.body;

        async.waterfall(
            [
                function( callback) {
                    likes.countLikes(param, function(err, resultLikes) {
                        callback(err, resultLikes);
                    });
                },
                function(resultLikes, callback) {

                    if(resultLikes == 0){
                        likes.addLike(param, function(err, resultAdd) {
                            callback(err, 1);
                        });
                    } else {
                        likes.deleteLike(param, function(err, resultDelete) {
                            callback(err, 0);
                        });
                    }
                }
            ],
            function (err, insertedOrNot) {
                res.json({"code" : 200, "likeUp" : insertedOrNot});
            }
        );

    });
}