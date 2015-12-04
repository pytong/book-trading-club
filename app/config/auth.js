'use strict';

module.exports = {
	'twitterAuth': {
		'consumerKey': process.env.TWITTER_KEY,
		'consumerSecret': process.env.TWITTER_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
	},
    'googleAuth': {
        'apiKey': process.env.GOOGLE_API_KEY
    }
};
