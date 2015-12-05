var app = angular.module("BookTradingClubApp", ["ngResource", "ngRoute", "720kb.tooltips"]);

app.config(function($locationProvider, $routeProvider) {

    $routeProvider
    .when("/", {
        controller: "MainController",
        templateUrl: "/views/main.html"
    })
    .when("/signin", {
        controller: "UserController",
        templateUrl: "/views/signin.html"
    })
    .when("/signup", {
        controller: "UserController",
        templateUrl: "/views/signup.html"
    })
    .when("/settings", {
        controller: "UserController",
        templateUrl: "/views/settings.html"
    })
    .otherwise({
       redirectTo: "/"
    });
});