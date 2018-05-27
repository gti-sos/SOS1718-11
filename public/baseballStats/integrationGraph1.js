 /*global angular*/
 /*global Highcharts*/


 angular

  .module("StatsManagerApp")
  .controller("integrationGraph1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

   if (!$rootScope.apikey) $rootScope.apikey = "scraping";

   var api = "/api/v2/secure/baseball-stats";
   var apiEx1 = "/proxyMLS/api/v1/world-stats";
   var properties = "";
   var dataCache = {};
   var dataCacheEx = {};


   var stadium = [];
   var hit = [];
   var country = [];
   var sale = [];



   Highcharts.chart('container', {
    chart: {
     type: 'scatter',
     zoomType: 'xy'
    },
    title: {
     text: 'Hits & Sales'
    },
    subtitle: {
     text: ''
    },
    xAxis: {
     title: {
      enabled: true,
      text: 'Stadium or Countrie'
     },
     startOnTick: true,
     endOnTick: true,
     showLastLabel: true
    },
    yAxis: {
     title: {
      text: 'Hits & Sales'
     }
    },
    legend: {
     layout: 'vertical',
     align: 'left',
     verticalAlign: 'top',
     x: 30,
     y: 70,
     floating: true,
     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
     borderWidth: 1
    },
    plotOptions: {
     scatter: {
      marker: {
       radius: 10,
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
       pointFormat: '{point.x} , {point.y}'
      }
     }
    },

    //[161.2, 51.6]
    series: [{
     name: 'Hits',
     color: 'rgba(223, 83, 83, .5)',
     data: []

    }, {
     name: 'Sales',
     color: 'rgba(119, 152, 191, .5)',
     data: []
    }]
   });






   $scope.searchGraph1 = function() {
    properties = "";

    try {

     if ($scope.searchGraph1.date) {
      properties = "&date=" + $scope.searchGraph1.date;
     }

    }
    catch (error) {
     console.log("Failed search");
    }



    $http
     .get(api + "?apikey=" + $rootScope.apikey + properties)
     .then(function(response2) {

      $http.get(apiEx1).then(function(response1) {


       dataCache = response2.data;
       dataCacheEx = response1.data;
       var d = [];
       var d1 = [];
       var x=[];

       country = response1.data.map(function(c) {

        return c["country"];

       });
       console.log(country);


       sale = response1.data.map(function(v) {
        return parseInt(v["sale"]);
       });


       stadium = response2.data.map(function(s) {

        return s["stadium"];

       });

       hit = response2.data.map(function(h) {
        return parseInt(h["hit"]);
       });




       for (var i = 0; i < dataCacheEx.length; i++) {

        d1.push([country[i], sale[i]]);
        x.push(country[i]);
       }




       for (var i = 0; i < dataCache.length; i++) {

        d.push([stadium[i], hit[i]]);
        x.push(stadium[i]);

       }


      

       Highcharts.chart('container', {
        chart: {
         type: 'scatter',
         zoomType: 'xy'
        },
        title: {
         text: 'Hits & Sales'
        },
        subtitle: {
         text: ''
        },
        xAxis: {
         type: 'category',
         categories: x,
         title: 'Hits & Sales',
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
         title: 'Hits & Sales'
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
         name: 'Hits',
         color: 'rgba(223, 83, 83, .5)',
         data: d

        }, {
         name: 'Sales',
         color: 'rgba(119, 152, 191, .5)',
         data: d1
        }]
       });

       //console.log(JSON.stringify(dataCache, null, 2));


      });
     });

   };


  }]);
 