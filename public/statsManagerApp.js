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
            controller: "BasketBallGraph1Ctrl"
        })
        .when("/basketball-stats-graph2", {
            templateUrl: "/basketballStats/graph2.html",
            controller: "BasketBallGraph2Ctrl"
        })
        .when("/basketball-stats-graph3", {
            templateUrl: "/basketballStats/graph3.html",
            controller : "BasketBallGraph3Ctrl"
        })
        .when("/basketball-stats-proxy1", {
            templateUrl: "/basketballStats/integrationsProxy1.html",
            controller : "integrationsProxy1Ctrl"
        })
        .when("/basketball-stats-cors", {
            templateUrl: "/basketballStats/integrationsCors.html",
            controller : "integrationsCorsCtrl"
        })
        .when("/baseball-stats-graph1", {
            templateUrl: "/baseballStats/graph1.html",
            controller: "BaseballGraph1Ctrl"
        })
        .when("/baseball-stats-graph2", {
            templateUrl: "/baseballStats/graph2.html",
            controller: "BaseballGraph2Ctrl"
        })
        .when("/baseball-stats-graph3", {
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
         })
         .when("/football-stats-footballchart", {
            templateUrl: "footballStats/highcharts.html",
            controller: "HighChartsCtrl"
        })
        .when("/football-stats-footballgeo", {
            templateUrl: "footballStats/geo.html",
            controller: "GeoCtrl"
        })
        .when("/football-stats-footballd3", {
            templateUrl: "footballStats/d3.html",
            controller: "D3Ctrl"
        });
    console.log("App initialized and configured");
});
