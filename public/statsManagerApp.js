/* global angular */
angular.module("StatsManagerApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
        }).when("/analytics", {
            templateUrl: "/analytics.html",
        })
        .when("/basketball-stats", {
            templateUrl: "/basketballStats/list.html",
            controller: "ListBasketballStatsCtrl"
        })
        .when("/basketball-stats/:stadium/:date", {
            templateUrl: "/basketballStats/edit.html",
            controller: "EditBasketballStatsCtrl"
        })
         .when("/basketball-stats-graph1", {
            templateUrl: "/basketballStats/graph1.html",
            controller: "Graph1Ctrl"
        })
        .when("/basketball-stats-graph2", {
            templateUrl: "/basketballStats/graph2.html",
            controller: "Graph2Ctrl"
        })
        .when("/basketball-stats-graph3", {
            templateUrl: "/basketballStats/graph3.html",
            controller : "Graph3Ctrl"
        })
        .when("/baseball-stats-graph1.html", {
            templateUrl: "/baseballStats/graph1.html",
            controller: "BaseballGraph1Ctrl"
        })
        .when("/baseball-stats-graph2.html", {
            templateUrl: "/baseballStats/graph2.html",
            controller: "BaseballGraph2Ctrl"
        })
        .when("/baseball-stats-graph3.html", {
            templateUrl: "/baseballStats/graph3.html",
            controller: "BaseballGraph3Ctrl"
        })
        .when("/baseball-stats", {
            templateUrl: "/baseballStats/list.html",
            controller: "ListBaseballStatsCtrl"
        })
        .when("/baseball-stats/:stadium/:date", {
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
        });
    console.log("App initialized and configured");
});
