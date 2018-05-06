/* global angular */
/* global Materialize */
/* global $ */


angular.module("StatsManagerApp").controller("ListFootballStatsCtrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");


    if(!$rootScope.apikey) $rootScope.apikey = "scraping";

    var api ="/api/v2/secure/football-stats";


        $scope.search = {};
        $scope.searchAdd = {};

        $scope.data = {};
        var dataCache = {};
        $scope.currentPage = 1;
        $scope.maxPages = 1;
        $scope.pages = [];
        $scope.pagesLeft = [];
        $scope.pagesMid = [];
        $scope.pagesRight = [];

        var properties = "";

        var offset = 0;
        var limit = 10;



    $scope.nextPage = function() {
        console.log("offset antes+: " + $scope.currentPage);
        offset += limit;
        console.log("offset despues +: " + offset);
        $http
            .get(api + "?apikey=" + $rootScope.apikey + "&limit=10&offset=" + offset)
            .then(function(response) {
                properties = "&limit=10&offset=" + offset;

                $scope.currentPage++;
                $scope.getFootballStats();
            });
    };
   $scope.filterdelete= function (){
             $scope.searchStat.stadium="";
             $scope.getFootballStats();
         };

 $scope.previousPage = function() {

     console.log("offset antes-: " + limit);
     offset -= limit;

     console.log("offset despues-: " + offset);
     $http
         .get(api + "?apikey=" + $rootScope.apikey + "&limit=10&offset=" + offset)
         .then(function(response) {
             properties = "&limit=10&offset=" + offset;
             $scope.currentPage--;
             $scope.getFootballStats();

         });
 };





    $scope.addFootballStat = function (){
        $http.post(api + "?apikey=" + $rootScope.apikey,$scope.newFootballStat).then(function (response){
            $scope.status="Status: "+ response.status;
            Materialize.toast('<i class="material-icons">done</i> ' + $scope.newFootballStat.stadium + ' has been added succesfully!', 4000);
        $scope.getFootballStats();
            
        }, function(response){
          Materialize.toast('<i class="material-icons">error_outline</i> Error adding data!', 4000);
        }, function(response){
            switch(response.status){
                case 400:
                    Materialize.toast('<i class="material-icons">error_outline</i> Error adding data! not atributes', 4000);
                    break;
                 case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 4000);
                        break;
                case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 4000);
                        break;
                case 409:
                        Materialize.toast('<i class="material-icons">error_outline</i> Duplicated stat!', 2500);
                        break;
                default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error adding data!', 4000);
                        break;
            }
            $scope.status = "Status: " + response.status;
            console.log(JSON.stringify(response,null , 2));
            $scope.getFootballStats();
          });
    };

     $scope.deleteFootballStat = function (stadium,date){
         console.log("Football stat to be deleted" + stadium,date);
        $http.delete(api+"/"+stadium+"/"+date + "?apikey=" + $rootScope.apikey).then(function (response){
             $scope.status="Status: "+ response.status;
              Materialize.toast('<i class="material-icons">error_outline</i> Successful deletion!', 4000);
              //properties = "";
              
              $scope.refresh();
             }, function(response) {
                 Materialize.toast('<i class="material-icons">error_outline</i> Error deleting data!', 4000);

        });
        $scope.getFootballStats();
    };

    $scope.deleteAllFootballStats = function (){
         console.log("Football stats to be deleted all");
        $http.delete(api + "?apikey=" + $rootScope.apikey).then(function (response){
             $scope.status="Status: "+ response.status;
             $scope.getFootballStats();
              Materialize.toast('<i class="material-icons">error_outline</i> Successful all deletion!', 4000);
              $scope.maxPages = 1;
                 $scope.currentPage = 1;
                 properties = "";
                 $scope.refresh();
             }, function(response) {
                 Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);

        });
    };
    $scope.loadInitialFootballStats = function() {
        if($scope.initialfootballstats.length==0){
            $http.get(api +"/loadInitialData" + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.status = "Status: " + response.status;
                $scope.getFootballStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Initial stats added!', 2500);
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error adding stats!', 2500);
            });
            }else{
                Materialize.toast('<i class="material-icons">error_outline</i>  List must be empty to add initial data!', 2500);

            }
            //getFootballStats();
        };


     $scope.getFootballStats=function(){
      properties = "";


                try {
                  if ($scope.searchStat.stadium && $scope.searchStat.date) {
                      properties = "&stadium=" + $scope.searchStat.stadium + "&date=" + $scope.searchStat.date;
                  }
                    if ($scope.searchStat.stadium){
                        properties = "&stadium=" + $scope.searchStat.stadium;
                    }
                    if ($scope.searchStat.date){
                        properties = "&date=" + $scope.searchStat.date;
                      }

                }
                catch (error) {
                    console.log("Search suspended");
                }
                $http
                    .get(api + "/count" + "?apikey=" + $rootScope.apikey + properties)
                    .then(function(response) {

                        console.log(response.data);
                        $scope.maxPages =Math.ceil( parseInt(response.data) / limit);


                        dataCache = response.data;
                        console.log(JSON.stringify(dataCache, null, 2));
                       // $scope.refresh();

                $http.get(api + "?apikey=" + $rootScope.apikey +"&limit=" + limit + "&offset=" + offset + properties).then(function (response){
                    $scope.initialfootballstats = response.data;
                    dataCache=response.data;
                    
                    
                    console.log("dataCache= " +dataCache.length + "currentPage" + $scope.currentPage);
                    if(dataCache.length==0 && $scope.currentPage>1){
                        console.log("Entra en el bucle de sus muertos");
                        $scope.previousPage();
                    }
                    
                    $scope.refresh();

                  });
              });

            };



            $('#apikeyModal').modal({
                complete: function() {
                    console.log($rootScope.apikey)
                    console.log($scope.apikey)
                    $rootScope.apikey = $scope.apikey;
                    console.log($rootScope.apikey)

                    $scope.getFootballStats();
                    console.log("Api key changed!");
                }
            });

 $('#searchModal').modal({
            complete: function() {
                $scope.getFootballStats();
                $scope.refresh();

                Materialize.toast('<i class="material-icons">error_outline</i> Stats filtered!', 2500);
            }
        });

        $scope.refresh = function() {


                if ($scope.currentPage <= 0) $scope.currentPage = 1;
                if ($scope.currentPage > $scope.maxPages) $scope.currentPage = $scope.maxPages;


                $scope.initialfootballstats = dataCache;
                console.log("estamos en la pagina: " + $scope.currentPage);
                console.log("maximo de paginas: " + $scope.maxPages);

                };

                $scope.getFootballStats();

}]);
