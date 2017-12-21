var express = require('express');
var router = express.Router();


//let CREDS1 = require('../../ryLogin/example/cred2');// load IPASS
let CREDS1 = require('../cred2');// load IPASS
let CREDS = CREDS1.test; // アカウント切り替え

/* GET users listing. */
router.get('/', function(req, res, next) {
console.log(CREDS1);

  res.send('respond with a resource');
  res.send(CREDS);
//  res.send(CREDS + 'respond with a resource');
});

module.exports = router;
