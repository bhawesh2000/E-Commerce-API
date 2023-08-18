var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const cartRouter = require('./routes/cartRouter');
const orderplaceRouter = require('./routes/orderplaceRouter');


const mongoose = require('mongoose');

const Products = require('./models/products');
const CartProducts = require('./models/cartProd')
const Users = require('./models/user')


const url = 'mongodb://localhost:27017/Ecommerce';
const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log('connectd correctly to server')
}, (err)=>{ console.log(err)});


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
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);
app.use('/order', orderplaceRouter);

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

module.exports = app;
