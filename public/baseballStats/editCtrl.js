 /*global angular*/
 angular
 .module("StatsManagerApp")
 .controller("EditBaseballStatsCtrl", ["$scope","$http", "$routeParams", function($scope, $http, $routeParams){
                
                var editURL="/api/v2/baseball-stats/" + $routeParams.stadium + "/" + $routeParams.date;
                console.log("initialized EditBaseballStatsCtrl");
                console.log(editURL);
                
                 $http.get(editURL).then(function (response){
                        $scope.updatedBaseballStat = response.data;
                 });
                 
                 
                 $scope.updateBaseballStat = function(){
                 $http.put(editURL, $scope.updatedBaseballStat).then(function (response){
                    $scope.status = "Status: " + response.status;
                     
                 });
                }
                 
                 
                
 }]);