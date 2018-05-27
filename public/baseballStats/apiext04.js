 /*global angular*/
 /*global FusionCharts*/


 angular

     .module("StatsManagerApp")
     .controller("integrationGraph3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";

         var api = "/api/v2/secure/baseball-stats";
         var apiEx1 = "https://sos1718-04.herokuapp.com/api/v1/medical-attention-rates";
         var properties = "";

         $http
             .get(api + "?apikey=" + $rootScope.apikey + properties)
             .then(function(response2) {

                 $http.get(apiEx1).then(function(response1) {

                     var b = [];
                     response1.data.map(function(v) {



                         b.push({
                             "label": v.province,
                             "value": v.nursing,
                         });

                     });

                     console.log(b);



                     response2.data.map(function(h) {
                         b.push({
                             "label": h.stadium,
                             "value": h.hit,
                         });;
                     });


                     FusionCharts.ready(function() {
                         var revenueChart = new FusionCharts({
                             type: 'column2d',
                             renderAt: 'chart-container',
                             width: '1000',
                             height: '500',
                             dataFormat: 'json',
                             dataSource: {
                                 "chart": {
                                     "caption": "",
                                     "subCaption": "Integration graph 3",
                                     "xAxisName": "Provinces & Stadium",
                                     "yAxisName": "Hits & Nursing",
                                     "paletteColors": "#0075c2",
                                     "bgColor": "#ffffff",
                                     "borderAlpha": "20",
                                     "canvasBorderAlpha": "0",
                                     "usePlotGradientColor": "0",
                                     "plotBorderAlpha": "10",
                                     "placevaluesInside": "1",
                                     "rotatevalues": "1",
                                     "valueFontColor": "#ffffff",
                                     "showXAxisLine": "1",
                                     "xAxisLineColor": "#999999",
                                     "divlineColor": "#999999",
                                     "divLineIsDashed": "1",
                                     "showAlternateHGridColor": "0",
                                     "subcaptionFontBold": "0",
                                     "subcaptionFontSize": "14"
                                 },
                                 "data": b,
                                 "trendlines": [{
                                     "line": [{
                                         "startvalue": "1",
                                         "color": "#1aaf5d",
                                         "valueOnRight": "1"
                                     }]
                                 }]
                             }
                         }).render();
                     });

                 });
             });
     }]);
 