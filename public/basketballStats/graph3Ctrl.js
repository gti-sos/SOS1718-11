/* global RGraph */
/* global Materialize */
/* global $ */

angular
    .module("StatsManagerApp")
    .controller("Graph3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        console.log("Graph3 Controller initialized");

        var api = "/api/v2/secure/basketball-stats";

        if (!$rootScope.apikey) $rootScope.apikey = "scraping";

        $scope.refresh = function() {

            if ($scope.date == undefined) Materialize.toast('<i class="material-icons">error_outline</i> Introduce a Date!', 2500);

            RGraph.Clear(document.getElementById("graph3"));
            $http
                .get(api + "?apikey=" + $rootScope.apikey + "&date=" + $scope.date)
                .then(function(response) {

                    if (response.data.length == 0) Materialize.toast('<i class="material-icons">error_outline</i> No matches on this day!', 2500);
                    
                    var stadiums = [];
                    var total1 = [];
                    var total2 = [];

                    response.data.map(function(d) {
                        stadiums.push(d['stadium']);
                        total1.push(d['first'] + d['second']);
                        total2.push(d['first'] + d['second'] + d['third'] + d['fourth']);
                    });

                    console.log(stadiums);
                    console.log(total1);
                    console.log(total2);

                    var gutterLeft = 60,
                        gutterRight = 25,
                        gutterTop = 45,
                        gutterBottom = 65,
                        hmargin = 15,
                        ymax = 250,
                        data = [null, total1, total2],
                        colors = ['Gradient(#696:#0f0:#0f0)', 'Gradient(#966:#f00:#f00)'],

                        labels = stadiums;




                    var bar = new RGraph.Bar({
                        id: 'graph3',
                        data: data[2],
                        options: {
                            textAccessible: true,
                            variant: '3d',
                            variantThreedYaxis: false,
                            variantThreedXaxis: false,
                            strokestyle: 'rgba(0,0,0,0)',
                            colors: [colors[2]],
                            shadow: true,
                            shadowOffsetx: 10,
                            backgroundGridColor: '#ccc',
                            backgroundGridAutofitNumhlines: 5,
                            backgroundGridAutofitNumvlines: 14,
                            scaleZerostart: true,
                            axisColor: '#ddd',
                            gutterBottom: gutterBottom,
                            gutterTop: gutterTop,
                            gutterLeft: gutterLeft,
                            gutterRight: gutterRight,
                            hmargin: hmargin,
                            ymax: ymax,
                            noaxes: true,
                            ylabels: false
                        }
                    }).draw();

                    var bar2 = new RGraph.Bar({
                        id: 'graph3',
                        data: data[1],
                        options: {
                            textAccessible: true,
                            variant: '3d',
                            variantThreedYaxis: false,
                            variantThreedXaxis: false,
                            strokestyle: 'rgba(0,0,0,0)',
                            colors: [colors[1]],
                            shadow: true,
                            shadowOffsetx: 10,
                            shadowColor: 'rgba(0,0,0,0.5)',
                            backgroundGrid: false,
                            axisColor: '#ddd',
                            ylabels: false,
                            labels: labels,
                            gutterBottom: gutterBottom - 10,
                            gutterTop: gutterTop + 10,
                            gutterLeft: gutterLeft - 25,
                            gutterRight: gutterRight + 25,
                            hmargin: hmargin,
                            ymax: ymax,
                            noaxes: true
                        }
                    }).draw();


                    var yaxis = new RGraph.Drawing.YAxis({
                        id: 'graph3',
                        x: 1000,
                        options: {
                            max: bar.scale2.max,
                            colors: ['rgba(0,0,0,0)'],
                            textColor: 'black',
                            gutterTop: gutterTop,
                            gutterBottom: gutterBottom + 35,
                            align: 'right'
                        }
                    }).draw();

                });
        };

        $scope.refresh();

        $('#dateModal').modal({
            complete: function() {
                $scope.refresh();

            }
        });

    }]);
