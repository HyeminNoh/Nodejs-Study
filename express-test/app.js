var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// express 패키지를 호출하여 app 변수 객체 생성
var app = express();

// 익스프레스 앱을 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 커스텀 미들웨어 만들어보기
app.use(function(req,res, next){
  console.log(req.url, '커스텀 미들웨어!');
  // 반드시 next를 호출해야 다음으로 넘어감
  //next();
});

// 미들웨어 연결
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app 객체를 모듈로 만들어 줌, 이것이 bin/www에서 사용된 app 모듈
module.exports = app;
