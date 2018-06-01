/* global angular */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("CommonGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Proxy Controller initialized");

        var api;

        var basketApi = "/api/v2/secure/basketball-stats";
        var baseballApi = "/api/v2/secure/baseball-stats";
        var footballApi = "/api/v2/secure/football-stats";

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";

        if ($scope.dataSet == undefined) {
            Materialize.toast('<i class="material-icons">error_outline</i> Select a DataSet!', 2500);

        }

        $scope.refresh = function() {

            if ($scope.dataSet == "Basketball Stats") {
                api = basketApi;
            }
            else if ($scope.dataSet == "Baseball Stats") {
                api = baseballApi;
            }
            else if ($scope.dataSet == "Football Stats") {
                api = footballApi;
            }


            $http
                .get(api + '?apikey=' + $rootScope.apikey)
                .then(function(response) {

                    var data = response.data;
                    var categories = [];
                    var data1 = [];
                    var label1;

                    if ($scope.dataSet == "Basketball Stats") {
                        label1 = 'Total points'
                        $scope.title = 'Basketball Total Points per Stadium'
                        data.map(function(d) {
                            categories.push(d['stadium']+' '+d['date']);
                            data1.push(d['first'] + d['second'] + d['third'] + d['fourth']);
                        })
                    }
                    else if ($scope.dataSet == "Baseball Stats") {
                        label1 = 'Total hits'
                        $scope.title = 'Baseball Total Hits per Stadium'
                        data.map(function(d) {
                            categories.push(d['stadium']+' '+d['date']);
                            data1.push(d['hit']);
                        })
                    }
                    else if ($scope.dataSet == "Football Stats") {
                        data.map(function(d) {
                            label1 = 'Total goals'
                            $scope.title = 'Football Total Goals per Stadium'
                            categories.push(d['stadium']+' '+d['date']);
                            data1.push(d['goal']);
                        })
                    }


                    console.log(categories);
                    console.log(data1);

                    Highcharts.chart('comun', {
                        chart: {
                            type: 'area',
                            backgroundColor: 'rgba(255, 255, 255, 0.0)'
                        },
                        title: {
                            text: null
                        },
                        xAxis: {
                            categories: categories
                        },
                        yAxis: {
                            title: {
                                text: label1
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: label1,
                            data: data1,
                            color: 'black'
                        }]
                    });


                });
        };

    }]);
