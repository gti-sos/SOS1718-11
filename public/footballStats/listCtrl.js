/* global angular */
angular.module("StatsManagerApp").controller("ListFootballStatsCtrl", ["$scope","$http", function($scope,$http) {
    console.log("List Football Ctrl initialized!");
    var api ="/api/v2/football-stats";
    
    
    $scope.addFootballStat = function (){
        $http.post(api,$scope.newFootballStat).then(function (response){
            $scope.status="Status: "+ response.status;
            getFootballStats();
        });
    }
     $scope.deleteFootballStat = function (stadium,date){
         console.log("Football stat to be deleted" + stadium,date);
        $http.delete(api+"/"+stadium+"/"+date).then(function (response){
             $scope.status="Status: "+ response.status;
              getFootballStats();
        });
    }
    
    $scope.deleteAllFootballStats = function (){
         console.log("Football stats to be deleted all");
        $http.delete(api).then(function (response){
             $scope.status="Status: "+ response.status;
              getFootballStats();
        });
    }
    $scope.loadInitialFootballStats =function(){
        console.log("Load Initial Football Stats");
        $http.get(api+"/loadInitialData").then(function (response){
            getFootballStats();
        })
    }
    
    function getFootballStats(){
        $http.get(api).then(function (response){
            $scope.initialfootballstats = response.data;
        });
    }
    getFootballStats();
    
}]);