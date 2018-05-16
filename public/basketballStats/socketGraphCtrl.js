/* global angular */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("SocketGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Graph1 Controller initialized");

        var api = "/api/v2/secure/basketball-stats";

        var socket = io.connect("https://sos171811als-sos171811als.c9users.io");

        var series = [];
        var categories = [];

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";


        socket.on('reload', function(data) {

            categories = data.data.map(function(d) {
                return d['stadium'];
            });

            series = [{
                name: '1Q',
                color: 'yellow',
                data: data.data.map(function(d) {
                    return parseInt(d['first']);
                })
            }, {
                name: '2Q',
                color: 'orange',
                data: data.data.map(function(d) {
                    return parseInt(d['second']);
                })
            }, {
                name: '3Q',
                color: '#FE642E',
                data: data.data.map(function(d) {
                    return parseInt(d['third']);
                })
            }, {
                name: '4Q',
                color: 'red',
                data: data.data.map(function(d) {
                    return parseInt(d['fourth']);
                })
            }]

            Highcharts.chart("socket", {

                chart: {
                    type: 'bar',
                    height: 700,
                    backgroundColor: ('#212529'),

                },
                title: {
                    text: null
                },
                xAxis: {
                    categories: categories,
                    title: {
                        text: 'Stadium',
                        align: 'high'
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Points',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: series
            });


            console.log("Datos actuaizados!")
        });

        $http
            .get(api + "?apikey=" + $rootScope.apikey)
            .then(function(response) {

                    categories = response.data.map(function(d) {
                        return d['stadium'];
                    });

                    series = [{
                        name: '1Q',
                        color: 'yellow',
                        data: response.data.map(function(d) {
                            return parseInt(d['first']);
                        })
                    }, {
                        name: '2Q',
                        color: 'orange',
                        data: response.data.map(function(d) {
                            return parseInt(d['second']);
                        })
                    }, {
                        name: '3Q',
                        color: '#FE642E',
                        data: response.data.map(function(d) {
                            return parseInt(d['third']);
                        })
                    }, {
                        name: '4Q',
                        color: 'red',
                        data: response.data.map(function(d) {
                            return parseInt(d['fourth']);
                        })
                    }]

                    Highcharts.chart("socket", {

                        chart: {
                            type: 'bar',
                            height: 700,
                            backgroundColor: ('#212529'),

                        },
                        title: {
                            text: null
                        },
                        xAxis: {
                            categories: categories,
                            title: {
                                text: 'Stadium',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Points',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            x: -40,
                            y: 80,
                            floating: true,
                            borderWidth: 1,
                            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                            shadow: true
                        },
                        credits: {
                            enabled: false
                        },
                        series: series
                    });

            });
    }]);
