 /*global angular*/
 angular
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
 