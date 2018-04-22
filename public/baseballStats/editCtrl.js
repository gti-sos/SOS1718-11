 /*global angular*/
 angular
<<<<<<< HEAD
 .module("StatsManagerApp")
 .controller("EditBaseballStatsCtrl", ["$scope","$http", "$routeParams", function($scope, $http, $routeParams){
                
                var editURL="/api/v2/baseball-stats/" + $routeParams.stadium + "/" + $routeParams.date;
                var api="/api/v2/baseball-stats/";
                console.log("initialized EditBaseballStatsCtrl");
                console.log(editURL);
                
                 $http.get(editURL).then(function (response){
                        $scope.updatedBaseballStat = response.data;
                 });
                 
                 
                 $scope.updateBaseballStat = function(){
                     console.log($scope.updatedBaseballStat);
                 $http.put(api+ $scope.updatedBaseballStat.stadium+"/"+$scope.updatedBaseballStat.date, $scope.updatedBaseballStat).then(function (response){
                    $scope.status = "Status: " + response.status;
                     
                 });
                 
             
                }
 }]);
 
=======
     .module("StatsManagerApp")
     .controller("EditBaseballStatsCtrl", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {

         var editURL = "/api/v2/baseball-stats/" + $routeParams.stadium + "/" + $routeParams.date;
         console.log("initialized EditBaseballStatsCtrl");
         console.log(editURL);

         function refresh() {
             $http.get(editURL).then(function(response) {

                 $scope.updatedBaseballStat = response.data;
                 console.log($scope.updatedBaseballStat);
             });
         }


         $scope.updateBaseballStat = function() {
             var updatedStatAux = {};
            updatedStatAux.stadium = $scope.updatedBaseballStat.stadium;
            updatedStatAux.date = $scope.updatedBaseballStat.date;
            updatedStatAux.hit = parseInt($scope.updatedBaseballStat.hit);
            updatedStatAux.run = parseInt($scope.updatedBaseballStat.run);
            updatedStatAux.error = parseInt($scope.updatedBaseballStat.error);
            console.log($scope.updatedStat);
             $http.put(editURL, updatedStatAux).then(function(response) {
                 $scope.status = "Status: " + response.status;

             });

         }
         refresh();
     }]);
>>>>>>> 5d9aa224830928533b8c85dce990a25ca61b0d96
 