var express = require('express');
var waterfall = require('async-waterfall');
var async = require('async');
var multer = require('multer');

var models = require("../models/index");

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/ads");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("media");

exports.ads_api_search = function(req, res, next) {

    var param = req.query;
    var limitNum = (param.limit === undefined) ? 5 : parseInt(param.limit);
    var pageNum = (param.page === undefined) ? 1 : parseInt(param.page);
    var offsetNum = limitNum * (pageNum - 1);

    models.Ads.findAndCountAll({
        where: {
            is_active: 1,
            deleted: 0 },
        offset: offsetNum,
        limit: limitNum
    }).then(ads => {
        res.json({"code" : 200, "result" : ads});
    });
}

exports.ads_api_users = function(req, res, next) {

    var param = req.query;
    var offsetNum = (param.offset === undefined) ? 0 : parseInt(param.offset);
    var limitNum = (param.limit === undefined) ? 5 : parseInt(param.limit);

    models.Ads.findAndCountAll({
        where: {
            user_id: param.userId,
            is_active: 1,
            deleted: 0
        },
        offset: offsetNum,
        limit: limitNum
    }).then(ads => {
        res.json({"code" : 200, "result" : ads});
    });
}

exports.ads_api_add = function(req, res) {

    upload(req, res, function (err) {
        if (err) {
            return res.json({"code" : 500, "message" : "Upload Error"});
        }

        var param = req.body;

        async.waterfall(
        [
            function(callback) {
                var is_active = 1;
                var deleted = 0;
                var dateCreated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

                var dateNow = new Date();
                var days = param.days;
                var dateEnd = new Date(dateNow.setTime( dateNow.getTime() + days * 86400000 ));

                models.Ads.create({
                    title: param.title, description: param.description, type_id:  param.typeId, user_id:  param.userId, date_created: dateCreated, date_start: dateCreated, date_expired: dateEnd, address: param.address, phone: param.phone,  price: param.price , lat: param.lat, lon: param.lon, is_active: is_active, deleted: deleted
                }).then( ad => {
                    callback(err, ad.id);
                });
            },
            function(resultAds, callback) {

                var files = res.req.files;

                for (var i = 0; i < files.length; i++) {

                    var data = req.body;
                    data.imageName = '';
                    data.mimeType = '';
                    data.imageUrl = '';

                    var file = files[i];
                    if (file) {

                        var imageUrl = 'ads/' + file.filename;
                        var orderliness = 0;
                        var dateCreated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

                        models.Uploads.create({
                            name: file.originalname, mime: file.mimetype, date_updated: dateCreated, file_name: imageUrl, orderliness: orderliness
                        }).then( upload => {

                            models.Ads.update({ upload_id: upload.id, file_name: imageUrl }, {
                                where:{
                                    id:resultAds
                            }});
                        });
                    }
                }

                callback(0, []);
            }
        ],
        function (err, result) {
            if(err){
                res.json({"code" : 500, "message" : "Error"});
            } else {
                res.json({"code" : 200, "message" : "Ad added"});
            }
        });
    });
}

exports.ads_api_delete_image = function(req, res, next) {
    var param = req.body;

    models.Ads.update({ upload_id: null,  file_name: null }, {
        where:{
            id:param.id,
            user_id:param.userId }
    }).then(() => {
        res.json({"code" : 200, "message" : "Done"});
    });
}

exports.ads_api_delete = function(req, res, next) {
    var param = req.body;

    var is_active = 0;
    var deleted = 1;

    models.Ads.update({ is_active: is_active,  deleted: deleted }, {
        where:{
            id:param.id,
            user_id:param.userId }
    }).then(() => {
        res.json({"code" : 200, "message" : "Done"});
    });
}

exports.ads_api_deletepermanently = function(req, res, next) {
    var param = req.body;

    models.Ads.destroy({
        where:{
            id:param.id,
            user_id:param.userId }
    }).then(() => {
        res.json({"code" : 200, "message" : "Done"});
    });
}