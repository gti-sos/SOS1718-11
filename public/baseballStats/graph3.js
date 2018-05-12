 /*global angular*/
 /*global echarts*/


 angular

  .module("StatsManagerApp")
  .controller("BaseballGraph3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

   if (!$rootScope.apikey) $rootScope.apikey = "scraping";

   var api = "/api/v2/secure/baseball-stats";

   var dataCache = {};


   var hit = {};
   var stadium = [];
   var properties = "";


   $http
    .get(api + "?apikey=" + $rootScope.apikey)
    .then(function(response) {
     dataCache = response.data;
     var d1 = [];
     stadium = response.data.map(function(n) {
      return n["stadium"];
     });

     hit = response.data.map(function(h) {
      return parseInt(h["hit"]);
     });
     for (var i = 0; i < dataCache.length; i++) {

      d1.push({ value: hit[i], name: stadium[i] });

     }

     var dom = document.getElementById("graph3");
     var myChart = echarts.init(dom);
     var option = null;
     option = {
      title: {
       text: 'Hits',
       x: 'center'
      },
      tooltip: {
       trigger: 'item',
       formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
       x: 'center',
       y: 'bottom',
       data: stadium
      },
      toolbox: {
       show: true,
       feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
         show: true,
         type: ['pie', 'funnel']
        },
        restore: { show: true },
        saveAsImage: { show: true }
       }
      },
      calculable: true,
      series: [{
       name: 'Hits',
       type: 'pie',
       radius: [60, 160],
       center: ['50%', '50%'],
       roseType: 'area',
       data: d1
      }]
     };
     if (option && typeof option === "object") {
      myChart.setOption(option, true);
     }
    });


   $scope.searchGraph3 = function() {
    properties = "";

    try {

     if ($scope.searchGraph3.date) {
      properties = "&date=" + $scope.searchGraph3.date;
     }

    }
    catch (error) {
     console.log("Failed search");
    }


    $http
     .get(api + "?apikey=" + $rootScope.apikey)
     .then(function(response) {

      dataCache = response.data;

      var d = [];

      stadium = response.data.map(function(n) {
       return n["stadium"];
      });

      hit = response.data.map(function(h) {
       return parseInt(h["hit"]);
      });

      for (var i = 0; i < dataCache.length; i++) {

       d.push({ value: hit[i], name: stadium[i] });

      }

      var dom = document.getElementById("graph3");
      var myChart = echarts.init(dom);
      var option = null;
      option = {
       title: {
        text: 'Hits',
        x: 'center'
       },
       tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
       },
       legend: {
        x: 'center',
        y: 'bottom',
        data: stadium
       },
       toolbox: {
        show: true,
        feature: {
         mark: { show: true },
         dataView: { show: true, readOnly: false },
         magicType: {
          show: true,
          type: ['pie', 'funnel']
         },
         restore: { show: true },
         saveAsImage: { show: true }
        }
       },
       calculable: true,
       series: [{
        name: 'Hits',
        type: 'pie',
        radius: [60, 160],
        center: ['50%', '50%'],
        roseType: 'area',
        data: d
       }]
      };
      if (option && typeof option === "object") {
       myChart.setOption(option, true);
      }

     });

   }
  }]);
 