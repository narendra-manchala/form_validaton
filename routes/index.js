var express = require('express');
var router = express.Router();
//var Response = require('../common/response');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useMongoClient: true, promiseLibrary: global.Promise });
var User = mongoose.model('Users', { email: String, password: String});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ title: 'Express' });
});
router.get('/signedup', function(req, res){
    var email = req.query.email;
    var pwd = req.query.password;

    var newUser = new User({ email: email, password: pwd});
    newUser.save(function (err) {
        if (err) {
            console.log(err);
            res.json( { error: err });

        } else {
            res.render("signedup");
            //console.log('new user');
        }
    });

});

router.get('/welcome', function(req, res){
  var email = req.query.email;
  var pwd = req.query.password;

    User.findOne({email: email, password: pwd},'email password', function(err, user){
        if(err) return handleError(err);

        if(!user){
            res.redirect('/');
        }else{
            req.session.user = user;
            Response.successResponse('User loggedin successfully!',res,user);
            //res.render('welcome');
        }
    });

    // Users.findOne({$and:[{email: email}, {password: pwd}]}).exec(function(err, user){
    //     if(user){
    //         res.render('welcome');
    //     }else{
    //         res.redirect('/');
    //     }
    // })

});

router.get('/dashboard', function(req, res) {
    if(!req.session.user){
        Response.unauthorizedRequest('You are not logged in',res);
    }else{
        Response.successResponse('Welcome to dashboard!',res,req.session.user);
    }

});


module.exports = router;
