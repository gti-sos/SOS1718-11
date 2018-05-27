 /*global angular*/
 /*global RGraph*/


 angular

  .module("StatsManagerApp")
  .controller("BaseballApiExtCtrl", ["$scope", "$http", function($scope, $http) {



   var api = "https://api.github.com/users";


   $http.get(api).then(function(res) {

    var x = [];
    var y = [];

    for (var i = 0; i < 8; i++) {

     var d = res.data.map(function(l) {
      return l.id;
     });
     y.push(d[i]);
    }

    for (var i = 0; i < 8; i++) {

     var d1 = res.data.map(function(l) {
      return l.login;
     });
     x.push(d1[i]);
    }

    console.log(x);



    new RGraph.SVG.Pie({
     id: 'chart-container',
     data: [1, 1, 1, 1, 1, 1, 1, 1],
     options: {
      tooltipsEvent: 'mousemove',
      highlightStyle: 'outline',
      labelsSticksHlength: 50,
      tooltips: y,
      key: x
     }
    }).draw();


   });


  }]);
 