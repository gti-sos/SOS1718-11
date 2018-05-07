/*global angular*/
/*global google*/
angular.module("StatsManagerApp").controller("GeoCtrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    var api ="/api/v2/secure/football-stats";
     if(!$rootScope.apikey) $rootScope.apikey = "scraping";
    
    
    var datos = [["City", "Goals"]];
    $http.get(api + "?apikey=" + $rootScope.apikey).then(function (response){
      console.log(datos);
      
      
      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
          response.data.map(function(d) {
              datos.push([d['stadium'],d['goals']])
              
          })
          var data = google.visualization.arrayToDataTable(datos);
       /* var data = google.visualization.arrayToDataTable([
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 700]
        ]);*/

        var options = {
            region: 'ES',
            displayMode: 'markers',
            colorAxis: { colors: ['green', 'blue']}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }
    });
}]);