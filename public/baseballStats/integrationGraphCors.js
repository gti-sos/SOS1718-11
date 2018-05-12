 /*global angular*/
 /*global Highcharts*/


 angular

     .module("StatsManagerApp")
     .controller("integrationGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";

         var api = "/api/v2/secure/baseball-stats";
         var apiEx1 = "https://sos1718-09.herokuapp.com/api/v2/open-source-contests";
         var properties = "";




         Highcharts.chart('container', {

             title: {
                 text: 'Integration Graph'
             },

             subtitle: {
                 text: ''
             },
            yAxis: {
                 title: {
                     text: 'City & Stadium'
                 }
             },
             yAxis: {
                 title: {
                     text: 'Hits & Members'
                 }
             },
             legend: {
                 layout: 'vertical',
                 align: 'right',
                 verticalAlign: 'middle'
             },

             plotOptions: {
                 series: {
                     label: {
                         connectorAllowed: false
                     },
                     pointStart: 2010
                 }
             },

             series: [],

             responsive: {
                 rules: [{
                     condition: {
                         maxWidth: 500
                     },
                     chartOptions: {
                         legend: {
                             layout: 'horizontal',
                             align: 'center',
                             verticalAlign: 'bottom'
                         }
                     }
                 }]
             }

         });


         $scope.searchGraph1 = function() {
             properties = "";

             try {

                 if ($scope.inputIntegGraph1.date) {
                     properties = "&date=" + $scope.inputIntegGraph1.date;
                 }

             }
             catch (error) {
                 console.log("Failed search");
             }



             $http
                 .get(api + "?apikey=" + $rootScope.apikey + properties)
                 .then(function(response2) {

                     $http.get(apiEx1).then(function(response1) {

                         var b = [];
                         var d = [];
                         var x = [];

                         response1.data.map(function(c) {

                             x.push(c["city"]);

                         });

                         console.log("----------------team------------------")

                         response1.data.map(function(v) {
                            b.push(v["team"].length);
                         });
                         
                        for(var i=0; i<b.length;i++){
                            d.push("-");
                        }
                        
                        console.log("----------------member------------------")

                        response2.data.map(function(s) {

                             x.push(s["stadium"]);

                         });

                        response2.data.map(function(h) {
                             d.push(parseInt(h["hit"]));
                         });


                         Highcharts.chart('container', {

                             title: {
                                 text: 'Integration Graph'
                             },

                             subtitle: {
                                 text: ''
                             },

                             yAxis: {
                                 title: {
                                     text: 'Hits & Members of team'
                                 }
                             },
                             xAxis: {
                                 categories: x,
                                 title: {
                                     text: 'Stadium & City'
                                 }
                             },
                             legend: {
                                 layout: 'vertical',
                                 align: 'right',
                                 verticalAlign: 'middle'
                             },
                             series: [{
                                 name: 'Hits',
                                 data: d
                             }, {
                                 name: 'Miembros equipo',
                                 data: b
                             }],

                             responsive: {
                                 rules: [{
                                     condition: {
                                         maxWidth: 500
                                     },
                                     chartOptions: {
                                         legend: {
                                             layout: 'horizontal',
                                             align: 'center',
                                             verticalAlign: 'bottom'
                                         }
                                     }
                                 }]
                             }

                         });
                     });

                 });
         }
     }]);
 