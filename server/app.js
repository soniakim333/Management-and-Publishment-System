var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./Util/JWT');
const NewsRouter = require('./routes/admin/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter');
const webNewsRouter = require("./routes/web/NewsRouter")
const webProductRouter = require("./routes/web/ProductRouter")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//"webapi"--for the official website
app.use(webNewsRouter)
app.use(webProductRouter)

//verify token
app.use((req, res, next) => {
  if (req.url === "/adminapi/user/login") {
    next()
    return
  }

  const token = req.headers["authorization"].split(" ")[1]

  if (token) {
    let payload = JWT.verify(token)
    if (payload) {
      const newToken = JWT.generate({
        _id: payload._id,
        username: payload.username
      }, "1d")
      res.header("Authorization", token)
      next()
    } else {
      res.status(401).send({ errCode: "-1", erroeInfo: "token expired" })
    }
  }
})
//"adminapi"--for backend
app.use(UserRouter);
app.use(NewsRouter);
app.use(ProductRouter);



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

module.exports = app;
