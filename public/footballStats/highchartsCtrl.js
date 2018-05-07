/* global angular */
/* global Highcharts */
angular.module("StatsManagerApp").controller("HighChartsCtrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    var api ="/api/v2/secure/football-stats";
    
    if(!$rootScope.apikey) $rootScope.apikey = "scraping";
    
    
    var data = [];
    $http.get(api + "?apikey=" + $rootScope.apikey).then(function (response){
      data=response.data;
      console.log(data);
      
      
    
    Highcharts.chart('analytics', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Stacked column chart'
  },
  xAxis: {
    categories: data.map(function(d) {return d.stadium})
    
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total fruit consumption'
    },
    stackLabels: {
      enabled: true,
      style: {
        fontWeight: 'bold',
        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
      }
    }
  },
  legend: {
    align: 'right',
    x: -30,
    verticalAlign: 'top',
    y: 25,
    floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
    borderColor: '#CCC',
    borderWidth: 1,
    shadow: false
  },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      dataLabels: {
        enabled: true,
        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
      }
    }
  },
  series: [{
    name: 'Goal',
    data: data.map(function(d) {return d.goal})
  }, {
    name: 'Corner',
    data: data.map(function(d) {return d.corner})
  }, {
    name: 'fault',
    data: data.map(function(d) {return d.fault})
  }]
});
    
});
    
}]);

