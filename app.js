var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', function(req, res){
    res.render('index');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.post('/contact', function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'email address',
            pass: 'password'
        }
    });

    var mailOptions = {
        from: 'Sujanth Development<dev.sujanth@gmail.com>',
        to: 'sujanth1987@gmail.com',
        subject: 'Contact Info from Website',
        text: 'You have a submission with foloowing details... Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
        html: '<p>You have a submission with following details... <ul><li>Name: '+ req.body.name +'</li><li>Email: '+ req.body.email +'</li><li>Message: '+ req.body.message +'</li></ul></p>'
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/');
        }
    });
});

app.listen(3000, function(){
    console.log('Server is running on port 3000...');
});