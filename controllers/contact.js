var express = require('express');
var nodemailer = require('nodemailer');
var validator = require("email-validator");

var contact = require("../controllers/contact");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your@gmail.com',
        pass: 'yourpassword'
    }
});

exports.contact_form = function(req, res, next) {

    var title = "Contact Form";

    res.render("contact/contact_form", {
        title
    });
}

exports.contact_sendemail = function(req, res) {

    var param = req.body;

    if(param.title === undefined)
    {
        req.flash('error', 'Title is required.');
        res.redirect("/contact/form");
    }
    else if(param.message === undefined)
    {
        req.flash('error', 'Message is required.');
        res.redirect("/contact/form");
    }
    else if(param.phone === undefined)
    {
        req.flash('error', 'Phone is required.');
        res.redirect("/contact/form");
    }
    else if(param.email === undefined)
    {
        req.flash('error', 'Email is required.');
        res.redirect("/contact/form");
    }
    else if(validator.validate(param.email) == false)
    {
        req.flash('error', 'Email is not valid.');
        res.redirect("/contact/form");
    } else {

        var mailOptions = {
            from: 'nodedevmodedemo@gmail.com',
            to: 'info@nodedevmodedemo.pl',
            subject: 'New question - ' + param.title,
            html: '<br><br>NODE DEMO<br><br>' + param.message + '<br>Phone - ' + param.phone + '<br>'+ '<br>Email - ' + param.email + '<br>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) 
            {
                req.flash('error', 'Something went wrong.');
                res.redirect("/contact/form");
            } else {
                req.flash('notify', 'Message sent.');
                res.redirect("/");
            }
        });
    }
}