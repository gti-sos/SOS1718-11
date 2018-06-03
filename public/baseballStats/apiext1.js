 /*global angular*/
 /*global FusionCharts*/


 angular

     .module("StatsManagerApp")
     .controller("integrationGraph4Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";

         var api = "/api/v2/secure/baseball-stats";
         var apiEx1 = "https://sos1718-04.herokuapp.com/api/v1/unemployment-rates";
         var properties = "";

         $http
             .get(api + "?apikey=" + $rootScope.apikey + properties)
             .then(function(response2) {

                 $http.get(apiEx1).then(function(response1) {

                     var b = [];
                     var y = [];
                     var y2 = [];
                     response1.data.map(function(v) {
                         b.push({
                             "label": v.province,
                         });

                     });

                     console.log(b);

                     response2.data.map(function(h) {
                         b.push({
                             "label": h.stadium,
                         });;
                     });
                     response1.data.map(function(v) {
                         y.push({
                             "value": v.illiterate,
                         });

                     });

                     console.log(b);
                      for(var i=0; i< response1.data.length;i++){
                         y2.push({
                             "value": "-",
                         });
                     }

                     response2.data.map(function(h) {
                         y2.push({
                             "value": h.hit,
                         });;
                     });
                    


                     FusionCharts.ready(function() {
                         var salesChart = new FusionCharts({
                                 type: 'msarea',
                                 backgroundColor:'#F5F1F0',
                                 renderAt: 'chart-container',
                                 width: '1000',
                                 height: '500',
                                 dataFormat: 'json',
                                 dataSource: {
                                     "chart": {
                                         "caption": "",
                                         "subCaption": "",
                                         "xAxisName": "Province & Stadium",
                                         "yAxisName": "Hits & Illiterate",
                                         "paletteColors": "#0075c2,#1aaf5d",
                                         "bgColor": "#F5F1F0",
                                         "showBorder": "0",
                                         "showCanvasBorder": "0",
                                         "plotBorderAlpha": "10",
                                         "usePlotGradientColor": "0",
                                         "legendBorderAlpha": "0",
                                         "legendShadow": "0",
                                         "plotFillAlpha": "60",
                                         "showXAxisLine": "1",
                                         "axisLineAlpha": "25",
                                         "showValues": "0",
                                         "captionFontSize": "14",
                                         "subcaptionFontSize": "14",
                                         "subcaptionFontBold": "0",
                                         "divlineColor": "#999999",
                                         "divLineIsDashed": "1",
                                         "divLineDashLen": "1",
                                         "divLineGapLen": "1",
                                         "showAlternateHGridColor": "0",
                                         "toolTipColor": "#F5F1F0",
                                         "toolTipBorderThickness": "0",
                                         "toolTipBgColor": "#F5F1F0",
                                         "toolTipBgAlpha": "#F5F1F0",
                                         "toolTipBorderRadius": "2",
                                         "toolTipPadding": "5",
                                     },

                                     "categories": [{
                                         "category": b
                                     }],
                                     

                                     "dataset": [{
                                             "seriesname": "Illiterate",
                                             "data": y
                                         },
                                         {
                                             "seriesname": "Hits",
                                             "data": y2
                                         }
                                     ]
                                 }
                             })
                             .render();
                     });




                 });
             });
     }]);
 