/* global angular*/
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("ListBasketballStatsCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
        console.log("ListBasketballStatsCtrl initialized!");
        var api = "/api/v2/secure/basketball-stats";
        //var api = "/api/v2/basketball-stats";

        $scope.elementsPerPage = 5;
        $scope.currentPage = 1;
        $rootScope.apikey = "scraping"

        var dataCache;

        $scope.previousPage = function() {
            $scope.currentPage--;
            $scope.refreshPage();
        };

        $scope.nextPage = function() {
            $scope.currentPage++;
            $scope.refreshPage();
        };

        $scope.refreshPage = function() {
            $scope.totalPages = Math.ceil(dataCache.length / $scope.elementsPerPage);
            if ($scope.currentPage <= 0)
                $scope.currentPage = 1;
            if ($scope.currentPage > $scope.totalPages)
                $scope.currentPage = $scope.totalPages;
            if (isNaN($scope.totalPages))
                $scope.totalPages = 1;
            if (dataCache.length > $scope.elementsPerPage)
                $scope.stats = dataCache.slice(Number(($scope.currentPage - 1) * $scope.elementsPerPage), Number(($scope.currentPage) * $scope.elementsPerPage));
            else
                $scope.stats = dataCache;
        };


        $scope.addStat = function() {
            $http.post(api + "?apikey=" + $rootScope.apikey, $scope.newStat).then(function(response) {
                $scope.status = "Status: " + response.status;
                Materialize.toast('<i class="material-icons">error_outline</i> Stats added!', 2500);
                getStats();
                

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
                getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Stat deleted!', 2500);
            });
        };

        $scope.deleteStatM = function() {
            var filter = "";
            if ($scope.deletedStat.stadium)
                filter += ("/" + $scope.deletedStat.stadium)
            if ($scope.deletedStat.date)
                filter += ("/" + $scope.deletedStat.date)
            $http.delete(api + filter + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.status = "Status: " + response.status;
                getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Stats deleted!', 2500);
            });
        };

        $scope.deleteStats = function() {
            $http.delete(api + "?apikey=" + $rootScope.apikey).then(function(response) {
                getStats();
                $scope.status = "Status: " + response.status;
                Materialize.toast('<i class="material-icons">error_outline</i> All stats deleted!', 2500);
            });
        };

        function getStats() {
            $http.get(api + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.status = "Status: " + response.status;
                dataCache = response.data;
                $scope.refreshPage();
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
        }

        $scope.loadInitialData = function() {
            $http.get("/api/v2/basketball-stats/loadInitialData" + "?apikey=" + $rootScope.apikey).then(function(response) {
                $scope.status = "Status: " + response.status;
                getStats();
                Materialize.toast('<i class="material-icons">error_outline</i> Initial stats added!', 2500);
            });
        };

        getStats();

        $('#apikeyModal').modal({
            complete: function() {
                $rootScope.apikey = $scope.apikey;

                $http.get(api + "?apikey=" + $rootScope.apikey).then(function(response) {
                    $scope.status = "Status: " + response.status;
                    dataCache = response.data;
                    $scope.refreshPage();
                }, function(response) {
                    switch (response.status) {
                        case 401:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - missing api key!', 2500);
                            dataCache = {};
                            $scope.refreshPage();
                            break;
                        case 403:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - incorrect api key!', 2500);
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
                Materialize.toast('<i class="material-icons">error_outline</i> Api Key changed suscessfully!', 2500);
                console.log("Api key changed!");
            }
        });

        $('#searchModal').modal({
            complete: function() {

                var filter = "?apikey=" + $rootScope.apikey;
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
                $http.get(api + filter).then(function(response) {
                    dataCache = response.data;
                    $scope.refreshPage();
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
                Materialize.toast('<i class="material-icons">error_outline</i> Stats filtered!', 2500);
            }
        });

    }]);
