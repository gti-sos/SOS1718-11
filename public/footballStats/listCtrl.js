/* global angular */
angular.module("StatsManagerApp").controller("ListFootballStatsCtrl", ["$scope","$http", function($scope,$http) {
    console.log("List Football Ctrl initialized!");
    var api ="/api/v2/football-stats";
    
    
    $scope.addContact = function (){
        $http.post(api,$scope.newContact).then(function (response){
            $scope.status="Status: "+ response.status;
            getContacts();
        });
    }
     $scope.deleteContact = function (name){
         console.log("Contact to be deleted" + name);
        $http.delete(api+"/"+name).then(function (response){
             $scope.status="Status: "+ response.status;
             getContacts();
        });
    }
    function getContacts(){
        $http.get(api).then(function (response){
            $scope.contacts = response.data;
        });
    }
    getContacts();
    
}]);