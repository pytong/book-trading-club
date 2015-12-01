"use strict";

let	books = require('google-books-search'),
	book_search_options = {
		key: process.env.GOOGLE_API_KEY, // Your Google API key (Optional)
	    field: "title", // Search in a specified field (title, author, publisher, subject or isbn) (Optional)
	    offset: 0, // The position in the collection at which to start the list of results (Default: 0)
	    limit: 1, // The maximum number of results to return (Max 40) (Defult: 10)
	    type: "books", // Restrict results to books or magazines (Default: all)
	    order:"relevance", // Order results by relevance or newest (Default: relevance)
	    lang: "en" // Restrict results to a specified language (two-letter ISO-639-1 code) (Default: en)
	};

module.exports = {
    search: function(searchTerms, callback) {
		books.search(searchTerms, book_search_options, function(err, result) {
			if(err) { return callback(false); }

			callback(true, result);
		});
    }
}