/* global angular*/
/* global Materialize */

angular
    .module("StatsManagerApp")
    .controller("EditBasketballStatsCtrl", ["$scope", "$http", "$routeParams", "$rootScope", function($scope, $http, $routeParams, $rootScope) {
        console.log("EditBasketballStatsCtrl initialized!");
        var api = "/api/v2/secure/basketball-stats";
        //var api="/api/v2/basketball-stats";

        function refresh() {
            $http.get(api + "/" + $routeParams.stadium + "/" + $routeParams.date + "?apikey=" + $rootScope.apikey).then(function(response) {
                console.log(response);
                $scope.updatedStat = response.data;
            });
        }



        $scope.updateStat = function() {
            var updatedStatAux = {};
            updatedStatAux.stadium = $scope.updatedStat.stadium;
            updatedStatAux.date = $scope.updatedStat.date;
            updatedStatAux.first = parseInt($scope.updatedStat.first);
            updatedStatAux.second = parseInt($scope.updatedStat.second);
            updatedStatAux.third = parseInt($scope.updatedStat.third);
            updatedStatAux.fourth = parseInt($scope.updatedStat.fourth);
            console.log($cope.updatedStat);

            $http.put(api + "/" + updatedStatAux.stadium + "/" + updatedStatAux.date + "?apikey=" + $rootScope.apikey, updatedStatAux).then(function(response) {
                $scope.status = "Status: " + response.status;
            }, function(response) {
                switch (response.status) {
                    case 400:
                        Materialize.toast('<i class="material-icons">error_outline</i> Make sure to set all atributes!', 2500);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 2500);
                        break;
                }

            });
        };
        refresh();
    }]);
