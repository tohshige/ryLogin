var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', sessionCheck);

function sessionCheck(req, res, next) {
	if (req.session.userName) {
		res.render('index', { title: req.session.user.name});
	} else {
		res.redirect('/login');
	}
};

module.exports = router;
