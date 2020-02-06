var express = require('express');
var waterfall = require('async-waterfall');
var async = require('async');
var multer = require('multer');

var models = require("../models/index");
const uploads = require("./../models/uploads");
const paginate = require('express-paginate');
var flash = require('express-flash-messages');

const app = express();
app.use(paginate.middleware(10, 50));

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/ads");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({ storage: Storage }).array("media");

exports.ads_search = function(req, res, next) {

    var param = req.query;
    var title = "Ads";

    var limitNum = (param.limit === undefined) ? 5 : parseInt(param.limit);
    var pageNum = (param.page === undefined) ? 1 : parseInt(param.page);
    var offsetNum = limitNum * (pageNum - 1);

    //express-paginate needs page param
    req.query.page = pageNum;

    models.Ads.findAndCountAll({
        where: {
            is_active: 1,
            deleted: 0 },
        order: [ [ 'id', 'DESC' ] ],
        offset: offsetNum,
        limit: limitNum
    }).then(ads => {
        const itemCount = ads.count;
        const pageCount = Math.ceil(ads.count / limitNum);
        res.render("ads/ads", {"ads" : ads.rows,
            pageCount,
            itemCount,
            pageNum,
            pages: paginate.getArrayPages(req)(3, pageCount, pageNum),
            title,
            paginate
        });
    });
}

exports.ads_add = function(req, res, next) {

    var title = "Add Ad";

    res.render("ads/ads_ad", {
        title
    });
}

exports.ads_add_submit = function(req, res) {

    upload(req, res, function (err) {
        if (err) {
            req.flash('error', 'Upload error.');
            res.redirect("/ads/add");
        }

        var param = req.body;

        async.waterfall(
        [
            function(callback) {
                var userId = 1;
                var is_active = 1;
                var deleted = 0;
                var dateCreated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                var dateNow = new Date();
                var days = param.days;
                var dateEnd = new Date(dateNow.setTime( dateNow.getTime() + days * 86400000 ));

                models.Ads.create({
                    title: param.title, description: param.description, type_id:  param.typeId, user_id: userId, date_created: dateCreated, date_start: dateCreated, date_expired: dateEnd, address: param.address, phone: param.phone,  price: param.price , lat: param.lat, lon: param.lon, is_active: is_active, deleted: deleted
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
                req.flash('error', 'Something went wrong.');
                res.redirect("/ads/add");
            } else {
                req.flash('notify', 'Ad added.');
                res.redirect("/ads/search");
            }
        });
    });
}

exports.ads_delete = function(req, res, next) {
    var param = req.query;

    var is_active = 0;
    var deleted = 1;
    var userId = (param.userId === undefined) ? 1 : param.userId ;
    
    models.Ads.update({ is_active: is_active,  deleted: deleted }, {
        where:{
            id:param.id,
            user_id:userId }
    }).then(() => {
        req.flash('notify', 'Ad removed.');
        res.redirect("/ads/search");
    })
    .catch(function(error) {
        req.flash('error', 'Something went wrong.');
        res.redirect("/ads/search");
    });
}