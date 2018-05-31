/* global angular */
angular.module("StatsManagerApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html",
        }).when("/analytics", {
            templateUrl: "/analytics.html",
        }).when("/integrations", {
            templateUrl: "/integrations.html",
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
            controller: "BasketBallGraph3Ctrl"
        })
        .when("/basketball-stats-integrations-proxy", {
            templateUrl: "/basketballStats/integrationsProxy.html",
            controller: "IntegrationsProxyCtrl"
        })
        .when("/basketball-stats-integrations-cors1", {
            templateUrl: "/basketballStats/integrationsCors1.html",
            controller: "IntegrationsCors1Ctrl"
        })
        .when("/basketball-stats-integrations-cors2", {
            templateUrl: "/basketballStats/integrationsCors2.html",
            controller: "IntegrationsCors2Ctrl"
        })
        .when("/basketball-stats-integrations-cors3", {
            templateUrl: "/basketballStats/integrationsCors3.html",
            controller: "IntegrationsCors3Ctrl"
        })
        .when("/basketball-stats-extGraph1", {
            templateUrl: "/basketballStats/extGraph1.html",
            controller: "ExtGraph1Ctrl"
        })
        .when("/basketball-stats-extGraph2", {
            templateUrl: "/basketballStats/extGraph2.html",
            controller: "ExtGraph2Ctrl"
        })
        .when("/basketball-stats-extGraph3", {
            templateUrl: "/basketballStats/extGraph3.html",
            controller: "ExtGraph3Ctrl"
        })
        .when("/basketball-stats-extGraph4", {
            templateUrl: "/basketballStats/extGraph4.html",
            controller: "ExtGraph4Ctrl"
        })
        .when("/basketball-stats-extGraph5", {
            templateUrl: "/basketballStats/extGraph5.html",
            controller: "ExtGraph5Ctrl"
        })
        .when("/basketball-stats-extGraph6", {
            templateUrl: "/basketballStats/extGraph6.html",
            controller: "ExtGraph6Ctrl"
        })
        .when("/basketball-stats-socket", {
            templateUrl: "/basketballStats/socketGraph.html",
            controller: "SocketGraphCtrl"
        })
        .when("/baseball-stats", {
            templateUrl: "/baseballStats/list.html",
            controller: "ListBaseballStatsCtrl"
        })
        .when("/baseball-stats/:stadium/:date", {
            templateUrl: "/baseballStats/edit.html",
            controller: "EditBaseballStatsCtrl"
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
        .when("/baseball-stats-proxy", {
            templateUrl: "/baseballStats/integrationGraph1.html",
            controller: "integrationGraph1Ctrl"
        })
        .when("/baseball-stats-cors", {
            templateUrl: "/baseballStats/integrationGraphCors.html",
            controller: "integrationGraph2Ctrl"
        })
         .when("/baseball-stats-apiext", {
            templateUrl: "/baseballStats/apiext.html",
            controller: "BaseballApiExtCtrl"
        })
         .when("/baseball-stats-apiext1", {
            templateUrl: "/baseballStats/apiext1.html",
            controller: "integrationGraph4Ctrl"
        })
        .when("/baseball-stats-apiext2", {
            templateUrl: "/baseballStats/apiext2.html",
            controller: "Baseballapiext2Ctrl"
        })
        .when("/baseball-stats-apiext04", {
            templateUrl: "/baseballStats/apiext04.html",
            controller: "integrationGraph3Ctrl"
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
        })
        .when("/football-stats-footballintegration1", {
            templateUrl: "footballStats/footballintegration1.html",
            controller: "FootballIntegrationCtrl"
        })
        .when("/football-stats-footballintegration2", {
            templateUrl: "footballStats/footballintegration2.html",
            controller: "FootballIntegration2Ctrl"
        })
        .when("/football-stats-footballintegration3", {
            templateUrl: "footballStats/footballintegration3.html",
            controller: "FootballIntegration3Ctrl"
        })
        .when("/football-stats-footballintegration4", {
            templateUrl: "footballStats/footballintegration4.html",
            controller: "FootballIntegration4Ctrl"
        })
        .when("/football-stats-footballintegration5", {
            templateUrl: "footballStats/footballintegration5.html",
            controller: "FootballIntegration5Ctrl"
        })
        .when("/football-stats-footballintegration6", {
            templateUrl: "footballStats/footballintegration6.html",
            controller: "FootballIntegration6Ctrl"
        })
        .when("/football-stats-footballintegration7", {
            templateUrl: "footballStats/footballintegration7.html",
            controller: "FootballIntegration7Ctrl"
        });
    console.log("App initialized and configured");
});
