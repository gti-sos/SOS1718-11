    angular.module("StatsManagerApp").
    controller("ExtGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
        console.log("External Graph 2 Controller initialized");



        $http.get("https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=1&apikey=0203eb34421281cfb0430aebe8f67e13&hash=a1e2db7309a16925bf2fefa747edb035&series=474").then(function(response) {


            var characters = response.data.data.results;

            console.log(response.data);

            console.log(characters);

            var datos = [
                ['Character', 'Comics', 'Series', 'ID', 'size']
            ]

            characters.map(function(d) {
                datos.push([d['name'], d['comics']['available'], d['series']['available'],(d['comics']['available']) + (d['series']['available']),  (d['comics']['available']) + (d['series']['available'])])
            });

            google.charts.load('current', {
                'packages': ['controls', 'corechart']
            });

            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var data = google.visualization.arrayToDataTable(datos);


                var options = {
                    title: null,
                    hAxis: { title: 'Comics' },
                    vAxis: { title: 'Series' },
                    bubble: { textStyle: { fontSize: 11 } },
                    backgroundColor: '#F5F1F0',
                    colorAxis: {colors: ['blue', 'black']}

                };

                var chart = new google.visualization.BubbleChart(document.getElementById('ext2'));
                chart.draw(data, options);


            }

        });
    }]);
    