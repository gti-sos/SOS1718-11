/* global angular */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("IntegrationsProxyCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Proxy Controller initialized");

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
                        .get('/api/v2/basketball-stats/proxy')
                        .then(function(response) {

                            var attackData = response.data;

                            var categories = [];
                            var data1 = [];
                            var data2 = [];

                            basketData.map(function(d) {
                                categories.push(d['stadium']);
                                data1.push(d['first']);
                            })

                            for (var i = 0; i < data1.length; i++) {
                                data2.push("-");
                            }

                            attackData.map(function(d) {
                                categories.push(d['city']);
                                data2.push(d['killed']);
                                data1.push("-");
                            })

                            console.log(categories);
                            console.log(data1);
                            console.log(data2);

                            Highcharts.chart('proxy1', {
                                chart: {
                                    type: 'area',
                                    backgroundColor:'rgba(255, 255, 255, 0.0)'
                                },
                                title: {
                                    text: null
                                },
                                xAxis: {
                                    categories: categories
                                },
                                credits: {
                                    enabled: false
                                },
                                series: [{
                                    name: 'Points',
                                    data: data1
                                }, {
                                    name: 'Kills',
                                    data: data2
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
