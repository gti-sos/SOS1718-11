/*global angular*/
 /* global $ */

 /*global zingchart*/

 angular.module("StatsManagerApp").controller("FootballIntegration7Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
     console.log("List Football Ctrl initialized!");

     if (!$rootScope.apikey) $rootScope.apikey = "scraping";
     var api = "/api/v2/secure/football-stats";

     var sumascore = 0;
     var sumagoles = 0;
     var sumacornes = 0;
     var sumafaltas = 0;





     $http.get(api + '?apikey=' + $rootScope.apikey).then(function(response1) {




         $http.get("https://sos1718-10.herokuapp.com/api/v1/motogp-stats").then(function(response) {
             var footballData = response1.data;
             console.log(footballData);
             var bolo = response.data;

             for (var i = 0; i < footballData.length; i++) {
                 sumagoles += footballData[i].goal;
                 sumacornes += footballData[i].corner;
                 sumafaltas += footballData[i].fault;


             }
             for (var i = 0; i < bolo.length; i++) {
                 sumascore += bolo[i].score;

             }

        


            
 zingchart.THEME = "classic";
     var myConfig = {
         "graphset": [{
             "type": "hfunnel",
             "background-color": "#fff",
             "background-color-2": "#f1f1f1",
             "scale-x": {
                 "values": [
                     "Website<br>Entry"
                 ],
                 "item": {
                     "offset-y": -20,
                     "font-size": "14px",

                 }
             },
             "tooltip": {
                 "shadow": false
             },
             "scale-y": {
                 "visible": false
             },
             "scale-y-2": {
                 "values": [
                     "Goals",
                     "Corner",
                     "Fault",
                     "Score"
                 ],
                 "guide": {
                     "items": [{
                             "background-color": "#fff"
                         },
                         {
                             "background-color": "#eee"
                         },
                         {
                             "background-color": "#ddd"
                         },
                         {
                             "background-color": "#ccc"
                         },
                         {
                             "background-color": "green",
                             "alpha": 0.2
                         }
                     ]
                 }
             },
             "plotarea": {
                 "margin": "75 25 50 80"
             },
             "plot": {
                 "tooltip-text": "%v Actions",
                 "scales": "scale-x,scale-y-2",
                 "offset": 40

             },
             "series": [{
                     "values": [parseInt(sumagoles)]

                     ,
                     "background-color": "#5FB4E8",
                     "border-color": "#000000",
                     "shadow": false,

                 },
                 {
                     "values": [parseInt(sumacornes)
                     ],
                     "background-color": "#EBC765",
                     "border-color": "#000000",
                     "shadow": false,

                 },
                 {
                     "values": [parseInt(sumafaltas)
                     ],
                     "background-color": "#8FB550",
                     "border-color": "#000000",
                     "shadow": false,

                 },
                 {
                     "values": [parseInt(sumascore)
                     ],
                     "background-color": "#D17549",
                     "border-color": "#000000",
                     "shadow": false
                 },

             ]
         }]
     };

     zingchart.render({
         id: 'myChart',
         data: myConfig,
         height: 500,
         width: 725
     });

         });




     });

    

 }]);