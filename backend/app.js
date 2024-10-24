var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var farmRouter = require('./routes/farm');
var CampGroundRouter = require('./routes/campGround');
var mongoose = require('mongoose');
var cors=require('cors');

mongoose.connect('mongodb://localhost:27017/FarmProductTest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/product', productRouter);
app.use('/farm', farmRouter);
app.use('/CampGround', CampGroundRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(session({
  secret: 'Goodtobcjkv jhzvxchj zxcahvxcu H HVJHCVSJCVJHCVHJ',
  resave: false,
  saveUninitialized: true,
  cookie:
  {
    httpOnly: true,
    secure: true
  }
}))

module.exports = app;