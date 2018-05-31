 /*global angular*/
 /*global google*/
 /* global AmCharts */
/* global jQuery*/

angular.module("StatsManagerApp").controller("FootballIntegration4Ctrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    
       if(!$rootScope.apikey) $rootScope.apikey = "scraping";
       var api ="/api/v2/secure/football-stats";
        var conjunto = [];
        var golesTotales= 0.0;
        var adultosTotales= 0.0;
        var x=0;
        var TgolesAdultos= [];
        var Tadultos={};
       
       // var myJSON= {stadium:"",goal:0 ,transportedTraveler:0 };
        
    
            $http.get(api + '?apikey=' + $rootScope.apikey).then(function(response) {

                    var footballData = response.data;
                    console.log(footballData);
                    

                    $http.get('https://sos1718-02.herokuapp.com/api/v1/unemployments').then(function(response) {

                            var unemployementData = response.data;
                            
                            for (var i=0;i<footballData.length;i++){
                               golesTotales+= footballData[i].goal;
                                
                            }
                            for (var i=0;i<unemployementData.length;i++){
                               adultosTotales+= unemployementData[i].adult;
                                
                            }
                            
                            console.log("Numero total de goles" + golesTotales);
                            console.log("Numero total de adultos" + adultosTotales);
                        
                          //Aqui mete las graficas

                        var chart = AmCharts.makeChart( "chartdiv", {
                          "type": "pie",
                          "theme": "light",
                          "dataProvider": [ {
                            "title": "Goles Totales",
                            "value": golesTotales
                          }, {
                            "title": "Total Desempleo Adultos",
                            "value": adultosTotales
                          } ],
                          "titleField": "title",
                          "valueField": "value",
                          "labelRadius": 5,
                        
                          "radius": "42%",
                          "innerRadius": "60%",
                          "labelText": "[[title]]",
                          "export": {
                            "enabled": true
                          }
                        } );

                        });

      

      });

}]);