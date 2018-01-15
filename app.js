var express = require('express');

var app = express();

var port = 4200;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.get('/books', function(res,res){
  res.send('Hello Books');
});

app.listen(port, function(err) {
  console.log('running server on port ' + port);
});
