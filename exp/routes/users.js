var express = require('express');
var router = express.Router();


let CREDS1 = require('../../cred2');// load IPASS
let rl = require('../../example/rl');// load IPASS
let CREDS = CREDS1.test; // アカウント切り替え

/* GET users listing. */
router.get('/exec', function(req, res, next) {
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
/* GET users listing. */
router.get('/', sessionCheck);

function sessionCheck(req, res, next) {
	if (req.session.userName) {
		res.render('index', { title: req.session.user.name});
	} else {
		res.redirect('/login');
	}
};

// router.get('/', function(req, res, next) {
//   res.render('users', { title: 'Users',CREDS: CREDS , CREDS1:CREDS1});
// });


router.get('/sjapan', function(req, res, next) {
  rl.run(CREDS1.sj);
  mes(res, 'sjapan');
});

router.get('/kuroko', function(req, res, next) {
  rl.run(CREDS1.kuroko);
  mes(res, 'kuroko');
});

router.get('/test', function(req, res, next) {
  var filename = rl.run(CREDS1.test);
  mes(res, CREDS1.test.username + 'のファイル名(日付時間)は ' + filename);
});

router.get("/removeSS", function(req, res, next) {
  const del = require("del");
  let list = "";
  del(["screenshots/*.png", "!screenshots/README.md"]).then(paths => {
    console.log("Deleted files and folders:\n", paths.join("\n"));
    list = paths.join("\n");
    mesRemove(res, list);
  });
});


function mes(res,user){
  res.send('<h3>連打禁止</h3><br>user: '+user+' の実行処理が走りました、<br> \
  うまく実行されたらFTPサーバーへCSVがダウンロードされています<br>\
   ブラウザを  閉じるかリンク先のスクリーンショットをご確認ください <a href=/screenshots/> screenShots へ</a>');
}
function mesRemove(res,filelist){
  res.send('<h3>連打禁止</h3> スクリーンショットフォルダのファイルを削除 <br>\
  <pre>'+filelist+'</pre><br>\
   の実行処理が走りました<br> \
  <br><a href=/> TOP へ </a>');
}
// router.get('/creds', function(req, res, next) {
//   console.log(CREDS1);
//   // res.send(CREDS);
// });

module.exports = router;
