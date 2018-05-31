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
       
        
        
  $scope.data1={};
  var dataCache1 = {};
  

            $http
                .get(api + '?apikey=' + $rootScope.apikey)
                .then(function(response) {

                    var footballData = response.data;
                    $scope.data1=dataCache1;

                    $http
                        .get('https://sos1718-10.herokuapp.com/api/v1/buses/')
                        .then(function(response) {

                            var univData = response.data;
                            
                            var data = ['community', 'goal/transportedTraveler'];
                            var goals= [];
                            var transport = [];
                            
                            footballData.map(function(d) {
                                data.push([d['stadium'],d['goal']]);
                                goals.push(d['goal']);
                            })

                            univData.map(function(d) {
                                data.push([d['community'],d['transportedTraveler']]);
                                 transport.push(d['transportedTraveler']/100);
                            })
                            console.log(data);

                         
                         
                    
                  



                        });

      

      });
}]);
