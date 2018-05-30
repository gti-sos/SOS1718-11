 /*global angular*/
 /*global Highcharts*/


 angular

     .module("StatsManagerApp")
     .controller("integrationGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";

         var api = "/api/v2/secure/baseball-stats";
         var apiEx1 = "https://sos1718-08.herokuapp.com/api/v1/divorces-an";
         var properties = "";

 $scope.submit = function() {

         if ($scope.stadium != undefined) {
             properties = "&limit=1&stadium=" + $scope.stadium;
         }
         else {
             properties = "";
         }



         $http
             .get(api + "?apikey=" + $rootScope.apikey + properties)
             .then(function(response2) {

                 response2.data.map(function(l) {
                     $scope.hit = parseInt(l.hit);
                 });
                 response2.data.map(function(l) {
                     $scope.run = parseInt(l.run);
                 });


          var gaugeOptions = {

                             chart: {
                                 type: 'solidgauge'
                             },

                             title: null,

                             pane: {
                                 center: ['50%', '85%'],
                                 size: '120%',
                                 startAngle: -90,
                                 endAngle: 90,
                                 background: {
                                     backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'black',
                                     innerRadius: '60%',
                                     outerRadius: '100%',
                                     shape: 'arc'
                                 }
                             },

                             tooltip: {
                                 enabled: false
                             },

                             // the value axis
                             yAxis: {
                                 stops: [
                                     [0.1, '#55BF3B'], // green
                                     [0.5, '#DDDF0D'], // yellow
                                     [0.9, '#DF5353'] // red
                                 ],
                                 lineWidth: 0,
                                 minorTickInterval: null,
                                 tickAmount: 2,
                                 title: {
                                     y: -70
                                 },
                                 labels: {
                                     y: 30
                                 }
                             },

                             plotOptions: {
                                 solidgauge: {
                                     dataLabels: {
                                         y: 20,
                                         borderWidth: 0,
                                         useHTML: true
                                     }
                                 }
                             }
                         };

                         // The speed gauge
                         var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
                             yAxis: {
                                 min: 0,
                                 max: 50,
                                 title: {
                                     text: 'Hit'
                                 }
                             },

                             credits: {
                                 enabled: false
                             },

                             series: [{
                                 name: 'Hit',
                                 data: [$scope.hit],
                                 dataLabels: {
                                     format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                         ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">'+$scope.hit+'</span><br/>' +
                                         '<span style="font-size:12px;color:silver"></span></div>'
                                 },
                                 tooltip: {
                                     valueSuffix: ''
                                 }
                             }]

                         }));

                         // The RPM gauge
                         var chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
                             yAxis: {
                                 min: 0,
                                 max: 50,
                                 title: {
                                     text: 'Run'
                                 }
                             },

                             series: [{
                                 name: 'Run',
                                 data: [$scope.run],
                                 dataLabels: {
                                     format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                         ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">'+$scope.run+'</span><br/>' +
                                         '<span style="font-size:12px;color:silver"></span></div>'
                                 },
                                 tooltip: {
                                     valueSuffix: ''
                                 }
                             }]

                         }));

                 if ($scope.province != undefined) {

                     $http.get(apiEx1 + "?limit=1&province=" + $scope.province).then(function(response1) {



                         response1.data.map(function(l) {
                             $scope.nullity = parseInt(l.nullity);
                         });
                         response1.data.map(function(l) {
                             $scope.break = parseInt(l.break);
                         });

                         var gaugeOptions = {

                             chart: {
                                 type: 'solidgauge'
                             },

                             title: null,

                             pane: {
                                 center: ['50%', '85%'],
                                 size: '120%',
                                 startAngle: -90,
                                 endAngle: 90,
                                 background: {
                                     backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'black',
                                     innerRadius: '60%',
                                     outerRadius: '100%',
                                     shape: 'arc'
                                 }
                             },

                             tooltip: {
                                 enabled: false
                             },

                             // the value axis
                             yAxis: {
                                 stops: [
                                     [0.1, '#55BF3B'], // green
                                     [0.5, '#DDDF0D'], // yellow
                                     [0.9, '#DF5353'] // red
                                 ],
                                 lineWidth: 0,
                                 minorTickInterval: null,
                                 tickAmount: 2,
                                 title: {
                                     y: -70
                                 },
                                 labels: {
                                     y: 30
                                 }
                             },

                             plotOptions: {
                                 solidgauge: {
                                     dataLabels: {
                                         y: 20,
                                         borderWidth: 0,
                                         useHTML: true
                                     }
                                 }
                             }
                         };

                         // The speed gauge
                         var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
                             yAxis: {
                                 min: 0,
                                 max: 50,
                                 title: {
                                     text: 'Nullity'
                                 }
                             },

                             credits: {
                                 enabled: false
                             },

                             series: [{
                                 name: 'Nullity',
                                 data: [$scope.nullity],
                                 dataLabels: {
                                     format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                         ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">'+$scope.nullity+'</span><br/>' +
                                         '<span style="font-size:12px;color:silver"></span></div>'
                                 },
                                 tooltip: {
                                     valueSuffix: ''
                                 }
                             }]

                         }));

                         // The RPM gauge
                         var chartRpm = Highcharts.chart('container-rpm', Highcharts.merge(gaugeOptions, {
                             yAxis: {
                                 min: 0,
                                 max: 50,
                                 title: {
                                     text: 'Break'
                                 }
                             },

                             series: [{
                                 name: 'Break',
                                 data: [$scope.break],
                                 dataLabels: {
                                     format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                         ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">'+$scope.break+'</span><br/>' +
                                         '<span style="font-size:12px;color:silver"></span></div>'
                                 },
                                 tooltip: {
                                     valueSuffix: ''
                                 }
                             }]

                         }));

                     });
                 }
             });
           };
     }]);
 