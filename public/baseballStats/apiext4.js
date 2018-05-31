 /*global angular*/
 /*global echarts*/


 angular
  .module("StatsManagerApp")
  .controller('genderCheck', ['$scope', '$http', "$rootScope", function($scope, $http, $rootscope) {


   var api = "/api/v2/baseball-stats";
   var properties = "";

   $scope.submit = function() {
    $scope.url = 'https://udayogra-find-gender-by-name-v1.p.mashape.com/analysis?firstname=' + $scope.name;
    console.log($scope.url);
    var genderReq = {
     method: 'GET',
     url: $scope.url,
     headers: {
      "X-Mashape-Key": "qzNMKpERJImshMR1jLFEtbpkqqtgp1QCdxDjsn9ZoeO1sRfQU2", //get an api key at mashape.com
      "Accept": "application/json"
     }
    };
    console.log(genderReq);


    if ($scope.stadium != undefined) {
     properties = "?limit=1&stadium=" + $scope.stadium;
    }
    else {
     properties = "";
    }



    $http
     .get(api + properties)
     .then(function(response2) {

      response2.data.map(function(l) {
       $scope.hit = parseInt(l.hit);
      });
      response2.data.map(function(l) {
       $scope.run = parseInt(l.run);
      });
      response2.data.map(function(l) {
       $scope.error = parseInt(l.error);
      });

      var dom = document.getElementById("container");
      var myChart = echarts.init(dom);
      var app = {};
      option = null;
      app.title = 'Baseball Stats';


      var option = {
       tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
       },
       legend: {
        show: false,
        orient: 'vertical',
        x: 'right',
        data: ['Hit', 'Run', 'Error']
       },
       series: [{
        name: 'Baseball stats',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
         normal: {
          show: false,
          position: 'center',
          
         },
         emphasis: {
          show: true,
          textStyle: {
           fontSize: '30',
           fontWeight: 'bold'
          }
         }
        },
        labelLine: {
         normal: {
          show: false
         }
        },
        data: [
         { value: $scope.hit, name: 'Hit' },
         { value: $scope.run, name: 'Run' },
         { value: $scope.error, name: 'Error' }
        ]
       }]
      };
      if (option && typeof option === "object") {
       myChart.setOption(option, true);
      }
      $scope.stadium = undefined;
     });


    if ($scope.name != undefined) {

     $http(genderReq)
      .then(function(response) {


       console.log(response.data.male);

       $scope.female = parseInt(response.data.female);

       $scope.male = parseInt(response.data.male);
       var dom = document.getElementById("container");
       var myChart = echarts.init(dom);
       var app = {};
       option = null;
       app.title = 'Gender name';


       var option = {
        tooltip: {
         trigger: 'item',
         formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
         orient: 'horizontal',
         x: 'right',
         data: ['Male', 'Female']
        },
        series: [{
         name: 'Gender name',
         type: 'pie',
         radius: ['50%', '70%'],
         avoidLabelOverlap: false,
         label: {
          normal: {
           show: false,
           position: 'center'
          },
          emphasis: {
           show: true,
           textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
           }
          }
         },
         labelLine: {
          normal: {
           show: false
          }
         },
         data: [
          { value: $scope.female, name: '% Female' },
          { value: $scope.male, name:'% Male' }
         ]
        }]
       };
       if (option && typeof option === "object") {
        myChart.setOption(option, true);
       }

       $scope.name = undefined;
      });
    }

   };

  }]);
 