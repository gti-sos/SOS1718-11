 /*global angular*/
 /*global google*/


 angular

  .module("StatsManagerApp")
  .controller("BaseballGraph2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

   if (!$rootScope.apikey) $rootScope.apikey = "scraping";

   var api = "/api/v2/secure/baseball-stats";

   var properties = "";
   var dataCache = {};

   var stadium = {};
   var hit = {};
   var d1 = [
    ["City", "Hits"]
   ];
   google.charts.load('current', {
    'packages': ['geochart'],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
   });
   google.charts.setOnLoadCallback(drawRegionsMap);

   function drawRegionsMap() {

    var data = google.visualization.arrayToDataTable(d1);

    var options = {
     region: 'US',
     displayMode: 'markers',
     colorAxis: { colors: ['orange', 'blue'] },
     backgroundColor: '#F5F1F0',
     datalessRegionColor: 'black'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

    chart.draw(data, options);
   }


   $scope.searchGraph2 = function() {
    properties = "";

    try {

     if ($scope.searchGraph2.date) {
      properties = "&date=" + $scope.searchGraph2.date;
     }

    }
    catch (error) {
     console.log("Failed search");
    }



    $http
     .get(api + "?apikey=" + $rootScope.apikey + properties)
     .then(function(response) {

      dataCache = response.data;

      var d = [
       ["City", "Hits"]
      ];

      stadium = response.data.map(function(s) {
       console.log(s["stadium"]);


       return s["stadium"];

      });

      hit = response.data.map(function(h) {
       return parseInt(h["hit"]);
      });

      for (var i = 0; i < dataCache.length; i++) {

       d.push([stadium[i], hit[i]]);

      }

      google.charts.load('current', {
       'packages': ['geochart'],
       // Note: you will need to get a mapsApiKey for your project.
       // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
       'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {

       console.log(d);
       var data = google.visualization.arrayToDataTable(d);

       var options = {
        region: 'US',
        displayMode: 'markers',
        colorAxis: { colors: ['orange', 'blue'] },
        backgroundColor: '#F5F1F0',
        datalessRegionColor: 'black'
       };

       var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

       chart.draw(data, options);
      }
     });

   }

  }]);
 