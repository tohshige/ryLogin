var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var serveIndex = require('serve-index');

var basicAuth = require('basic-auth-connect');

var app = express();

// :view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
const CREDS1 = require('../cred2');// load IPASS

app.use(basicAuth(CREDS1.admin.name, CREDS1.admin.word));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);

//var port = '8080';
//var port = '3000';
//app.listen(port);

const tool = require('./myTools');
console.log(tool.nowDateTime());
var yearDateTime =tool.nowDateTime();
console.log('yearDateTime:' + yearDateTime);
console.log(tool.localIP());
var ipArray = tool.localIP();
console.log(ipArray.length);
console.log(ipArray[0].indexOf('192'));
// console.log(ipArray[1].indexOf('192'));
console.log(ipArray[0]);
console.log(ipArray[1]);

console.info('start http://localhost:3000');

app.use('/screenshots', express.static('./screenshots'), serveIndex('./screenshots', {'icons': true}))
app.use('/dest',  express.static('../dest'), serveIndex('../dest', {'icons': true}))
app.use('/dest2', express.static('/views'), serveIndex('/views', {'icons': true}))
app.use('/dest1', express.static('../example/screenshots'), serveIndex('../../ryLogin/example/screenshots', {'icons': true}))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
