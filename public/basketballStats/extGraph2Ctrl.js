    angular.module("StatsManagerApp").
    controller("ExtGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
        console.log("External Graph 2 Controller initialized");



        $http.get("https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=1&apikey=0203eb34421281cfb0430aebe8f67e13&hash=a1e2db7309a16925bf2fefa747edb035").then(function(response) {

            var datos = [
                ['Character', 'Comics']
            ]

            var characters = response.data.data.results;

            console.log(response.data);

            console.log(characters);

            characters.map(function(d) {
                datos.push([d['name'], d['comics']['available']])
            });
            
            google.charts.load('current', {
                'packages': ['controls', 'corechart']
            });

            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(datos);

                var character = new google.visualization.ControlWrapper({
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

                var dashboard = new google.visualization.Dashboard(
                    document.getElementById('dashboard'));

                var chart = new google.visualization.ChartWrapper({
                    chartType: 'PieChart',
                    containerId: 'ext2',
                    options: {
                        is3D: true,
                        height: 600,
                        legend: 'none',
                        chartArea: { 'left': 15, 'top': 15, 'right': 0, 'bottom': 0 },
                        pieSliceText: 'value'
                    }
                });

                dashboard.bind(character, chart);
                dashboard.draw(data);

            }

        });
    }]);
    