/*global angular*/
/*global google*/
angular.module("StatsManagerApp").controller("GeoCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("List Football Ctrl initialized!");
    var api = "/api/v2/secure/football-stats";
    if (!$rootScope.apikey) $rootScope.apikey = "scraping";

    //var goals = {};
    var datos = [
        ["City", "Goals"]
    ];
    $http.get(api + "?apikey=" + $rootScope.apikey).then(function(response) {
        console.log(datos);

        var stadium = response.data.map(function(d) {

            return d['stadium'];

        });
        var goal = response.data.map(function(d) {

                

            return d['goal'];

        });
        
        
        
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        for (var i = 0; i < response.data.length; i++) {
            datos.push([stadium[i], parseInt(goal[i])]);
        }

        function drawRegionsMap() {
           

           
            var data = google.visualization.arrayToDataTable(datos);
            /* var data = google.visualization.arrayToDataTable([
               ['Country', 'Popularity'],
               ['Germany', 200],
               ['United States', 300],
               ['Brazil', 400],
               ['Canada', 500],
               ['France', 600],
               ['RU', 700]
             ]);*/

            var options = {
                region: 'ES',
                displayMode: 'markers',
                colorAxis: { colors: ['green', 'blue'] }
            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    });
}]);
