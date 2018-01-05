var express = require('express');
var router = express.Router();

let CREDS1 = require('../../cred2');// load IPASS
let CREDS = CREDS1.test; // アカウント切り替え


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'ry Menu',CREDS: CREDS , CREDS1:CREDS1});
// });

/* GET home page. */
router.get('/', sessionCheck);

router.get('/logout', function(req, res, next) {
	// ログアウト                                                                                                    
	delete req.session.user;
	res.redirect('../');
});

router.get('/y', function (req, res, next) {
	if (req.session.user) {
    res.render('yahooApi', { title: 'yahoo api test ',CREDS: CREDS , CREDS1:CREDS1 ,req:req});
	} else {
    res.render('yahooApi', { title: 'yahoo api test ',CREDS: CREDS , CREDS1:CREDS1 ,req:req});

    // res.redirect('/login');
	}
});

router.get('/y/:id', function (req, res, next) {
  console.log(req.params.id);
  var itemId = req.params.id;
  res.render('yahooApi', { title: 'yahoo api test ',itemId:itemId});
});


function sessionCheck(req, res, next) {
	if (req.session.user) {
		// res.render('index', { title: req.session.user.name});
    res.render('index', { title: 'ry Menu',CREDS: CREDS , CREDS1:CREDS1 ,req:req});
	} else {
		res.redirect('/login');
	}
};

module.exports = router;
