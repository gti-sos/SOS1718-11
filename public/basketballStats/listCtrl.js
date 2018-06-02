/* global angular*/
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("ListBasketballStatsCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
        console.log("ListBasketballStatsCtrl initialized!");
        var api = "/api/v2/secure/basketball-stats";
        //var api = "/api/v2/basketball-stats";

        $scope.elementsPerPage = 10;
        $scope.currentPage = 1;
        $rootScope.apikey = "scraping";

        var dataCache;

        $scope.offset = 0;
        $scope.limit = parseInt($scope.elementsPerPage);


        $scope.goToPage = function() {
            $scope.offset = $scope.limit * (parseInt($scope.currentPage) - 1);
            $scope.getStats();
        };


        $scope.previousPage = function() {
            $scope.currentPage--;
            $scope.offset -= parseInt($scope.limit);
            $scope.getStats();
        };


        $scope.nextPage = function() {
            $scope.currentPage++;
            $scope.offset += parseInt($scope.limit);
            $scope.getStats();
        };


        $scope.loadInitialData = function() {
            $http.get("/api/v2/basketball-stats/loadInitialData" + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.status = "Status: " + response.status;
                $scope.offset = 0;
                $scope.currentPage = 1;
                $scope.getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Initial stats added!', 2500);
            });
        };


        $scope.refreshPage = function() {
            $scope.totalPages = Math.ceil($scope.totalData / $scope.elementsPerPage);
            if ($scope.currentPage > $scope.totalPages)
                $scope.currentPage = $scope.totalPages;
            if ($scope.currentPage < 1)
                $scope.currentPage = 1;
            if (isNaN($scope.totalPages))
                $scope.totalPages = 1;
            else
                $scope.stats = dataCache;
        };


        $scope.deleteFilter = function() {
            $scope.searchedStat=undefined;
            $scope.getStats();
        };

        $scope.getStats = function() {
            var filter = "";
            try {
                if ($scope.searchedStat.stadium)
                    filter += ("&stadium=" + $scope.searchedStat.stadium);
                if ($scope.searchedStat.date)
                    filter += ("&date=" + $scope.searchedStat.date);
                if ($scope.searchedStat.first)
                    filter += ("&fc=" + $scope.searchedStat.first);
                if ($scope.searchedStat.second)
                    filter += ("&sc=" + $scope.searchedStat.second);
                if ($scope.searchedStat.third)
                    filter += ("&tc=" + $scope.searchedStat.third);
                if ($scope.searchedStat.fourth)
                    filter += ("&frc=" + $scope.searchedStat.fourth);
            }
            catch (error) {
                console.log("Search suspended");
            }
            $http.get("/api/v2/secure/basketball-stats-count?" + filter).then(function(response) {

                $scope.totalData = parseInt(response.data);
                $scope.totalPages = Math.ceil($scope.totalData / $scope.elementsPerPage);
                if ($scope.currentPage > $scope.totalPages) {
                    $scope.currentPage = $scope.totalPages;
                    $scope.offset = ($scope.currentPage - 1) * $scope.limit;
                }
                if ($scope.currentPage < 1) {
                    $scope.currentPage = 1;
                    $scope.offset = 0;
                }
                if (isNaN($scope.totalPages))
                    $scope.totalPages = 1;
                if ($scope.offset < 0 || $scope.currentPage == 1) {
                    $scope.offset = 0;
                }
                $scope.limit = $scope.elementsPerPage;

                $http.get(api + "?apikey=" + $rootScope.apikey + "&offset=" + $scope.offset + "&limit=" + $scope.limit + filter).then(function(response) {
                    $scope.status = "Status: " + response.status;
                    dataCache = response.data;

                    $scope.stats = dataCache;
                }, function(response) {
                    switch (response.status) {
                        case 401:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 2500);
                            dataCache = {};
                            $scope.refreshPage();
                            break;
                        case 403:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 2500);
                            dataCache = {};
                            $scope.refreshPage();
                            break;
                        case 404:
                            dataCache = {};
                            $scope.refreshPage();
                            Materialize.toast('<i class="material-icons">error_outline</i> No data found!', 2500);
                            break;
                        default:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 2500);
                            break;
                    }
                });
            });
        };


        $scope.addStat = function() {
            $http.post(api + "?apikey=" + $rootScope.apikey, $scope.newStat).then(function(response) {
                $scope.status = "Status: " + response.status;
                Materialize.toast('<i class="material-icons">error_outline</i> Stats added!', 2500);
                $scope.getStats();

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
                        dataCache = {};
                        $scope.refreshPage();
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 2500);
                        dataCache = {};
                        $scope.refreshPage();
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 2500);
                        break;
                }
            });
        };


        $scope.deleteStat = function(stadium, date) {
            $http.delete(api + "/" + stadium + "/" + date + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.status = "Status: " + response.status;
                $scope.getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Stat deleted!', 2500);
            });
        };


        $scope.deleteStatM = function() {
            var filter = "";
            if ($scope.deletedStat.stadium)
                filter += ("/" + $scope.deletedStat.stadium);
            if ($scope.deletedStat.date)
                filter += ("/" + $scope.deletedStat.date);
            $http.delete(api + filter + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.status = "Status: " + response.status;
                $scope.getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Stats deleted!', 2500);
            });
        };


        $scope.deleteStats = function() {
            $http.delete(api + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.offset = 0;
                $scope.getStats();
                $scope.status = "Status: " + response.status;
                Materialize.toast('<i class="material-icons">error_outline</i> All stats deleted!', 2500);
            });
        };


        $scope.getStats();


        $('#apikeyModal').modal({
            complete: function() {
                $rootScope.apikey = $scope.apikey;
                $scope.offset = 0;
                $scope.currentPage = 1;
                $scope.getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Api Key changed suscessfully!', 2500);
                console.log("Api key changed!");
            }
        });


        $('#searchModal').modal({
            complete: function() {
                $scope.getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Stats filtered!', 2500);
            }
        });


    }]);
