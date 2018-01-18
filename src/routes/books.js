var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var router = function (nav) {
  bookRouter.use(function (req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  });
  bookRouter.route('/')
    .get(function (req, res) {
      var url = 'mongodb://127.0.0.1:27017/libraryApp';
      mongodb.connect(url, function (err, db) {
        var collection = db.collection('books');

        collection.find({}).toArray(
          function (err, results) {
            res.render('books', {
              title: 'Hello from book',
              nav: nav,
              books: results
            });
          }
        );
      });
    });

  bookRouter.route('/:id')
    .get(function (req, res) {
      var id = req.params.id;
      var url = 'mongodb://127.0.0.1:27017/libraryApp';
      mongodb.connect(url, function (err, db) {
        var collection = db.collection('books');
        collection.findOne({
          _id: ObjectID(id)
        }, function (err, results) {
          console.log(err, results);
          res.render('book', {
            title: 'Hello from book',
            nav: nav,
            book: results
          });
        }
        );
      });
    });

  return bookRouter;
};
module.exports = router;