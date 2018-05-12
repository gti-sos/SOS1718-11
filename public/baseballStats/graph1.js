 /*global angular*/
 /*global Highcharts*/


 angular

     .module("StatsManagerApp")
     .controller("BaseballGraph1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";

         var api = "/api/v2/secure/baseball-stats";
         var properties = "";
         var dataCache = {};

         var stadium = {};
         var hit = {};






         // Apply the theme
         Highcharts.setOptions(Highcharts.theme);


         Highcharts.chart('container', {
             colorAxis: {
                 minColor: '#F5F1F0',
                 maxColor: Highcharts.getOptions().colors[0]
             },
             series: [{
                 type: 'treemap',
                 layoutAlgorithm: 'squarified',
                 data: []
             }],
             title: {
                 text: 'Hits '
             }

         });
         
         



         $scope.searchGraph1 = function() {
             properties = "";

             try {

                 if ($scope.searchGraph1.date) {
                     properties = "&date=" + $scope.searchGraph1.date;
                 }

             }
             catch (error) {
                 console.log("Failed search");
             }



             $http
                 .get(api + "?apikey=" + $rootScope.apikey + properties)
                 .then(function(response) {

                     dataCache = response.data;

                     var d = [];

                     stadium = response.data.map(function(s) {
                         console.log(s["stadium"]);


                         return s["stadium"];

                     });

                     hit = response.data.map(function(h) {
                         return parseInt(h["hit"]);
                     });

                     for (var i = 0; i < dataCache.length; i++) {

                         d.push({
                             name: stadium[i],
                             value: hit[i],
                             colorValue: parseInt(i)
                         });

                     }



                     console.log(d);



                     console.log(response.data);

                     Highcharts.chart('container', {
                         background2: '#F0F0EA',
                         colorAxis: {
                             minColor: '#FFFFFF',
                             maxColor: Highcharts.getOptions().colors[0]
                         },
                         series: [{
                             type: 'treemap',
                             layoutAlgorithm: 'squarified',
                             data: d
                         }],
                         title: {
                             text: 'Hits '
                         }
                     });

                     console.log(JSON.stringify(dataCache, null, 2));


                 });
         };


     }]);
 