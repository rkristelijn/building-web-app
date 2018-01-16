var express = require('express');
var app = express();
var port = process.env.PORT || 4200;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

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

app.use('/books', bookRouter);

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello from render ejs',
    nav: [
      { link: '/books', text: 'Books' },
      { link: '/authors', text: 'Authors' }
    ]
  });
});

app.listen(port, function (err) {
  console.log('running server on port ' + port);
});
