var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); // 生成日志
const session = require('express-session')
const RedisStore  = require('connect-redis')(session)
const redisClient = require('./db/redis')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express(); // 每次客户端访问生成一个实例

// view engine setup 视图引擎
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  app.use(logger('dev', {  
    stream: process.stdout
  }));
}else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

app.use(express.json()); // 将POST过来的JSON格式的数据，放到req.body中
app.use(express.urlencoded({ extended: false })); // 解析url格式的数据
app.use(cookieParser()); // 处理后 req.cookies就可以访问cookie
// app.use(express.static(path.join(__dirname, 'public'))); // 提供静态资源服务

const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'abc123_QWE!@#', // 密钥
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000 // 单位ms
  },
  store: sessionStore
}))
// 注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {}; // 如果是开发坏境就显示err

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
