angular.module("StatsManagerApp").
controller("ExtGraph1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("External Graph 1 Controller initialized");



    $http.get("https://restcountries.eu/rest/v1/all").then(function(response) {

        var datos = [
            ['Country', 'Area']
        ]

        response.data.map(function(d) {
            datos.push([d['name'], d['area']])
        });

        google.charts.load('current', {
            'packages': ['controls', 'geochart']
        });
        google.charts.setOnLoadCallback(drawRegionsMap);


        function drawRegionsMap() {

            var data = google.visualization.arrayToDataTable(datos);

            var options = {
                region: '150',
                colorAxis: { colors: ['yellow', 'orange', 'red'] }
            };
            var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

            var country = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'selector',
                options: {
                    filterColumnIndex: 0,
                    ui: {
                        allowTyping: false,
                        allowMultiple: true,
                        allowNone: false
                    }
                }
            });
            var chart = new google.visualization.ChartWrapper({
                chartType: 'GeoChart',
                containerId: 'ext1',
                options: {
                    displayMode: 'regions',
                    colorAxis: { colors: ['yellow', 'orange', 'red'] },
                    backgroundColor: '#212529'
                }
            });
            dashboard.bind(country, chart);
            dashboard.draw(data, options);
        }

    });
}]);
