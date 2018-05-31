/* global angular */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("IntegrationsCors3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Cors 3 Controller initialized");

        var api = "/api/v2/secure/basketball-stats";

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";

        if ($scope.page == undefined) {
            Materialize.toast('<i class="material-icons">error_outline</i> Select a Page!', 2500);
        }

        $scope.refresh = function() {

            var series1 = [];
            var series2 = [];


            $http
                .get(api + '?apikey=' + $rootScope.apikey + '&offset=' + (($scope.page-1)*5) + '&limit=5')
                .then(function(response) {

                    response.data.map(function(d) {
                        series1.push([d['first'] + d['second'] + d['third'] + d['fourth'], d['stadium']]);
                    });

                    console.log(series1);
                    $http
                        .get('https://sos1718-08.herokuapp.com/api/v2/crimes-an' + '?offset=' + (($scope.page-1)*5) + '&limit=5')
                        .then(function(response) {

                            response.data.map(function(d) {
                                series2.push([d['onecrime'],d['province']]);
                            });
                            console.log(series2);

                            var chart = new EJSC.Chart("cors3", { show_legend: false, title: null });

                            chart.addSeries(new EJSC.DoughnutSeries(
                                new EJSC.ArrayDataHandler(series2), {

                                    opacity: 80, //default: 50
                                    doughnutOffset: .2, //default: .5
                                    position: "topRight", //default: "center"
                                    height: "50%", //default: "100%"
                                    width: "50%" //default: "100%"
                                }
                            ));
                            chart.addSeries(new EJSC.DoughnutSeries(
                                new EJSC.ArrayDataHandler(series1), {
                                    opacity: 100, //default: 50
                                    doughnutOffset: .7, //default: .5
                                    position: "bottomLeft", //default: "center"
                                    height: "70%", //default: "100%"
                                    width: "70%", //default: "100%"
                                    onAfterDataAvailable: function(chart, series) {
                                        chart.selectPoint(series.__points[0], true);
                                    }

                                }
                            ));

                        });


                });
        };


    }]);
