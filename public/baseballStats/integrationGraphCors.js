 /*global angular*/
 /*global Highcharts*/


 angular

     .module("StatsManagerApp")
     .controller("integrationGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";
         var api;
         var apiPro = "/api/v2/baseball-stats";
         var apiEx1 = "https://sos1718-08.herokuapp.com/api/v1/divorces-an";
         var properties = "";
         var d = [];
         var d1 = [];
         var t = '';
         var t1 = '';
         var s;
         var s1;


         $scope.submit = function() {

             if ($scope.stadium != undefined && $scope.stadium != "") {

                 properties = "?limit=1&stadium=" + $scope.stadium;
                 api = apiPro;

             }

             if ($scope.province != undefined && $scope.province != "") {

                 properties = "?limit=1&province=" + $scope.province;
                 api = apiEx1;

             }


             $http
                 .get(api + properties)
                 .then(function(response) {


                     if (api == apiPro) {

                         d.push(response.data.map(function(l) {
                             return parseInt(l.hit);
                         }));
                         d1.push(response.data.map(function(l) {
                             return parseInt(l.run);
                         }));


                         t = 'Hit';
                         t1 = 'Run';

                     }
                     if (api == apiEx1) {
                         for (var i = 0; i < 1; i++) {
                            response.data.map(function(l) {
                                 d.push(l.nullity);
                             });

                             response.data.map(function(l) {
                                 d1.push(parseInt(l.break));
                             });
                         }

                         t = 'Nullity';
                         t1 = 'Break';

                         console.log(d[0]);
                     }
                     var gaugeOptions = {

                         chart: {
                             type: 'solidgauge',
                             backgroundColor: '#F5F1F0'
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
                             max: 240,
                             title: {
                                 text: t
                             }
                         },

                         credits: {
                             enabled: false
                         },

                         series: [{
                             name: t,
                             data: [d[0]],
                             dataLabels: {
                                 format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                     ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + d[0] + '</span><br/>' +
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
                             max: 240,
                             title: {
                                 text: t1
                             }
                         },

                         series: [{
                             name: t1,
                             data: [d1[0]],
                             dataLabels: {
                                 format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                     ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + d1[0] + '</span><br/>' +
                                     '<span style="font-size:12px;color:silver"></span></div>'
                             },
                             tooltip: {
                                 valueSuffix: ''
                             }


                         }]



                     }));


                     api = "";
                     properties = "";
                     d = [];
                     d1 = [];
                 });
         };
     }]);
 