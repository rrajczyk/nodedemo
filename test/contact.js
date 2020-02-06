var nodemailer = require('nodemailer');

describe('Contact', function() {
    describe('#sendEmail()', function() {
        it('should send test email add without error', function(done) {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your@gmail.com',
                    pass: 'yourpassword'
                }
            });

            var mailOptions = {
                from: 'nodedevmodedemo@gmail.com',
                to: 'info@nodedevmodedemo.pl',
                subject: 'New Title',
                html: '<br><br>NODE DEMO <br><br>MESSAGE<br>Phone - 444-333-222<br>Email - me@nodedevmodedemo.pl<br>'
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) 
                {
                    done(error);
                } else {
                    done();
                }
            });
        });
    });
});
