"use strict";


let	configAuth = require('../config/auth'),
    books = require('google-books-search'),
	book_search_options = {
		key: configAuth.googleAuth.apiKey, // Your Google API key (Optional)
	    field: "title", // Search in a specified field (title, author, publisher, subject or isbn) (Optional)
	    offset: 0, // The position in the collection at which to start the list of results (Default: 0)
	    limit: 1, // The maximum number of results to return (Max 40) (Defult: 10)
	    type: "books", // Restrict results to books or magazines (Default: all)
	    order:"relevance", // Order results by relevance or newest (Default: relevance)
	    lang: "en" // Restrict results to a specified language (two-letter ISO-639-1 code) (Default: en)
	},
	Book = require('../models/books');

module.exports = {
    addBook: function(searchTerms, username, callback) {
        let errorMessage = "Failed to add book. Please try again later.";
        
		books.search(searchTerms, book_search_options, function(err, result) {
			if(err) { return callback(false, errorMessage); }
			if(result.length < 1) { return callback(false, "No book found."); }

            let bookFound = result[0],
            book = new Book();
            book.title = bookFound.title;
            book.authors = bookFound.authors;
            book.thumbnail = bookFound.thumbnail;
            book.username = username;

            book.save(function(err) {
                if(err) { return callback(false, errorMessage); }
                callback(true);
            });
		});
    },
    
    getBooks: function(callback) {
        Book.find({}, function(err, books) {
            if(err) { return callback(false, "Failed to get books. Please try again later."); }

            callback(true, books);
        });
    }

}