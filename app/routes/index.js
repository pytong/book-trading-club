'use strict';

let path = process.cwd(),
	userUtil = require("../utils/userUtil"),
	bookUtil = require("../utils/bookUtil");


module.exports = function (app, passport) {

	app.use(function(req, res, next) {
		if(req.isAuthenticated()) {
			req.username = req.user.username ? req.user.username : req.user.twitter.username;
		}

		next();
	});

	app.get("/api/books", function(req, res) {
		bookUtil.getBooks(function(success, result) {
			res.json({success: success, result: result});
		});
	});

	app.post("/api/add_book", function(req, res) {
		if(!req.isAuthenticated()) {
			return res.json({success: false, message: "You are not authenticated."});
		}

		let searchTerms = req.query.searchTerms;
		bookUtil.addBook(searchTerms, req.username, function(success, result) {
			res.json({success: success, result: result});
		});
	});

	app.get('/api/users/profile', function(req, res) {
			if(req.isAuthenticated()) {
				res.json({success: true, profile: req.user});
			} else {
				res.json({success: false});
			}
		});

	app.get('/api/users/email_exists', function(req, res) {
		let username = req.query.username;
		userUtil.userExists({username: username}, function(result) {
			let success = result.success,
				exists = result.exists;

			if(success === true && exists === false) {
				res.json({exists: false});
			} else {
				res.json({exists: true});
			}
		});
	})

	app.get('/api/users/login_status', function(req, res) {
		let status = req.isAuthenticated();
		res.json({status: status});
	});

	app.get('/api/users/signin', passport.authenticate('local-signin'),
		function(req, res) {
			res.json({success: true});
		});

	app.post('/api/users/signup-submit', passport.authenticate('local-signup'),
		function(req, res) {
			res.json({success: true});
		});

	app.post('/api/users/logout', function (req, res) {
		req.logout();
		res.json({success: true});
	});

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/#/signin' }),
		function(req, res) {
			res.redirect('/#/account');
		});

	app.get("*", function (req, res) {
		res.sendFile(path + '/public/index.html');
	});

};
