/* global angular */
angular.module("StatsManagerApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
        })
        .when("/basketball-stats", {
            templateUrl: "/basketballStats/list.html",
            controller:"ListBasketballStatsCtrl"
        })
        .when("/basketball-stats/:stadium/:date", {
            templateUrl: "/basketballStats/edit.html",
            controller:"EditBasketballStatsCtrl"
        });
        console.log("App initialized and configured");
});