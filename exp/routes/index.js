var express = require('express')
var router = express.Router()

let CREDS1 = require('../../cred2')// load IPASS
let CREDS = CREDS1.test // アカウント切り替え
const tool = require('../myTools')
var MonthDay = tool.nowDateTime('MMDD')
console.log('yearDateTime:' + MonthDay)

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'ry Menu',CREDS: CREDS , CREDS1:CREDS1});
// });

/* GET home page. */
router.get('/', sessionCheck)

router.get('/logout', function (req, res, next) {
  // ログアウト
  delete req.session.user
  res.redirect('../')
})

router.get('/edit', function (req, res, next) {
  console.log(req.session.user)
  // if (req.session.user) {
  res.render('jsonEditor', {title: 'json Edit'})
  // } else {
  //   res.render('jsonEditor', { title: 'json Edit',CREDS: CREDS , CREDS1:CREDS1 ,req:req});
    // res.redirect('/login');
  // }
})

router.get('/y', function (req, res, next) {
  if (req.session.user) {
    res.render('yahooApi', {title: 'yahoo api test ', CREDS: CREDS, CREDS1: CREDS1, req: req})
  } else {
    res.render('yahooApi', {title: 'yahoo api test ', CREDS: CREDS, CREDS1: CREDS1, req: req})

    // res.redirect('/login');
  }
})

router.get('/y/:id', function (req, res, next) {
  console.log(req.params.id)
  var itemId = req.params.id
  // res.send(itemId);
  // next();
  res.render('yahooApi', {title: 'get yahoo api test', itemId: itemId, locals: {itemId: itemId}})
})

function sessionCheck (req, res, next) {
  if (req.session.user) {
    // res.render('index', { title: req.session.user.name});
    // for i, index in CREDS1
      // var  pass = i['password']
    for (var i in CREDS1) {
      var pass = 'xxxxxxxxxxx'
      // console.log(CREDS1[i]['password'].slice(-4,4));
      // console.log(CREDS1[i]['password']);
      if (CREDS1[i]['password']) {
        pass = CREDS1[i]['password']
        CREDS1[i]['date'] = pass.slice(-4)
      }
    }
    res.render('index', {title: 'ry Menu', CREDS: CREDS, CREDS1: CREDS1, req: req, MonthDay: MonthDay})
  } else {
    res.redirect('/login')
  }
}

module.exports = router
