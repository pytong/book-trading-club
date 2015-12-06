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

	app.route("/api/books")
		.get(function(req, res) {
			if(!req.isAuthenticated()) {
				return res.json({success: false, message: "You are not authenticated."});
			}

			let params = {};
			if(req.query.own === "1") {
				params.username = req.username;
			}

			bookUtil.getBooks(params, function(success, result) {
				res.json({success: success, result: result});
			});
		})
		.post(function(req, res) {
			if(!req.isAuthenticated()) {
				return res.json({success: false, message: "You are not authenticated."});
			}

			let searchTerms = req.query.searchTerms;
			bookUtil.addBook(searchTerms, req.username, function(success, result) {
				res.json({success: success, result: result});
			});
		})
		.delete(function(req, res) {
			if(!req.isAuthenticated()) {
				return res.json({success: false, message: "You are not authenticated."});
			}

			let id = req.query.id,
				params;

			if(!id) {
				return res.json({success: false, message: "No book id was provided."});
			}

			params = {_id: id, username: req.username};
			bookUtil.deleteBook(params, function(success) {
				res.json({success: success});
			});
		});

	app.route('/api/users/profile')
		.get(function(req, res) {
			if(req.isAuthenticated()) {
				res.json({success: true, profile: req.user});
			} else {
				res.json({success: false});
			}
		})
		.post(function(req, res) {
			if(!req.isAuthenticated()) {
				return res.json({success: false, message: "You are not authenticated."});
			}

			let params = req.query;
			params.username = req.username;

			userUtil.updateSettings(params, function(result) {
				res.json(result);
			});
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
