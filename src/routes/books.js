var express = require('express');
var bookRouter = express.Router();

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

bookRouter.route('/')
  .get(function (req, res) {
    res.render('books', {
      title: 'Hello from books',
      nav: [
        { link: '/books', text: 'Books' },
        { link: '/authors', text: 'Authors' }
      ],
      books: books
    });
  });

bookRouter.route('/:id')
  .get(function (req, res) {
    var id = req.params.id;
    console.log(id);
    res.render('book', {
      title: 'Hello from book',
      nav: [
        { link: '/books', text: 'Books' },
        { link: '/authors', text: 'Authors' }
      ],
      book: books[id]
    });
  });

module.exports = bookRouter;