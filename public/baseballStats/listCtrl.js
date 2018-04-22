 /*global angular*/
 angular

     .module("StatsManagerApp")
     .controller("ListBaseballStatsCtrl", ["$scope", "$http", function($scope, $http) {

         console.log("ListBaseballStatsCtrl initialized");
         var api = "/api/v2/baseball-stats";

         $scope.addBaseballStat = function() {
             $http.post(api, $scope.newBaseballStat).then(function(response) {
                 $scope.status = "Status: " + response.status;
                 console.log(JSON.stringify(response, null, 2));
                 getBaseballStats();

             });
         };

         $scope.deleteBaseballStat = function(date, stadium) {
             console.log("Stat to be deleted");
             $http.delete(api + "/" + stadium + "/" + date).then(function(response) {
                 $scope.status = "Status: " + response.status;
                getBaseballStats();

             });
         };

         $scope.deleteAllBaseballStat = function() {
             $http.delete(api).then(function(response) {
                getBaseballStats();
                $scope.status = "Status: " + response.status;
             });
         };

         $scope.loadInitialBaseballStat = function() {
             $http.get(api + "/loadInitialData").then(function(response) {
                 getBaseballStats();
             });
            
         };

         function getBaseballStats() {
             $http.get(api).then(function(response) {
                 $scope.initialbaseballstats = response.data;
                 console.log(response.data);

             });
         }

         getBaseballStats();

     }]);
 