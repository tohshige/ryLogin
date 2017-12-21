var express = require('express');
var router = express.Router();

let CREDS1 = require('../cred2');// load IPASS
let CREDS = CREDS1.test; // アカウント切り替え


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',CREDS: CREDS , CREDS1:CREDS1});
});

module.exports = router;
