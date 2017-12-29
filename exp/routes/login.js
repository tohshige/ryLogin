const express = require('express');
const $ = require('jquery');
const router = express.Router();

router.get('/', function(req, res, next) {
	res.render('login');
});

router.post('/', function(req, res, next) {
	if (req.body.userName ==='admin' && req.body.passWord ==='admin') {
		req.session.user = { name: req.body.userName };
		res.redirect('../');
	} else {
		const err = 'user or pass is wrong. | 間違っているようです';
		res.render('login', {title:'login', error: err });
	}
});


module.exports = router;