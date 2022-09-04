var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var {linkCreate, tokenExchange} = require('./routes/index');
var { getBalance, getTransactions, getAllTransactions } = require("./javascripts/transactions");
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });``

//Routes
app.get('/', (req,res)=>{
  res.send("Landing server Page")
})
app.get("/api/create_link_token", linkCreate);
app.get("/item/public_token/exchange/", tokenExchange);
app.get("/item/getBalance", getBalance);
app.get("/items/getTransactions", getTransactions);
app.get("/items/getAllTransactions", getAllTransactions);



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
