 /*global angular*/
 /*global Materialize*/
 /*global $ */



 angular

     .module("StatsManagerApp")
     .controller("ListBaseballStatsCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         console.log("ListBaseballStatsCtrl initialized");
         $rootScope.apikey = "scraping";


         var api = "/api/v2/secure/baseball-stats";


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



         $scope.filtered = function() {
             $scope.searchBaseballStat.stadium = "";
             $scope.searchBaseballStat.date = "";
             $scope.searchBaseballStat.hit = "";
             $scope.searchBaseballStat.run = "";
             $scope.searchBaseballStat.error = "";
         };

         $scope.previousPage = function() {
             if (!$scope.inputPage || $scope.inputPage) {

                 console.log("offset antes-: " + limit);
                 offset -= limit;

                 if (offset < 0) {
                     offset = 0;
                 }

                 console.log("offset despues-: " + offset);
                 $http
                     .get(api + "?apikey=" + $rootScope.apikey + "&limit=10&offset=" + offset)
                     .then(function(response) {
                         properties = "&limit=10&offset=" + offset;
                         $scope.currentPage--;
                         $scope.getBaseballStats();

                     });
             }
         };

         $scope.nextPage = function() {

             if (!$scope.inputPage || $scope.inputPage) {

                 console.log("offset antes+: " + $scope.currentPage);
                 offset += limit;

                 if (offset > (limit * ($scope.maxPages - 1))) {
                     offset = limit * ($scope.maxPages - 1);
                 }

                 console.log("offset despues +: " + offset);
                 $http
                     .get(api + "?apikey=" + $rootScope.apikey + "&limit=10&offset=" + offset)
                     .then(function(response) {
                         properties = "&limit=10&offset=" + offset;

                         $scope.currentPage++;
                         $scope.getBaseballStats();
                     });
             }
         };


         $scope.addBaseballStat = function() {
             $http.post(api + "?apikey=" + $rootScope.apikey, $scope.newBaseballStat).then(function(response) {

                 Materialize.toast('<i class="material-icons">done</i> ' + $scope.newBaseballStat.stadium + ' has been added succesfully!', 4000);
                 $scope.getBaseballStats();
             }, function(response) {
                 Materialize.toast('<i class="material-icons">error_outline</i> Error adding data!', 4000);
             }, function(response) {
                 switch (response.status) {
                     case 400:
                         Materialize.toast('<i class="material-icons">error_outline</i> Error adding data - incorrect data was entered!!', 4000);
                         break;
                     case 401:
                         Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 4000);
                         break;
                     case 403:
                         Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 4000);
                         break;
                     default:
                         Materialize.toast('<i class="material-icons">error_outline</i> Error adding data!', 4000);
                         break;
                 }
                 $scope.status = "Status: " + response.status;
                 console.log(JSON.stringify(response, null, 2));
                 $scope.getBaseballStats();

             });
         };

         $scope.deleteBaseballStat = function(date, stadium) {
             console.log("Stat to be deleted");
             $http.delete(api + "/" + stadium + "/" + date + "?apikey=" + $rootScope.apikey).then(function(response) {
                 $scope.status = "Status: " + response.status;

                 Materialize.toast('<i class="material-icons">done</i> ' + stadium + ' has been deleted succesfully!', 4000);

                 //$scope.getBaseballStats();
                 $scope.refresh();
             }, function(response) {
                 Materialize.toast('<i class="material-icons">error_outline</i> Error deleting data!', 4000);
             });

             $scope.getBaseballStats();

         };

         $scope.deleteAllBaseballStat = function() {
             $http.delete(api + "?apikey=" + $rootScope.apikey).then(function(response) {
                 $scope.getBaseballStats();
                 $scope.status = "Status: " + response.status;
                 Materialize.toast('<i class="material-icons">done</i> All data has been deleted succesfully!', 4000);
                 $scope.maxPages = 1;
                 $scope.currentPage = 1;
                 properties = "";
                 $scope.refresh();
             }, function(response) {
                 Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);

             });
         };

         $scope.loadInitialBaseballStat = function() {

             if ($scope.initialbaseballstats.length == 0) {

                 $http.get(api + "/loadInitialData" + "?apikey=" + $rootScope.apikey).then(function() {

                     Materialize.toast('<i class="material-icons">done</i> Loaded initial data succesfully!', 4000);
                     $scope.getBaseballStats();
                 }, function(response) {
                     Materialize.toast('<i class="material-icons">error_outline</i> Error adding initial data!', 4000);
                 });
             }
             else {
                 Materialize.toast('<i class="material-icons">error_outline</i> List must be empty to add initial data!', 4000);
                 console.log("List must be empty!");
             }



         };



         $('#apikeyModal').modal({
             complete: function() {
                 $rootScope.apikey = $scope.apikey;
                 offset = 0;
                 $scope.currentPage = 1;

                 $scope.getBaseballStats();
                 
                Materialize.toast('<i class="material-icons">error_outline</i> Api Key changed suscessfully!', 2500);
                 console.log("Api key changed!");
             }
         });


         $('#searchModal').modal({
             complete: function() {
                 Materialize.toast('<i class="material-icons">done</i> Search done successfully!', 4000);
                 $scope.getBaseballStats();
                 $scope.filtered();

             }
         });


         $scope.getBaseballStats = function() {
             properties = "";

             try {
                 if ($scope.searchBaseballStat.stadium && $scope.searchBaseballStat.date) {
                     properties = "&stadium=" + $scope.searchBaseballStat.stadium + "&date=" + $scope.searchBaseballStat.date;
                 }
                 if ($scope.searchBaseballStat.stadium) {
                     properties = "&stadium=" + $scope.searchBaseballStat.stadium;
                 }
                 if ($scope.searchBaseballStat.date) {
                     properties = "&date=" + $scope.searchBaseballStat.date;
                 }
                 if ($scope.searchBaseballStat.hit) {
                     properties = "&hit=" + $scope.searchBaseballStat.hit;
                 }
                 if ($scope.searchBaseballStat.run) {
                     properties = "&run=" + $scope.searchBaseballStat.run;
                 }
                 if ($scope.searchBaseballStat.error) {
                     properties = "&error=" + $scope.searchBaseballStat.error;
                 }
             }
             catch (error) {
                 console.log("Failed search");
             }


             if ($scope.inputPage < $scope.currentPage) {
                 console.log("entra en el menor");
                 offset -= (limit * ($scope.inputPage - 1));
                 if (offset < 0) { offset = 0; }

                 console.log("input menor");
             }
             if ($scope.inputPage == "") {

                 offset = 0;
             }

             if ($scope.inputPage > $scope.currentPage) {
                 offset += limit * ($scope.inputPage - 1);

                 if (offset > (limit * ($scope.maxPages - 1))) {
                     offset = limit * ($scope.maxPages - 1);
                 }
             }




             $http
                 .get(api + "/count" + "?apikey=" + $rootScope.apikey + properties)
                 .then(function(response) {

                     console.log(response.data);
                     $scope.maxPages = Math.ceil(parseInt(response.data) / limit);

                     dataCache = response.data;
                     console.log(JSON.stringify(dataCache, null, 2));
                     //$scope.refresh();

                     $http.get(api + "?apikey=" + $rootScope.apikey + "&limit=" + limit + "&offset=" + offset + properties)
                         .then(function(response) {

                             $scope.status = "Status: " + response.status;
                             $scope.initialbaseballstats = response.data;
                             dataCache = $scope.initialbaseballstats;


                             if (dataCache == 0 && $scope.currentPage > 1) {
                                 $scope.previousPage();
                             }

                             $scope.refresh();
                         });


                 }, function(response) {
                             switch (response.status) {
                                 case 400:
                                     Materialize.toast('<i class="material-icons">error_outline</i> Make sure to set all atributes!', 2500);
                                     break;
                                 case 409:
                                     Materialize.toast('<i class="material-icons">error_outline</i> Duplicated stat!', 2500);
                                     $scope.refreshPage();
                                     break;
                                 case 401:
                                     Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 2500);
                                     $scope.initialbaseballstats = {};
                                     $scope.refreshPage();
                                     break;
                                 case 403:
                                     Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 2500);
                                     $scope.initialbaseballstats = {};
                                     $scope.refreshPage();
                                     break;
                                 default:
                                     Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 2500);
                                     break;
                             }
                         });
                 
                 
         };


         /*  $scope.inputPageButton = function() {

             if ($scope.inputPage < $scope.currentPage) {
                 console.log("entra en el menor");
                 offset -= (limit * ($scope.inputPage - 1));
                 if (offset < 0) { offset = 0; }

                 console.log("input menor");
             }
             if ($scope.inputPage == undefined) {

                 offset=0;
             }

             if ($scope.inputPage > $scope.currentPage) {
                 offset += limit * ($scope.inputPage - 1);

                 if (offset > (limit * ($scope.maxPages - 1))) {
                     offset = limit * ($scope.maxPages - 1);
                 }
             }



             $http
                 .get(api + "?apikey=" + $rootScope.apikey + "&limit=10&offset=" + offset)
                 .then(function(response) {
                     properties = "&limit=10&offset=" + offset;

                     $scope.currentPage = $scope.inputPage;
                     $scope.getBaseballStats();
                 });

             console.log("input mayor");
         };


*/



         $scope.refresh = function() {



             if ($scope.currentPage <= 0) $scope.currentPage = 1;
             if ($scope.currentPage > $scope.maxPages) $scope.currentPage = $scope.maxPages;

             $scope.initialbaseballstats = dataCache;
             console.log("estamos en la pagina: " + $scope.currentPage);
             console.log("maximo de paginas: " + $scope.maxPages);

         };




         $scope.getBaseballStats();

     }]);
 