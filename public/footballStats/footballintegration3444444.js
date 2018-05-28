 /*global angular*/
 /*global google*/
 /* global Materialize */
/* global $ */

angular.module("StatsManagerApp").controller("FootballIntegration3Ctrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    
       if(!$rootScope.apikey) $rootScope.apikey = "scraping";
       var api ="/api/v2/secure/football-stats";
         var dataPlace=[];
        var datoslola=[];
        var goals=[];
        var conjunto = [];
       
        
        
     /*   $http.get("https://sos1718-10.herokuapp.com/api/v1/buses/").then(function doneFilter(responsePrimary){
             $http.get(api + '?apikey=' + $rootScope.apikey).then(function doneFilter(responseGoal){
                 
                 
                 for (var i = 0; i < responsePrimary.data.length; i++) {
                    dataPlace.push(responsePrimary.data[i].comunity);
                    datoslola.push(parseInt(responsePrimary.data[i].occupation));
                    goals.push("");
                    conjunto.push(responsePrimary.data[i].comunity,datoslola[i],0);
                }
                
                 for (var i = 0; i < responseGoal.data.length; i++) {
                    dataPlace.push(responseGoal.data[i].stadium );
                    datoslola.push("");
                    goals.push(responseGoal.data[i].goal);
                     conjunto.push(responseGoal.data[i].stadium,0,responseGoal.data[i].goal);
                }


console.log(responsePrimary.data);*/
        $scope.refresh = function() {
            var filter = '';

            if ($scope.date == undefined) {
                Materialize.toast('<i class="material-icons">error_outline</i> Introduce a Date!', 2500);

            }
            else {
                filter = "&date=" + $scope.date;
            }

            $http
                .get(api + '?apikey=' + $rootScope.apikey + filter)
                .then(function(response) {

                    var footballData = response.data;

                    $http
                        .get('https://sos1718-10.herokuapp.com/api/v1/buses/')
                        .then(function(response) {

                            var univData = response.data;
                            
                            var data = [];
                            
                            footballData.map(function(d) {
                                data.push([d['stadium'],d['goal']]);
                            })

                            univData.map(function(d) {
                                data.push([d['community'],d['ocuppation']]);
                            })
                            console.log(data);

                         
                         


                        });

                });
        };

        $scope.refresh();

        $('#dateModal').modal({
            complete: function() {
                $scope.refresh();
            }
        });







    

}]);