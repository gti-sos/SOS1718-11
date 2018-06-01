/* global google */
/* global Materialize */
/* global $ */

angular.module("StatsManagerApp").
controller("ExtGraph4Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("External Graph 4 Controller initialized");

    var api = "/api/v2/secure/basketball-stats";

    if (!$rootScope.apikey) $rootScope.apikey = "scraping";

    if ($scope.couple == undefined) {
        Materialize.toast('<i class="material-icons">error_outline</i> Introduce a Couple!', 2500);

        $scope.couple = "--Introduce a Couple!--"
    }
    else {
        $scope.couple = $scope.name1 + ' & ' + $scope.name2;
    }

    $http
        .get(api + '?apikey=' + $rootScope.apikey)
        .then(function(response) {

            $scope.basket = response.data;


        });

    $scope.refresh = function() {

        if ($scope.couple == undefined) {
            Materialize.toast('<i class="material-icons">error_outline</i> Introduce a Couple!', 2500);
            $scope.couple = "--Introduce a Couple!--"
        }
        else {
            $scope.couple = $scope.name1 + ' & ' + $scope.name2;
        }



        $http.get('https://love-calculator.p.mashape.com/getPercentage?fname=' + $scope.name1 + '&sname=' + $scope.name2, {
            headers: {
                "X-Mashape-Key": "kIQ6P822tGmshua40DgjzImv0bOpp1st8GajsnUb4cIoLkKVab",
                "Accept": "application/json",
            }
        }).then(function(response) {

            $scope.advice = response.data.result;

            var myConfig1 = {
                "type": "gauge",
                backgroundColor: "#F5F1F0",
                "scale-r": {
                    "aperture": 300,
                    "values": "0:100:20",
                    "center": { //Pivot Point
                        "size": 20,
                        "background-color": "#000000",
                        "border-color": "none"
                    },
                    "ring": { //Gauge Ring
                        "size": 15,
                        "rules": [{
                                "rule": "%v >= 0 && %v <= 20",
                                "background-color": "#3a68ff"
                            },
                            {
                                "rule": "%v >= 20 && %v <= 40",
                                "background-color": "#6bc0f4"
                            },
                            {
                                "rule": "%v >= 40 && %v <= 60",
                                "background-color": "#fdff99"
                            },
                            {
                                "rule": "%v >= 60 && %v <= 80",
                                "background-color": "#ff6600"
                            },
                            {
                                "rule": "%v >= 80 && %v <=100",
                                "background-color": "red"
                            }
                        ]

                    },
                    "guide": {
                        "background-color": "#F5F1F0",
                        "alpha": 0.2
                    }
                },
                "plot": {
                    "csize": "5%",
                    "size": "100%",
                    "background-color": "#000000"
                },
                "series": [
                    { "values": [parseInt(response.data.percentage)] }
                ]

            };


            zingchart.render({
                id: 'ext4',
                data: myConfig1,
                height: "100%",
                width: "100%"
            });

        });
    };

    $('#namesModal').modal({
        complete: function() {
            $scope.refresh();
        }
    });
}]);
