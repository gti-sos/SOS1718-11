/*global angular*/
/*global AmCharts*/


angular
 .module("StatsManagerApp")
 .controller('counCheck', ['$scope', '$http', "$rootScope", function($scope, $http, $rootscope) {

  var api;
  var apiPro = "/api/v2/baseball-stats";
  var properties = "";

  var data;


  $scope.submit = function() {
   $scope.url = 'https://restcountries-v1.p.mashape.com/name/' + $scope.name;
   console.log($scope.url);
   var counReq = {
    method: 'GET',
    url: $scope.url,
    headers: {
     "X-Mashape-Key": "qzNMKpERJImshMR1jLFEtbpkqqtgp1QCdxDjsn9ZoeO1sRfQU2", //get an api key at mashape.com
     "Accept": "application/json"
    }
   };
   if ($scope.stadium != undefined) {

    properties = "?limit=1&stadium=" + $scope.stadium;
    api = apiPro;

   }

   if ($scope.name != undefined) {

    properties = "";
    api = $scope.url;

   }

   $http
    .get(api + properties)
    .then(function(response) {

     if (api == apiPro) {
      response.data.map(function(l) {
       $scope.hit = parseInt(l.hit);
      });
      response.data.map(function(l) {
       $scope.run = parseInt(l.run);
      });
      response.data.map(function(l) {
       $scope.error = parseInt(l.error);
      });

      data = [{
        "country": "Hit",
        "litres": $scope.hit
       },
       {
        "country": "Run",
        "litres": $scope.run
       },
       {
        "country": "Error",
        "litres": $scope.error
       }
      ];

     }

     if (api == $scope.url) {
      response.data.map(function(l) {
       $scope.area = parseInt(l.area);
      });

      response.data.map(function(l) {
       $scope.population = parseInt(l.population);
      });
      response.data.map(function(l) {
       $scope.gini = parseInt(l.gini);
      });
      data = [{
        "country": "Area",
        "litres": $scope.area
       },
       {
        "country": "Population",
        "litres": $scope.population
       },
       {
        "country": "Gini",
        "litres": $scope.gini
       }
      ];
      console.log(data);

     }


     var chart = AmCharts.makeChart("chartdiv", {
      "type": "radar",
      "theme": "light",
      "dataProvider": data,
      "valueAxes": [{
       "axisTitleOffset": 20,
       "minimum": 0,
       "axisAlpha": 0.15
      }],
      "startDuration": 2,
      "graphs": [{
       "balloonText": "[[value]] ",
       "bullet": "round",
       "lineThickness": 2,
       "valueField": "litres"
      }],
      "categoryField": "country",
      "export": {
       "enabled": true
      }
     });




    });
  };

 }]);




/*
 angular
  .module("StatsManagerApp")
  .controller('counCheck', ['$scope', '$http', "$rootScope", function($scope, $http, $rootscope) {

   $scope.submit = function() {
    $scope.url = 'https://restcountries-v1.p.mashape.com/name/' + $scope.name;
    console.log($scope.url);
    var counReq = {
     method: 'GET',
     url: $scope.url,
     headers: {
      "X-Mashape-Key": "qzNMKpERJImshMR1jLFEtbpkqqtgp1QCdxDjsn9ZoeO1sRfQU2", //get an api key at mashape.com
      "Accept": "application/json"
     }
    };
    console.log(counReq);
    $http(counReq)
     .then(function(response) {


      console.log(response.data);
      console.log(response.data.map(function(l) {
       return l.population;
      }));
      response.data.map(function(l) {
       $scope.area = parseInt(l.area);
      });

      response.data.map(function(l) {
       $scope.population = parseInt(l.population);
      });
      response.data.map(function(l) {
       $scope.gini = parseInt(l.gini);
      });

      var data=[{
       "country": "Population",
       "litres": $scope.population
      },
      {
       "country": "Area",
       "litres": $scope.area
      },
      {
       "country": "Gini",
       "litres": $scope.gini
      }
      ];

      var chart = AmCharts.makeChart("chartdiv", {
       "type": "radar",
       "theme": "light",
       "dataProvider":data,
       "valueAxes": [{
        "axisTitleOffset": 20,
        "minimum": 0,
        "axisAlpha": 0.15
       }],
       "startDuration": 2,
       "graphs": [{
        "balloonText": "[[value]] ",
        "bullet": "round",
        "lineThickness": 2,
        "valueField": "litres"
       }],
       "categoryField": "country",
       "export": {
        "enabled": true
       }
      });
     })
   
  
    
   };
 
  }]);
  */
