 /*global angular*/
 /*global RGraph*/


 angular

     .module("StatsManagerApp")
     .controller("BaseballApiExtCtrl", ["$scope", "$http","$rootScope", function($scope, $http, $rootScope) {


         var api = "/api/v2/secure/baseball-stats";
         var properties = "";

         if (!$rootScope.apikey) $rootScope.apikey = "scraping";
         var api2 = "https://api.github.com/users";


         $http
             .get(api + "?apikey=" + $rootScope.apikey + properties)
             .then(function(res1) {
                 $http.get(api2).then(function(res) {

                     var x = [];
                     var y = [];
                     var t= [];

                     for (var i = 3; i < 9; i++) {

                         var d = res.data.map(function(l) {
                             return l.id;
                         });
                         
                         var d1 = res1.data.map(function(l1) {
                             return l1.hit;
                         });
                         y.push([d[i], i]);
                         y.push([d1[i], i]);
                         t.push(d[i]);
                         t.push(d1[i]);
                         
                         
                     }

                     for (var i = 3; i < 9; i++) {

                         var r = res.data.map(function(l) {
                             return l.login;
                         });
                          var r1 = res1.data.map(function(l) {
                             return l.stadium;
                         });
                         x.push(r[i]);
                         x.push(r1[i]);
                     }

                     console.log(x);

                     rose = new RGraph.SVG.Rose({
                         id: 'chart-container',
                         data: y,
                         options: {
                             strokestyle: 'white',
                             linewidth: 3,
                             variant: 'non-equi-angular',
                             colorsSequential: true,
                             colorsOpacity: 0.6,
                             tooltips: t,
                             labels: x,
                             textSize: 8
                         }
                     }).draw();

                 });
             });


     }]);
 