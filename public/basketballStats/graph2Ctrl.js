/* global google */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("BasketBallGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Graph2 Controller initialized");

        var api = "/api/v2/secure/basketball-stats";

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";

        $scope.refresh = function() {

            if ($scope.date == undefined) Materialize.toast('<i class="material-icons">error_outline</i> Introduce a Date!', 2500);

            $http
                .get(api + "?apikey=" + $rootScope.apikey + "&date=" + $scope.date)
                .then(function(response) {
                    if (response.data.length == 0) Materialize.toast('<i class="material-icons">error_outline</i> No matches on this day!', 2500);

                    google.charts.load('current', {
                        'packages': ['geochart'],
                        // Note: you will need to get a mapsApiKey for your project.
                        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                    });
                    google.charts.setOnLoadCallback(drawMarkersMap);

                    var datos = [
                        ['City', 'Total Points']
                    ]
                    console.log(response.data);

                    response.data.map(function(d) {
                        var total = d['first'] + d['second'] + d['third'] + d['fourth']
                        datos.push([d['stadium'], total])
                    })

                    function drawMarkersMap() {
                        var data = google.visualization.arrayToDataTable(datos);

                        var options = {
                            region: 'US',
                            displayMode: 'markers',
                            colorAxis: { colors: ['yellow', 'red'] },
                            backgroundColor:'#212529'
                        };

                        var chart = new google.visualization.GeoChart(document.getElementById('graph2'));
                        chart.draw(data, options);
                    };
                });

        };

        $scope.refresh();
        
        $('#dateModal').modal({
            complete: function() {
                $scope.refresh();
            }
        });
    }]);
