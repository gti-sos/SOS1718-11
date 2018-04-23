/* global angular */
angular.module("StatsManagerApp").controller("EditFootballStatsCtrl", ["$scope","$http","$routeParams", function($scope,$http,$routeParams) {
    console.log("Edit Ctrl initialized!");// los console .log aparecen en la consola del frontent que es la del navegador
    var footballURL ="/api/v2/football-stats/"+$routeParams.stadium+"/"+$routeParams.date;
    
   
  
    $http.get(footballURL).then(function (response){
        $scope.updatedFootballStat = response.data;
        
       
        });
        
    $scope.updateFootballStat = function (){
          var updatedStatAux = {};
            updatedStatAux.stadium = $routeParams.stadium;
            updatedStatAux.date = $routeParams.date;
            updatedStatAux.goal = parseInt($scope.updatedFootballStat.goal);
            updatedStatAux.corner = parseInt($scope.updatedFootballStat.corner);
            updatedStatAux.fault = parseInt($scope.updatedFootballStat.fault);
            console.log($scope.updatedFootballStat);
        console.log("ee"+JSON.stringify($scope.updatedFootballStat,2,null));
        
      $http.put(footballURL,updatedStatAux).then(function (response){
          console.log("dentro"+$scope.updatedFootballStat);
          $scope.status="Status: "+ response.status;
          
    });
}
    
}]);