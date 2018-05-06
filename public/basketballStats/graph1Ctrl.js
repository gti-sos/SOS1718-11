/* global angular */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("Graph1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Graph1 Controller initialized");

        var api = "/api/v2/secure/basketball-stats";

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";

        $scope.refresh = function() {

            if ($scope.date == undefined) Materialize.toast('<i class="material-icons">error_outline</i> Introduce a Date!', 2500);


            $http
                .get(api + "?apikey=" + $rootScope.apikey + "&date=" + $scope.date)
                .then(function(response) {

                    if (response.data.length == 0) Materialize.toast('<i class="material-icons">error_outline</i> No matches on this day!', 2500);

                    Highcharts.chart('graph1', {
                        chart: {
                            type: 'bar',
                            height: 700,
                            backgroundColor: ('#212529')
                        },
                        title: {
                            text: null
                        },
                        xAxis: {
                            categories: response.data.map(function(d) {
                                return d['stadium'];
                            }),
                            title: {
                                text: 'Stadium',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Points',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -40,
                            y: 80,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                            shadow: true
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: '1Q',
                            color: 'yellow',
                            data: response.data.map(function(d) {
                                return parseInt(d['first']);
                            })
                        }, {
                            name: '2Q',
                            color: 'orange',
                            data: response.data.map(function(d) {
                                return parseInt(d['second']);
                            })
                        }, {
                            name: '3Q',
                            color: '#FE642E',
                            data: response.data.map(function(d) {
                                return parseInt(d['third']);
                            })
                        }, {
                            name: '4Q',
                            color: 'red',
                            data: response.data.map(function(d) {
                                return parseInt(d['fourth']);
                            })
                        }]
                    });

                });
        };

        $scope.refresh();

        $('#dateModal').modal({
            complete: function() {
                $scope.refresh();
            }
        });

    }]);
