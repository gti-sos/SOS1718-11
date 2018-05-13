/* global angular */
/* global Highcharts */
angular.module("StatsManagerApp").controller("FootballIntegrationCtrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    
       if(!$rootScope.apikey) $rootScope.apikey = "scraping";
       var api ="/api/v2/secure/football-stats";
    var apibalta="/proxyBalta";
      
   
      var stadium = [];
      var goal = [];
      var autCommunity = [];
      var enrolledNumber = [];
           

$http.get(api + "?apikey=" + $rootScope.apikey)
     .then(function(response2) {

      $http.get(apibalta).then(function(response1) {


       var datacache = response2.data;
      var  datacacheBalta = response1.data;
       var d = [];
       var d1 = [];
       var todo =[];      
       var x=[];

       autCommunity = response1.data.map(function(c) {

        return c["autCommunity"];

       });



       enrolledNumber = response1.data.map(function(e) {
        return parseInt(e["enrolledNumber"]);
       });


       stadium = response2.data.map(function(s) {

        return s["stadium"];

       });

       goal = response2.data.map(function(g) {
        return parseInt(g["goal"]);
       });




       for (var i = 0; i < datacacheBalta.length; i++) {

        d1.push([autCommunity[i], enrolledNumber[i]]);
        x.push(autCommunity[i]);
        todo.push([autCommunity[i], enrolledNumber[i]]);
       }




       for (var i = 0; i < datacache.length; i++) {

        d.push([stadium[i], goal[i]]);
        x.push(stadium[i]);
       todo.push([stadium[i], goal[i]]);
       }

console.log(d);
console.log(d1);
console.log(todo);



       Highcharts.chart('container', {
        chart: {
         type: 'scatter',
         zoomType: 'xy'
        },
        title: {
         text: 'Goals & Enrrolled'
        },
        subtitle: {
         text: ''
        },
        xAxis: {
         type: 'category',
         categories: x,
         title: 'Goals & Enrrolled',
         labels: {
          
          rotation: -45,
          style: {
           fontSize: '13px',
           fontFamily: 'Verdana, sans-serif'
          }
         }
         ,
         startOnTick: true,
         endOnTick: true,
         showLastLabel: true
        },
        yAxis: {
         type: 'category',
         title: 'Goals & enrolledNumber'
        },
        legend: {
         layout: 'vertical',
         align: 'left',
         verticalAlign: 'top',
         x: 100,
         y: 70,
         floating: true,
         backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
         borderWidth: 1
        },
        plotOptions: {
         scatter: {
          marker: {
           radius: 5,
           states: {
            hover: {
             enabled: true,
             lineColor: 'rgb(100,100,100)'
            }
           }
          },
          states: {
           hover: {
            marker: {
             enabled: false
            }
           }
          },
          tooltip: {
           headerFormat: '<b>{series.name}</b><br>',
           pointFormat: ' {point.y} '
          }
         }
        },

        //[161.2, 51.6]
        series: [{
         name: 'Goals',
         color: 'rgba(223, 83, 83, .5)',
         data: d

        }, {
         name: 'enrolledNumber',
         color: 'rgba(119, 152, 191, .5)',
         data: d1
        }]
       });



/*Highcharts.chart('container', {

  chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zoomType: 'xy'
  },

  title: {
    text: 'Goals & Enrrolled'
  },

  xAxis: {
    gridLineWidth: 1
  },

  yAxis: {
    startOnTick: false,
    endOnTick: false
  },

  series: [{
    data: [
      [9, 81, 63],
      [98, 5, 89],
      [51, 50, 73],
      [41, 22, 14],
      [58, 24, 20],
      [78, 37, 34],
      [55, 56, 53],
      [18, 45, 70],
      [42, 44, 28],
      [3, 52, 59],
      [31, 18, 97],
      [79, 91, 63]

    ],
    marker: {
      fillColor: {
        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
        stops: [
          [0, 'rgba(255,255,255,0.5)'],
          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
        ]
      }
    }
  }, {
    data: [
      [42, 38, 20],
      [6, 18, 1],
      [1, 93, 55],
      [57, 2, 90],
      [80, 76, 22],
      [11, 74, 96],
      [88, 56, 10],
      [30, 47, 49],
      [57, 62, 98],
      [4, 16, 16],
      [46, 10, 11],
      [22, 87, 89],
      [57, 91, 82],
      [45, 15, 98]
    ],
    marker: {
      fillColor: {
        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
        stops: [
          [0, 'rgba(255,255,255,0.5)'],
          [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
        ]
      }
    }
  }]

});*/




      });
     });

   


  }]);

