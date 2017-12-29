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

function sessionCheck(req, res, next) {
	if (req.session.user) {
		// res.render('index', { title: req.session.user.name});
    res.render('index', { title: 'ry Menu',CREDS: CREDS , CREDS1:CREDS1 ,req:req});
	} else {
		res.redirect('/login');
	}
};

module.exports = router;
