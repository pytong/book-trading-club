"use strict";

(function(app) {
    app.service("BookService", ["$resource", "$location", function($resource, $location) {
        let appUrl = $location.protocol() + "://" + $location.host();

        this.books = function(searchTerms) {
            return $resource(appUrl + "/api/books?searchTerms=:searchTerms", {searchTerms: "@searchTerms"});
        }

        this.mybooks = function() {
            return $resource(appUrl + "/api/mybooks");
        }
    }]);
})(app);