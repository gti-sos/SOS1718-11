/* global angular */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("IntegrationsCors2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Cors 2 Controller initialized");

        var api = "/api/v2/secure/basketball-stats";

        if ($scope.page == undefined) {
            Materialize.toast('<i class="material-icons">error_outline</i> Select a Page!', 2500);
        }

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";

        $scope.refresh = function() {

            var labels = [];
            var series1 = [];
            var series2 = [];


            $http
                .get(api + '?apikey=' + $rootScope.apikey + '&offset=' + (($scope.page-1)*5) + '&limit=5')
                .then(function(response) {

                    response.data.map(function(d) {
                        labels.push(d['stadium']);

                        series1.push(d['first'] + d['second'] + d['third'] + d['fourth']);

                    });

                    $http
                        .get('https://sos1718-08.herokuapp.com/api/v2/students-an' + '?offset=' + (($scope.page-1)*5) + '&limit=5')
                        .then(function(response) {

                            series2.push(null,null,null,null,null);
                            response.data.map(function(d) {
                                labels.push(d['province']);
                                series2.push(d['pophigheducation']);

                            });

                            var chart = new Chartist.Line('.ct-chart', {
                                labels: labels,
                                series: [
                                    series1,
                                    series2
                                ]
                            }, {
                                // Remove this configuration to see that chart rendered with cardinal spline interpolation
                                // Sometimes, on large jumps in data values, it's better to use simple smoothing.
                                lineSmooth: Chartist.Interpolation.simple({
                                    divisor: 2
                                }),
                                fullWidth: true,
                                chartPadding: {
                                    right: 20
                                },
                                low: 0
                            });

                        });


                });
        };


    }]);
