var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
  {
    title: 'War and Peace',
    author: 'Lev Nikolayevich Tolstoy'
  },
  {
    title: 'Les Miserables',
    author: 'The other guy'
  }
];

var router = function (nav) {
  adminRouter.route('/addbooks')
    .get(function (req, res) {
      var url = 'mongodb://127.0.0.1:27017/libraryApp';
      mongodb.connect(url, function (err, db) {
        if(err) {
          console.error('DB connection error: ', err);
          console.log('DB:', db);
        }
        var collection = db.collection('books');
        collection.insertMany(books, function (err, results) {
          res.send(results);
          db.close();
        });
      });
    });
  return adminRouter;
};

module.exports = router;