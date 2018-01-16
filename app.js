var express = require('express');

var app = express();

var port = process.env.PORT || 4200;

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello from render ejs',
    list: ['a', 'b']
  });
});

app.get('/books', function (req, res) {
  res.send('Hello Books');
});

app.listen(port, function (err) {
  console.log('running server on port ' + port);
});
