var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const mongooseAutoInc = require('mongoose-auto-increment');


mongoose.connect('mongodb://localhost:27017/treatment-records',{
  useFindAndModify : false,
  useNewUrlParser : true,
  useUnifiedTopology : true,
});

mongooseAutoInc.initialize(mongoose.connection);




var app = express();
app.use(cors({origin: true, credentials: true}));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var recordRouter = require('./routes/record');




app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');

app.use(session({
  key: 'sid', //세션의 키 값
  secret: 'secret', //세션의 비밀 키
  resave: false,  // 세션을 항상 저장할 지
  saveUninitialized: true, // 빈 값도 저장
  cookie: {
    maxAge: 1000*60*60*24// 쿠키 유효기간 24시간
  }
}));

app.use('/api', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/auth',authRouter);
app.use('/api/record',recordRouter);


// app.options('/api/record', (req, res) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers',
//       'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.send();
// });

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
  // res.render('error');
});

module.exports = app;
