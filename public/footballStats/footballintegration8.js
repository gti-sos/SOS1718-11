/*global angular*/
 /* global $ */
 /* global anychart*/
 /*global zingchart*/

 angular.module("StatsManagerApp").controller("FootballIntegration8Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
     console.log("List Football Ctrl initialized!");

     if (!$rootScope.apikey) $rootScope.apikey = "scraping";
     var api = "/api/v2/secure/football-stats";
    





     $http.get(api + '?apikey=' + $rootScope.apikey).then(function(response1) {




         $http.get("https://sos1718-10.herokuapp.com/api/v1/builders").then(function(response) {
            
           

       

//--- Inicio Graficas
            

zingchart.THEME="classic";
var myConfig = {
    "type": "bubble",
    "background-color": "#f4f4f4 #dfdfdf",
    "title": {
        "text": "Bubbles in ZingChart",
        "background-color": "#777e88 #4e5665",
        "border-bottom": "1px solid #050505",
        "height": "50px",
        "font-color": "#fff",
        "font-family": "Arial",
        "font-weight": "normal",
        "font-size": "18px"
    },
    "plotarea": {
        "background-color": "#fff",
        "alpha": 0.3,
        "margin": "90px 40px 50px 50px"
    },
    "scale-y": {
        "values": "0:20:5",
        "line-color": "#aaadb3",
        "shadow": 0,
        "tick": {
            "line-color": "#aaadb3"
        },
        "minor-ticks": 1,
        "minor-tick": {
            "visible": false,
            "line-color": "#aaadb3",
            "shadow": 0
        },
        "guide": {
            "line-color": "#aaadb3",
            "alpha": 0.3,
            "line-style": "solid"
        },
        "minor-guide": {
            "line-color": "#aaadb3",
            "alpha": 0.2,
            "line-style": "dashed"
        },
        "item": {
            "padding-right": "5px",
            "font-family": "Arial",
            "font-size": "11px",
            "font-color": "#676b72"
        }
    },
    "scale-x": {
        "line-color": "#aaadb3",
        "shadow": 0,
        "tick": {
            "line-color": "#aaadb3"
        },
        "minor-ticks": 1,
        "minor-tick": {
            "visible": false,
            "line-color": "#aaadb3",
            "shadow": 0
        },
        "guide": {
            "line-color": "#aaadb3",
            "alpha": 0.3,
            "line-style": "solid"
        },
        "minor-guide": {
            "line-color": "#aaadb3",
            "alpha": 0.2,
            "line-style": "dashed"
        },
        "item": {
            "padding-top": "5px",
            "font-family": "Arial",
            "font-size": "11px",
            "font-color": "#676b72"
        }
    },
    "tooltip":{
      "text":"secondscore Value: %v0<br>firtscore Value: %v1<br>Bubble Size: %v2",
      "text-align":"left"
    },
    "series": [
        
        {
            "values": 
              
                response1.data.map(function(g) {
        return parseInt([g["goal"],g["corner"],2])
                })
            ,
            "marker": {
                "background-color": "#9d9ad1 #615faa",
                "border-width": "1px",
                "border-color": "#514f99",
                "fill-type": "linear",
                "shadow": true,

            },
            "hover-marker": {
                "background-color": "#c3c2e3 #9d9ad1",
                "border-color": "#8a87c2",
                "border-width": "1px"
            }
        },
        {
            "values": 
             response.data.map(function(e) {
        return parseInt([e["victory"],e["pole"],2])
           }),
            "marker": {
                "background-color": "#ecd466 #e0b140",
                "border-width": "1px",
                "border-color": "#cb9f34",
                "fill-type": "linear",
                "shadow": true,
            },
            "hover-marker": {
                "background-color": "#f9f0c8 #ecd466",
                "border-color": "#d5bc4c",
                "border-width": "1px"
            }
        }
    ]
};

zingchart.render({ 
	id : 'myChart', 
	data : myConfig, 
	height: "500", 
	width: "725"
});





//Final Graficas
         });




     });

    

 }]);