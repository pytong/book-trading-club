"use strict";

(function(app) {
    app.service("BookService", ["$resource", "$location", function($resource, $location) {
        let appUrl = $location.protocol() + "://" + $location.host();

        this.books = function() {
            return $resource(appUrl + "/api/books?searchTerms=:searchTerms&id=:id&own=:own", {searchTerms: "@searchTerms", id: "@id", own: "@own"});
        }

    }]);
})(app);