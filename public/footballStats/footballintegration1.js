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
      var degree = [];
      var master = [];
      var corner = [];
           

$http.get(api + "?apikey=" + $rootScope.apikey)
     .then(function(response2) {

      $http.get(apibalta).then(function(response1) {


       var datacache = response2.data;
      var  datacacheBalta = response1.data;
       var d = [];
       var d1 = [];
       var todo =[];      
       var x=[];
       var golcor = [];
       var demas =[];
       var golesillos= [];
       var master2 = [];
       var corner2 = [];
       tomagol= [];

       autCommunity = response1.data.map(function(c) {

        return c["autCommunity"];

       });



       enrolledNumber = response1.data.map(function(e) {
        return parseInt(e["enrolledNumber"]/100000);
       });
        degree = response1.data.map(function(d) {
        return parseInt(d["degree"]);
       });
         master = response1.data.map(function(m) {
        return parseInt(m["master"]);
       });


       stadium = response2.data.map(function(s) {

        return s["stadium"];

       });

       goal = response2.data.map(function(g) {
        return parseInt(g["goal"]);
       });
        corner = response2.data.map(function(c) {
        return parseInt(c["corner"]);
       });
       






       for (var i = 0; i < datacacheBalta.length; i++) {

        d1.push([autCommunity[i], enrolledNumber[i]]);
        x.push(autCommunity[i]);
        todo.push([autCommunity[i], enrolledNumber[i]]);
        demas.push([degree[i], master[i]]);
        golesillos.push("");
        corner2.push("");
        master2.push(master[i]/10000);
        
       }




       for (var i = 0; i < datacache.length; i++) {

        d.push([stadium[i], goal[i]]);
        x.push(stadium[i]);
       todo.push([stadium[i], goal[i]]);
       golcor.push([goal[i], corner[i]]);
       
       golesillos.push(goal[i]);
        corner2.push(corner[i]);
        master2.push("");
       /*if(x.includes(stadium[i])){
        
       }else{
        x.push(stadium[i]);
       }*/
       }
       
       
       Highcharts.chart('container', {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Integration1'
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    categories: x,
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Population (millions)',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    valueSuffix: ' millions'
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
  series: [{
    name: 'Goals',
    data: golesillos
  }, {
    name: 'Corners',
    data: corner2
  }, {
    name: 'Masters',
    data: master
  
  }]
});

/*
       Highcharts.chart('container', {
  chart: {
    type: 'pyramid'
  },
  title: {
    text: 'goals and enrolledNumber ',
    x: -50
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b> ({point.y:,.0f})',
        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
        softConnector: true
      },
      center: ['40%', '50%'],
      width: '80%'
    }
  },
  legend: {
    enabled: false
  },
  series: [{
    name: 'Countrie Data',
    data: todo
  }]
});
        
      

//console.log(d);
//console.log(d1);
console.log(todo);
console.log (x);
//console.log(demas);





*/

/*
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


*/



      });
     });

   


  }]);

