 /*global angular*/
 /*global anychart*/



 angular

  .module("StatsManagerApp")
  .controller("Baseballapiext2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

   $http.get("https://swapi.co/api/planets/").then(function(response) {

    var datos = response.data.results;
     var r=[];
    console.log(datos[0]);
    
    datos.map(function(d){
      r.push({
     "name":d.name,
     "value":  d.surface_water
    });
    });

    
    anychart.onDocumentReady(function() {
     // prepare data for the chart
     var data = r;

     // create funnel chart
     var chart = anychart.funnel(data);

     // set chart background color
     chart.background('#F5F1F0');

     // set chart legend settings
     chart.legend(true)
      .padding()
      .top(20);

     // set chart title
     chart.title('Surface Water')
      // set chart base width settings
      .baseWidth('70%')
      // set the neck height
      .neckHeight('0%');

     // set chart labels settings
     chart.labels()
      .position('outside-left')
      .format('{%Name} - {%Value}%');

     // set container id for the chart
     chart.container('water');

     // initiate chart drawing
     chart.draw();
    });


   });



  }]);
 