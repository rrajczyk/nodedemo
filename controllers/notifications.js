var express = require('express');

var firebaseadmin = require("firebase-admin");

exports.firebase_typing = function(req, res, next) {
    var param = req.body;

    var payload = {
      data: {
        conversationId: param['conversationId'],
        typing: param['typing'],
        userId: param['userId'],
        deviceId: param['deviceId']
      }
    };

    var topic = 'conversation_' + param['conversationId'];

    const options = {
        content_available: true,
        mutable_content: true
    };

    firebaseadmin.messaging().sendToTopic(topic, payload, options)
    .then(function(response) {
        res.json({ "code" : 200, "message" : "Sent" });
    })
    .catch(function(error) {
        res.json({"code" : 500, "message" : "Error"});
    });
}

exports.firebase_message = function(req, res, next) {

    var param = req.body;

    var payload = {
      data: {
        conversationId: param['conversationId'],
        message: param['message'],
        userId: param['userId'],
        deviceId: param['deviceId']
      }
    };

    var topic = 'conversation_' + param['conversationId'];

    const options = {
        content_available: true,
        mutable_content: true
    };

    firebaseadmin.messaging().sendToTopic(topic, payload, options)
    .then(function(response) {
        res.json({ "code" : 200, "message" : "Sent" });
    })
    .catch(function(error) {
        res.json({"code" : 500, "message" : "Error"});
    });
}