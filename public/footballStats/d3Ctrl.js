/* global angular */
/*global AmCharts*/
/*global anychart*/


angular.module("StatsManagerApp").controller("D3Ctrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    var api ="/api/v2/secure/football-stats";
     if(!$rootScope.apikey) $rootScope.apikey = "scraping";
    
     var datos =[];
    $http.get(api + "?apikey=" + $rootScope.apikey).then(function (response){
      
       var stadium = response.data.map(function(d) {

            return d['stadium'];

        });
        var goal = response.data.map(function(d) {

                

            return d['goal'];

        });
         for (var i = 0; i < response.data.length; i++) {
            datos.push([stadium[i], parseInt(goal[i])]);
        }
        
        
      
     
anychart.onDocumentReady(function() {
  // create bar chart
  var chart = anychart.bar();

  // turn on chart animation
  chart.animation(true)
    // set chart title text settings
    .title('World\'s largest cities');

  chart.credits()
    .enabled(true)
    .url('https://en.wikipedia.org/wiki/List_of_cities_proper_by_population')
    .text('Data source: https://en.wikipedia.org/wiki/List_of_cities_proper_by_population')
    .logoSrc('https://en.wikipedia.org/static/favicon/wikipedia.ico');

  // create stick series with passed data
  chart.stick(getData());

  // set scale minimum
  chart.yScale().minimum(0).ticks().interval(5);
  // tooltips position and interactivity settings
  chart.tooltip()
    .positionMode('point')
    // set series tooltip settings
    .format(function() {
      return 'Goals: ' +
        anychart.format.number(this.value, {
          groupsSeparator: ' '
        }) 
    });

  chart.interactivity().hoverMode('by-x');
  // axes titles
  chart.yAxis().title('Population (millions)');
  // set container id for the chart
  chart.container('graphfootball');
  // initiate chart drawing
  chart.draw();
});

function getData() {
  return datos;
  
}    });
}]);