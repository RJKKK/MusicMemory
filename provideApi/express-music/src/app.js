var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const multer = require("multer");
var logger = require('morgan');
var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
// var session = require('./config/session.js');
import {session} from './config/session.js'
import {adminRouter,userRouter} from './routers';

var app = express();
app.use(session);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(adminRouter);
app.use(userRouter)
// catch 404 and forward to error admin
app.use(function(req, res, next) {
  next(createError(404));
});

// error admin
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
