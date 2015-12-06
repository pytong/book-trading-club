"use strict";

(function(app) {
    app.controller("MainController", ["$scope", "UserService", "BookService", function($scope, UserService, BookService) {
        $scope.errorMessage = "";

        UserService.loginStatus().get(function(res) {
            $scope.isLoggedIn = res.status;
        });

        $scope.getBooks = function(params) {
            BookService.books()
                .get(params, function(res) {
                    if(res.status === false) {
                        $scope.errorMessage += (" " + res.result);
                    } else {
                        if(params.own === 1) {
                            $scope.mybooks = res.result;
                        } else {
                            $scope.books = res.result;
                        }
                    }
                });
        }

        $scope.addBook = function(searchTerms) {
            UserService.loginStatus().get(function(res) {
                if(res.status === false) {
                    window.location.href = "#/signin";
                } else {
                    BookService.books()
                        .save({searchTerms: searchTerms}, function(res) {
                            if(res.success === false) {
                                $scope.errorMessage = res.result;
                            } else {
                                $scope.render();
                            }
                            $(".searchterms").val("");
                        });
                }
            });
        }

        $scope.deleteBook = function(bookId) {
            BookService.books()
                .delete({id: bookId}, function(res) {
                    if(res.success === true) {
                        $scope.render();
                    } else {
                        $scope.errorMessage = "Failed to delete book. Please try again later."
                    }
                });
        }

        $scope.render = function() {
            $scope.getBooks({own: 1});
            $scope.getBooks({});
        }

        $scope.render();
    }]);
})(app);