/* global google */
/* global Materialize */
/* global $ */

angular.module("StatsManagerApp").
controller("ExtGraph6Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("External Graph 4 Controller initialized");
    if (!$rootScope.apikey) $rootScope.apikey = "scraping";

    var myChart = undefined;
    Materialize.toast('<i class="material-icons">error_outline</i> Loading cards, please wait!', 4000)
    $http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=esES', {
        headers: {
            "X-Mashape-Key": "kIQ6P822tGmshua40DgjzImv0bOpp1st8GajsnUb4cIoLkKVab",
            "Accept": "application/json",
        }
    }).then(function(response) {
        $scope.cards = response.data.Credits;
        console.log(response.data);
        Materialize.toast('<i class="material-icons">error_outline</i> Cards loaded, select a card!', 2500);
    });

    $scope.refresh = function() {

        if (myChart != undefined) myChart.destroy();

        var card = JSON.parse($scope.card);
        $scope.img = card['img'];

        var data = {
            labels: ["Cost", "Attack", "Health"],
            datasets: [{
                label: card['name'],
                backgroundColor: "rgba(200,0,0,0.2)",
                data: [card.cost, card.attack, card.health]
            }]
        };

        var chartOptions = {
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 15,
                    stepSize: 3
                },
                pointLabels: {
                    fontSize: 10
                }
            }
        };

        var radarChart = new Chart(ext6, {
            type: 'radar',
            data: data,
            options: chartOptions
        });

        /*
                var card = JSON.parse($scope.card);
                $scope.img = card['img'];

                var ctx = document.getElementById("ext6").getContext('2d');
                myChart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: ["Cost", "Atack", "Health"],
                        datasets: [{
                            label: card['rarity'],
                            data: [card.cost, card.attack, card.health],
                            backgroundColor: [
                                'rgb(255, 255, 153)',
                                '#e04141',
                                '#6fe883',

                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    min: 0,
                                    max: 14
                                }
                            }]
                        }
                    }
                });
        */
    };

}]);
