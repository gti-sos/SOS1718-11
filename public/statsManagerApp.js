/* global angular */
angular.module("StatsManagerApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
        })
        .when("/basketball-stats", {
            templateUrl: "/basketballStats/list.html",
            controller: "ListBasketballStatsCtrl"
        })
        .when("/basketball-stats/:stadium/:date", {
            templateUrl: "/basketballStats/edit.html",
            controller: "EditBasketballStatsCtrl"
        })
        .when("/baseball-stats", {
            templateUrl: "/baseballStats/list.html",
            controller: "ListBaseballStatsCtrl"
        })
        .when("/baseball-stats/:stadium/:date", {
<<<<<<< HEAD
            templateUrl: "/baseballStats/edit.html",
            controller: "EditBaseballStatsCtrl"
=======
        templateUrl: "/baseballStats/edit.html",
        controller: "EditBaseballStatsCtrl"
        })
        .when("/football-stats", {
            templateUrl: "footballStats/list.html",
            controller: "ListFootballStatsCtrl"
        })
        .when("/football-stats/:stadium/:date", {
            templateUrl: "footballStats/edit.html",
            controller: "EditFootballStatsCtrl"
>>>>>>> 01d4fb3f57e06991dcfa64cae5d87508798087cb
        });
    console.log("App initialized and configured");
});
