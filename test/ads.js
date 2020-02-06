var models = require("../models/index");
var id = 0;

describe('Ads', function() {
    describe('#addAd()', function() {
        it('should save add without error', function(done) {

            var days = 30;
            var dateCreated = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            var dateNow = new Date();
            var dateEnd = new Date(dateNow.setTime( dateNow.getTime() + days * 86400000 ));

            var param = {'title':'Test', 'description':'This is description', 'type_id':1, 'user_id':1, 'date_created':dateCreated, 'date_start':dateCreated, 'date_expired':dateEnd, 'address': 'Phoenix AZ', phone: '555-444-231',  price: 100, is_active: 0, deleted: 0};

            models.Ads.create(
                param
            ).then( ad => {
                id = ad.id;
                done();
            }).catch(function(error) {
                if (error) done(error);
            });
        });
    });
});

describe('Ads', function() {
    describe('#deletedAd()', function() {
        it('should update add without error', function(done) {

            var param = {is_active: 0, deleted: 1};
            var whereParam = {'id':id, 'user_id':1};

            models.Ads.update(
                param, {
                    where: whereParam 
            }).then(() => {
                done();
            }).catch(function(error) {
                if (error) done(error);
            });
        });
    });
});

describe('Ads', function() {
    describe('#deletedPermanentlyAd()', function() {
        it('should delete add without error', function(done) {

            var whereParam = {'id':id, 'user_id':1};

            models.Ads.destroy(
            {
               where: whereParam 
            }).then(() => {
                done();
            }).catch(function(error) {
                if (error) done(error);
            });
        });
    });
});