/* global angular */
/* global Materialize */
/* global $ */

angular.module("StatsManagerApp").
controller("ExtGraph3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("External Graph 3 Controller initialized");

    if ($scope.page == undefined) {
        Materialize.toast('<i class="material-icons">error_outline</i> Select a Page!', 2500);
    }

    $scope.refresh = function() {
        $http.get("https://lcboapi.com/products?access_key=MDoxOTIxZWMxMi01ZDQ4LTExZTgtOWM4My0yN2E1ZTk2NjVlYjA6NHZLeEkyTExYOHVhYTJhV2d4Rm9vQjFSSVZGYWFQUUFNTjJo&where=is_kosher&per_page=10&page=" + $scope.page).then(function(response) {

            console.log(response.data);
            zingchart.THEME = "classic";
            var myConfig = {
                "type": "hbullet",
                "background-color": "#F5F1F0",
                "title": null,
                "legend": {
                    "layout": "float",
                    "position": "50% 12%",
                    "background-color": "none",
                    "border-width": "0px",
                    "toggle-action": "remove",
                    "item": {
                        "font-family": "arial",
                        "font-weight": "normal",
                        "font-size": "12px",
                        "font-color": "#307C70",
                        "shadow": 0,
                        "cursor": "hand"
                    },
                    "marker": {
                        "cursor": "hand"
                    }
                },
                "scale-y": {
                    "values": "0:60:20",
                    "line-width": "1px",
                    "line-color": "#434F5B",
                    "format": "%v",
                    "line-style": "solid",
                    "guide": {
                        "line-color": "#434F5B",
                        "line-style": "solid",
                        "alpha": 0.25
                    },
                    "tick": {
                        "line-width": "1px",
                        "line-color": "#434F5B"
                    },
                    "item": {
                        "font-size": "12px",
                        "font-color": "#434F5B",
                        "font-weight": "normal",
                        "font-family": "arial",
                        "offset-y": "5%"
                    }
                },
                "scale-x": {
                    "values": response.data.result.map(function(d) {
                        return d['name'];
                    }),
                    "line-color": "#434F5B",
                    "line-style": "solid",
                    "line-width": "1px",
                    "guide": {
                        "line-color": "#434F5B",
                        "line-style": "solid",
                        "alpha": 0.25
                    },
                    "tick": {
                        "line-width": "1px",
                        "line-color": "#434F5B"
                    },
                    "item": {
                        "font-size": "12px",
                        "font-color": "#434F5B",
                        "font-weight": "normal",
                        "font-family": "arial",
                        "offset-x": "-5%"
                    }
                },
                "plot": {
                    "background-color": "#000000",
                    "alpha": 1,
                    "bar-space": "0px",
                    "animation": {
                        "effect": 4,
                        "method": "0",
                        "sequence": "4"
                    }
                },
                "plotarea": {
                    "margin": "40% 5% 15% 20%",
                    "background-color": "#F5F1F0"
                },
                "series": [{
                    "text": "Price ($)",
                    "values": response.data.result.map(function(d) {
                        return d['price_in_cents'] / 100;
                    }),
                    "goals": response.data.result.map(function(d) {
                        return d['alcohol_content'] / 100;
                    }),
                    "goal": {
                        "background-color": "#000000"
                    },
                    "line-color": "#6FA3C1",
                    "background-color": "#6FA3C1",
                    "legend-marker": {
                        "border-color": "#6FA3C1"
                    }
                }, {
                    "text": "Alcohol content (%)",
                }]
            };

            zingchart.render({
                id: 'ext3',
                data: myConfig,
            });
        });

    };

    $(document).ready(function() {
        $('select').material_select();
    });

}]);
