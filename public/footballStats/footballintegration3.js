 /*global angular*/
 /*global google*/
 /* global Materialize */
/* global $ */

angular.module("StatsManagerApp").controller("FootballIntegration3Ctrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    
       if(!$rootScope.apikey) $rootScope.apikey = "scraping";
       var api ="/api/v2/secure/football-stats";
         var dataPlace=[];
        var datoslola=[];
        var goals=[];
        var conjunto = [];
       
        
        
     /*   $http.get("https://sos1718-10.herokuapp.com/api/v1/buses/").then(function doneFilter(responsePrimary){
             $http.get(api + '?apikey=' + $rootScope.apikey).then(function doneFilter(responseGoal){
                 
                 
                 for (var i = 0; i < responsePrimary.data.length; i++) {
                    dataPlace.push(responsePrimary.data[i].comunity);
                    datoslola.push(parseInt(responsePrimary.data[i].occupation));
                    goals.push("");
                    conjunto.push(responsePrimary.data[i].comunity,datoslola[i],0);
                }
                
                 for (var i = 0; i < responseGoal.data.length; i++) {
                    dataPlace.push(responseGoal.data[i].stadium );
                    datoslola.push("");
                    goals.push(responseGoal.data[i].goal);
                     conjunto.push(responseGoal.data[i].stadium,0,responseGoal.data[i].goal);
                }


console.log(responsePrimary.data);*/

            $http
                .get(api + '?apikey=' + $rootScope.apikey)
                .then(function(response) {

                    var footballData = response.data;

                    $http
                        .get('https://sos1718-10.herokuapp.com/api/v1/buses/')
                        .then(function(response) {

                            var univData = response.data;
                            
                            var data = ['community', 'goal/transportedTraveler'];
                            var goals= [];
                            var transport = [];
                            
                            footballData.map(function(d) {
                                data.push([d['stadium'],d['goal']]);
                                goals.push(d['goal']);
                               conjunto.push([d['stadium'],d['goal'],"0"]);
                            });

                            univData.map(function(d) {
                                data.push([d['community'],d['transportedTraveler']]);
                                 transport.push(d['transportedTraveler']/100);
                                conjunto.push([d['community'],"0",d['transportedTraveler']]);
                            });
                            console.log(data);

                           /*for (var i = 0; i < response.data.length; i++) {
                    
                    conjunto.push(univData.data[i].comunity,univData.data[i].transportedTraveler,"");
                }
                
                 for (var i = 0; i < footballData.length; i++) {
                    
                     conjunto.push(footballData.data[i].stadium,"",footballData.data[i].goal);
                }*/


                         console.log(conjunto);
                         
                    
                         var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
	"theme": "light",
    "titles": [{
        "text": "goals and transportedTraveler per country",
        "size": 15
    }],
    "legend": {
        "align": "center",
        "equalWidths": false,
        "periodValueText": "total: [[value.sum]]",
        "valueAlign": "left",
        "valueText": "[[value]] ([[percents]]%)",
        "valueWidth": 100
    },
    "dataProvider": [conjunto/*{
        "year": "2000",
        "cars": 1587,
        "motorcycles": 650,
        "bicycles": 121
    }, {
        "year": "1995",
        "cars": 1567,
        "motorcycles": 683,
        "bicycles": 146
    }, {
        "year": "1996",
        "cars": 1617,
        "motorcycles": 691,
        "bicycles": 138
    }, {
        "year": "1997",
        "cars": 1630,
        "motorcycles": 642,
        "bicycles": 127
    }, {
        "year": "1998",
        "cars": 1660,
        "motorcycles": 699,
        "bicycles": 105
    }, {
        "year": "1999",
        "cars": 1683,
        "motorcycles": 721,
        "bicycles": 109
    }, {
        "year": "2000",
        "cars": 1691,
        "motorcycles": 737,
        "bicycles": 112
    }, {
        "year": "2001",
        "cars": 1298,
        "motorcycles": 680,
        "bicycles": 101
    }, {
        "year": "2002",
        "cars": 1275,
        "motorcycles": 664,
        "bicycles": 97
    }, {
        "year": "2003",
        "cars": 1246,
        "motorcycles": 648,
        "bicycles": 93
    }, {
        "year": "2004",
        "cars": 1218,
        "motorcycles": 637,
        "bicycles": 101
    }, {
        "year": "2005",
        "cars": 1213,
        "motorcycles": 633,
        "bicycles": 87
    }, {
        "year": "2006",
        "cars": 1199,
        "motorcycles": 621,
        "bicycles": 79
    }, {
        "year": "2007",
        "cars": 1110,
        "motorcycles": 210,
        "bicycles": 81
    }, {
        "year": "2008",
        "cars": 1165,
        "motorcycles": 232,
        "bicycles": 75
    }, {
        "year": "2009",
        "cars": 1145,
        "motorcycles": 219,
        "bicycles": 88
    }, {
        "year": "2010",
        "cars": 1163,
        "motorcycles": 201,
        "bicycles": 82
    }, {
        "year": "2011",
        "cars": 1180,
        "motorcycles": 285,
        "bicycles": 87
    }, {
        "year": "2012",
        "cars": 1159,
        "motorcycles": 277,
        "bicycles": 71
    }],
    "valueAxes": [{
        "stackType": "100%",
        "gridAlpha": 0.07,
        "position": "left",
        "title": "percent"
    }*/],
    "graphs": [{
        "balloonText": "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
        "fillAlphas": 0.5,
        "lineAlpha": 0.5,
        "title": "Cars",
        "valueField": "cars"
    }, {
        "balloonText": "<img src='https://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
        "fillAlphas": 0.5,
        "lineAlpha": 0.5,
        "title": "Motorcycles",
        "valueField": "motorcycles"
    }],
    "plotAreaBorderAlpha": 0,
    "marginLeft": 0,
    "marginBottom": 0,
    "chartCursor": {
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "country",
    "categoryAxis": {
        "startOnAxis": true,
        "axisColor": "#DADADA",
        "gridAlpha": 0.07
    },
    "export": {
    	"enabled": true
     }
});




                        });

      

      });
}]);
