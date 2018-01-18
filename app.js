var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 4200;

var nav = [
  { link: '/books', text: 'Books' },
  { link: '/authors', text: 'Authors' }
];

var bookRouter = require('./src/routes/books')(nav);
var adminRouter = require('./src/routes/admin')(nav);
var authRouter = require('./src/routes/auth')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Hello from render ejs',
    nav: nav
  });
});

app.listen(port, function (err) {
  console.log('running server on port ' + port);
});
