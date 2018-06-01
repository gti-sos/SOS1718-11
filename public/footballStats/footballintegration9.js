/*global angular*/

 angular.module("StatsManagerApp").controller("FootballIntegration9Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
     console.log("List Football Ctrl initialized!");

     if (!$rootScope.apikey) $rootScope.apikey = "scraping";
     var api = "/api/v2/secure/football-stats";
    
    var goals=['Goals'];
    var corners= ['Corner'];
    var salaried=['Salaried'];
 



     $http.get(api + '?apikey=' + $rootScope.apikey).then(function(response1) {

            


         $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(response) {
            
           for (var i=0; i<10;i++){
               goals.push(response1.data[i].goal);
               corners.push(response1.data[i].corner);
               salaried.push(response.data[i].totalsalaried);
               
               
           }

//--- Inicio Graficas
            

var chart = c3.generate({
    bindto: '#chart',
    data: {
        columns: [
           corners,
            goals
        ]
    }
});

setTimeout(function () {
    chart.load({
        columns: [
            goals
        ]
    });
}, 1000);

setTimeout(function () {
    chart.load({
        columns: [
            salaried
        ]
    });
}, 1500);

setTimeout(function () {
    chart.unload({
        ids: 'goal'
    });
}, 2000);





//Final Graficas
         });




     });

    

 }]);