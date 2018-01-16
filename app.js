var express = require('express');
var app = express();
var port = process.env.PORT || 4200;

var nav = [
  { link: '/books', text: 'Books' },
  { link: '/authors', text: 'Authors' }
];

var bookRouter = require('./src/routes/books')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello from render ejs',
  });
});

app.listen(port, function (err) {
  console.log('running server on port ' + port);
});
