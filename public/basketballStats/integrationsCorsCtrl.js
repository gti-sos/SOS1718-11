/* global angular */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("integrationsCorsCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Cors Controller initialized");

        var api = "/api/v2/secure/basketball-stats";

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";

        $scope.refresh = function() {
            var filter = '';

            if ($scope.date == undefined) {
                Materialize.toast('<i class="material-icons">error_outline</i> Introduce a Date!', 2500);

            }
            else {
                filter = "&date=" + $scope.date;
            }

            $http
                .get(api + '?apikey=' + $rootScope.apikey + filter)
                .then(function(response) {

                    var basketData = response.data;

                    $http
                        .get('https://sos1718-09.herokuapp.com/api/v1/secure/spanish-universities?apikey=sos1718-09')
                        .then(function(response) {

                            var univData = response.data;
                            
                            var data = [];
                            
                            basketData.map(function(d) {
                                data.push([d['stadium'],d['first']]);
                            })

                            univData.map(function(d) {
                                data.push([d['headquar'],d['nameUniversity'].length]);
                            })
                            console.log(data);

                            // Set up the chart
                            Highcharts.chart('cors', {
                                chart: {
                                    type: 'pie',
                                    options3d: {
                                        enabled: true,
                                        alpha: 45,
                                        beta: 0
                                    }
                                },
                                title: {
                                    text: null
                                },
                                tooltip: {
                                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        depth: 35,
                                        dataLabels: {
                                            enabled: true,
                                            format: '{point.name}'
                                        }
                                    }
                                },
                                series: [{
                                    type: 'pie',
                                    data: data
                                }]
                            });


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
