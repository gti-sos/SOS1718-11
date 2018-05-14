 /*global angular*/
 /*global Highcharts*/


 angular

     .module("StatsManagerApp")
     .controller("integrationGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";

         var api = "/api/v2/secure/baseball-stats";
         var apiEx1 = "https://sos1718-08.herokuapp.com/api/v1/divorces-an";
         var properties = "";




         Highcharts.chart('cors', {
             chart: {
                 type: 'pie',
                 options3d: {
                     enabled: true,
                     alpha: 45,
                     beta: 0
                 }
             },
             title: {
                 text: null
             },

             plotOptions: {
                 pie: {
                     allowPointSelect: true,
                     cursor: 'pointer',
                     depth: 35,
                     dataLabels: {
                         enabled: true,
                         format: '{point.name}'
                     }
                 }
             },
             series: [{
                 type: 'pie',
                 data: []
             }]
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

                             x.push(c["province"]);

                         });

                         console.log("----------------team------------------")

                         response1.data.map(function(v) {
                             b.push([v["province"],v["nullity"]]);
                         });

                        
                         console.log("----------------member------------------")

                      

                         response2.data.map(function(h) {
                             d.push([h["stadium"],parseInt(h["hit"])]);
                         });


                        
                         Highcharts.chart('cors', {
                             chart: {
                                 type: 'pie',
                                 options3d: {
                                     enabled: true,
                                     alpha: 45,
                                     beta: 0
                                 }
                             },
                             title: {
                                 text: null
                             },

                             plotOptions: {
                                 pie: {
                                     allowPointSelect: true,
                                     cursor: 'pointer',
                                     depth: 35,
                                     dataLabels: {
                                         enabled: true,
                                         format: '{point.name}'
                                     }
                                 }
                             },
                             series: [{
                                 type: 'pie',
                                 data: b.concat(d)
                             }]
                         });


                     });
                 });
         }
     }]);
 