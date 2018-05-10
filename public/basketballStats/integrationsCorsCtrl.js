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
                        .get('https://sos171811als-sos171811als.c9users.io/api/v2/basketball-stats/cors')
                        .then(function(response) {

                            var univData = response.data;

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

                            univData.map(function(d) {
                                categories.push(d['headquar']);
                                data2.push(d['nameUniversity'].length);
                                data1.push("-");
                            })

                            console.log(categories);
                            console.log(data1);
                            console.log(data2);

                            // Set up the chart
                            var chart = new Highcharts.Chart({
                                chart: {
                                    renderTo: 'cors',
                                    type: 'column',
                                    options3d: {
                                        enabled: true,
                                        alpha: 15,
                                        beta: 15,
                                        depth: 50,
                                        viewDistance: 25
                                    }
                                },
                                title: {
                                    text: null
                                },
                                xAxis: {
                                    categories: categories
                                },
                                plotOptions: {
                                    column: {
                                        depth: 25
                                    }
                                },
                                series: [{
                                    name: 'Points',
                                    data: data1
                                }, {
                                    name: 'Characters at ["nameUniversity"]',
                                    data: data2
                                }]
                            });

                            function showValues() {
                                $('#alpha-value').html(chart.options.chart.options3d.alpha);
                                $('#beta-value').html(chart.options.chart.options3d.beta);
                                $('#depth-value').html(chart.options.chart.options3d.depth);
                            }

                            // Activate the sliders
                            $('#sliders input').on('input change', function() {
                                chart.options.chart.options3d[this.id] = parseFloat(this.value);
                                showValues();
                                chart.redraw(false);
                            });

                            showValues();
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
