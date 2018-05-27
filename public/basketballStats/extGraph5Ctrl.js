/* global google */
/* global Materialize */
/* global $ */

angular.module("StatsManagerApp").
controller("ExtGraph5Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

    console.log("External Graph 5 Controller initialized");

    if (!$rootScope.apikey) $rootScope.apikey = "scraping";

    var smoothie = new SmoothieChart({
        interpolation: 'linear',
        millisPerPixel: 100,
        maxValueScale:1.5,
        minValueScale:1.5,
        grid: {
            strokeStyle: 'rgb(125, 0, 0)',
            fillStyle: 'rgb(60, 0, 0)',
            lineWidth: 1,
            verticalSections: 6,
        },
    });

    smoothie.streamTo(document.getElementById("ext5"));

    var line1 = new TimeSeries();

    function f() {
        $http.get('https://api.openweathermap.org/data/2.5/forecast?APPID=5f4bc987a5010560ec7cd9e98e3dd6df&q=Texas').then(function(response) {
            console.log(response.data.list[0].main.temp);
            //line1.append(new Date().getTime(), parseFloat(response.data.list[0].main.temp) - 268.15);
            var a = response.data.list[0].main.temp - 268.15 + Math.random();
            console.log(a)
            line1.append(new Date().getTime(), a);
            console.log(line1);
        });
        smoothie.addTimeSeries(line1, { lineWidth: 2, strokeStyle: '#00ff00' });

    };

    // Add a random value to each line every second
    setInterval(f,2000)

    smoothie.streamTo(document.getElementById("ext5"), 2500);

}]);
