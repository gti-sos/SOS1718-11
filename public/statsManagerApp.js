/* global angular */
angular.module("StatsManagerApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
        })
     
        .when("/baseball-stats", {
        templateUrl: "/baseballStats/list.html",
        controller: "ListBaseballStatsCtrl"
        })
        .when("/baseball-stats/:stadium/:date", {
        templateUrl: "/baseballStats/edit.html",
        controller: "EditBaseballStatsCtrl"
        });
        console.log("App initialized and configured");
});