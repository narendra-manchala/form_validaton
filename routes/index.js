var express = require('express');
var router = express.Router();

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
            console.log('new user');
        }
    });

});

router.get('/welcome', function(req, res){
  var email = req.query.email;
  var pwd = req.query.password;
  console.log(email, pwd);
  res.render('welcome');
});


module.exports = router;
