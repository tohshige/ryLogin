var express = require('express');
var router = express.Router();


let CREDS1 = require('../../cred2');// load IPASS
let rl = require('../../example/rl');// load IPASS
let CREDS = CREDS1.test; // アカウント切り替え

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(CREDS1);

  // const exec = require('child_process').exec;
  // exec('ls -la ./', (err, stdout, stderr) => {
  //   if (err) { console.log(err); }
  //   console.log(stdout);
  // });

  // exec('node ../example/rl kuroko', (err, stdout, stderr) => {
  //   if (err) { console.log(err); }
  //   console.log(stdout);
  // });
  res.send('連打禁止<br>実行処理が走りました、<br> \
  うまく実行されたらFTPサーバーへCSVがダウンロードされています<br>\
   ブラウザを  閉じるかリンク先のスクリーンショットをご確認ください <a href=/screenshots/> screenShots へ');
  // rl.run(CREDS1.test);
  // rl.run(CREDS1.sj);

});

// router.get('/sjapan', function(req, res, next) {
//   rl.run(CREDS1.sj);
//   res.send('respond with a resource');
// });

// router.get('/creds', function(req, res, next) {
//   console.log(CREDS1);
//   // res.send(CREDS);
// });

module.exports = router;
