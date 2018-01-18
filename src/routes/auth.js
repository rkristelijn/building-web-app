var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function (nav) {
  authRouter.route('/signup')
    .post(function (req, res) {
      var url = 'mongodb://127.0.0.1:27017/libraryApp';
      mongodb.connect(url, function (err, db) {
        var collection = db.collection('users');
        var user = {
          username: req.body.username,
          password: req.body.password
        };

        //todo: find user first before insert
        collection.insert(user, function (err, results) {
          req.login(results.ops[0], function () {
            res.redirect('/auth/profile');
          });
        });
      });
    });
  authRouter.route('/signin')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), function (req, res) {
      res.redirect('/auth/profile');
    });
  authRouter.route('/profile')
    .all(function (req, res, next) {
      if(!req.user) {
        res.redirect('/');
      }
      next();
    })
    .get(function (req, res) {
      res.json(req.user);
    });
  return authRouter;
};

module.exports = router;