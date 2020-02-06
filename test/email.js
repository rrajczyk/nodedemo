var assert = require('assert');
var validator = require("email-validator");

describe('Email', function() {
    describe('#validateTrue()', function() {
        it('should return true when the value is validate', function() {
            var email = "validated@gmail.com";
            assert.equal(validator.validate(email), true);
        });
    });
});

describe('Email', function() {
    describe('#validateFalse()', function() {
        it('should return false when the value is not validate', function() {
            var email = "validatedgmail.com";
            assert.equal(validator.validate(email), false);
        });
    });
});