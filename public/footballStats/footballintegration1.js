/* global angular */
/* global Highcharts */
angular.module("StatsManagerApp").controller("FootballIntegrationCtrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    var api ="/api/v2/secure/football-stats";
    var apibalta="/proxyBalta";
    var datosunidos=[];
       if(!$rootScope.apikey) $rootScope.apikey = "scraping";
       var databalta=[];
 $http.get(apibalta).then(function (response){
      databalta=response.data;
      console.log(databalta);
      
    var data = [];
    $http.get(api + "?apikey=" + $rootScope.apikey).then(function (response){
      data=response.data;
      console.log(data);


/*for (var i=0; i<data.length;i++){
    for (var j=0;j<databalta.length;i++){
        if(data.stadium[i]==databalta.autCommunity[j]){
            datosunidos.push([data.stadium[i], parseInt(data.goal[i]),databalta.enrolledNumber[j]]);
        }else{
             datosunidos.push([data.stadium[i], parseInt(data.goal[i]),parseInt(0)]);

        }
    }
    
}*/
Highcharts.chart('container', {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Stacked bar chart'
  },
  xAxis: {
   categories: data.map(function(d) {return d.stadium})
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Total fruit consumption'
    }
  },
  legend: {
    reversed: true
  },
  plotOptions: {
    series: {
      stacking: 'normal'
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
});
}]);
      

