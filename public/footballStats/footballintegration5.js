 /*global angular*/
 /*global google*/
 /* global AmCharts */
 /* global jQuery*/
 /* global $ */
 /* global RGraph */ 



 angular.module("StatsManagerApp").controller("FootballIntegration5Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
     console.log("List Football Ctrl initialized!");

     if (!$rootScope.apikey) $rootScope.apikey = "scraping";
     var api = "/api/v2/secure/football-stats";
     var datos;
     var estadio = [];
     var goles = [];
     var  iotgoles=[];
     var  sumatorio=0;
     // var myJSON= {stadium:"",goal:0 ,transportedTraveler:0 };







           //Aqui mete las graficas
           /*     window.onload = function ()
    {
        var meter = new RGraph.Meter({
            id: 'cvs',
            min: 0,
            max: 100,
            value: 75,
            options: {
                backgroundColor: 'black',
                anglesStart: RGraph.PI - 0.55,
                anglesEnd: RGraph.TWOPI + 0.5,
                centery: 300,
                textSize: 22,
                textColor: 'white',
                textValign: 'bottom',
                greenColor: '#0a0',
                segmentRadiusStart: 175,
                border: 0,
                tickmarksSmallNum: 0,
                tickmarksBigNum: 0,
                needleRadius: 250,
                needleColor: '#ddd',
                centerpinStroke: 'black',
                centerpinFill: '#ddd',
                textAccessible: false
            }
        }).on('beforedraw', function (obj)
        {
            RGraph.clear(obj.canvas, 'black');
        }).draw()

        meter.canvas.onclick = function (e)
        {
            var newvalue = meter.getValue(e);
            
            meter.value = newvalue;
            meter.grow();
        }
    };


*/



     $scope.buscarCiudad = function() {
         datos = $scope.datobusqueda;
         console.log("Dentro " + datos);



         console.log(datos);

         $http.get(api + '?apikey=' + $rootScope.apikey).then(function(response) {

             var footballData = response.data;
             console.log(footballData);

             for (var i = 0; i < footballData.length; i++) {
                 if (footballData[i].stadium == datos) {
                     estadio.push(footballData[i].stadium);
                     goles.push(footballData[i].goal);
                     sumatorio+=parseInt(footballData[i].goal);
                 }
             }
             console.log(estadio);
             
             console.log(" Estos son los goles " + goles);


             $http.get('https://api.shodan.io/shodan/host/count?key=u6s7e9SNPRDUxknQ3BmhmYRISqNIcxuy&query={' + datos + '}&facets={city}').then(function(response) {

                 var shodanData = response.data;

                 console.log(shodanData);
                 console.log(JSON.stringify(shodanData));
                 console.log("total "+parseInt(shodanData.total));
                 sumatorio+=parseInt(shodanData.total);
                 console.log("Sumatorio goles y dispositivos IOT : "+sumatorio);

                 //Aqui mete las graficas
                 
                
                 
                 
                 
                 var chart = AmCharts.makeChart("chartdiv", {
  "theme": "light",
  "type": "gauge",
  "axes": [{
    "topTextFontSize": 20,
    "topTextYOffset": 70,
    "axisColor": "#31d6ea",
    "axisThickness": 1,
    "endValue": 600,
    "gridInside": true,
    "inside": true,
    "radius": "50%",
    "valueInterval": 10,
    "tickColor": "#67b7dc",
    "startAngle": -90,
    "endAngle": 90,
    "unit": "%",
    "bandOutlineAlpha": 0,
    "bands": [{
      "color": "#0080ff",
      "endValue": 600,
      "innerRadius": "105%",
      "radius": "170%",
      "gradientRatio": [0.5, 0, -0.5],
      "startValue": 0
    }, {
      "color": "#3cd3a3",
      "endValue": 0,
      "innerRadius": "105%",
      "radius": "170%",
      "gradientRatio": [0.5, 0, -0.5],
      "startValue": 0
    }]
  }],
  "arrows": [{
    "alpha": 1,
    "innerRadius": "35%",
    "nailRadius": 0,
    "radius": "170%"
  }]
});

setInterval(randomValue, 2000);

// set random value
function randomValue() {
    
  var value = Math.round(Math.random() * 100);
  chart.arrows[0].setValue(sumatorio);
  chart.axes[0].setTopText(sumatorio + " %");
  // adjust darker band to new value
  chart.axes[0].bands[1].setEndValue(sumatorio);
  
}


                 
                 



             });




         });

     };


 }]);
 