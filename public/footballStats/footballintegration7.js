 /*global angular*/
 /* global $ */
 /* global anychart*/

 angular.module("StatsManagerApp").controller("FootballIntegration7Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
  console.log("List Football Ctrl initialized!");

  if (!$rootScope.apikey) $rootScope.apikey = "scraping";
  var api = "/api/v2/secure/football-stats";
  var datos;
  var arraydatos = [];
  var cadena = [];
 /*
  // These code snippets use an open-source library. http://unirest.io/nodejs
unirest.post("https://neutrinoapi-phone-validate.p.mashape.com/phone-validate")
.header("X-Mashape-Key", "wj5Jta9fcDmsh7PfXVdCReCNcEuZp1yhPdcjsniaFBKybbEeDM")
.header("Content-Type", "application/x-www-form-urlencoded")
.header("Accept", "application/json")
.send("country-code=GB")
.send("number=+447522123456")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
*/
  $scope.buscarEmail = function() {
   datos = $scope.datobusqueda;
   console.log("Dentro " + datos);
   //JSON.stringify(datos);
   arraydatos = datos.split("@");
   console.log("Correo separado " + arraydatos[0]);


   var mashape = {
    method: 'POST',
    url: "https://neutrinoapi-phone-validate.p.mashape.com/phone-validate",
    headers: {
     "X-Mashape-Key": "wj5Jta9fcDmsh7PfXVdCReCNcEuZp1yhPdcjsniaFBKybbEeDM",
     "content-type": "application/x-www-form-urlencoded",
     "Accept": "application/json"
    
     
    }
   };
   mashape.send("country-code=GB")
mashape.send("number=+447522123456")
   console.log(cadena);
   $http.get(api + '?apikey=' + $rootScope.apikey).then(function(response) {
    console.log(cadena);
    var footballData = response.data;
   
   
    for (var i = 0; i < footballData.length; i++) {
     cadena.push(footballData[i].stadium)
    }
    console.log(cadena);


    $http(mashape).then(function(response) {

     var emailData = response.data;


   

     console.log(JSON.stringify(emailData));

     if (emailData["isValid"]==true) {
      console.log("encontrado");
      for (var i = 0; i < 5; i++) {
       cadena.push(" EMAIL_ENCONTRADO ");
      }
     }




     anychart.onDocumentReady(function() {
      $.ajax('https://cdn.anychart.com/samples/tag-cloud/alice-in-wonderland/text.txt').done(function(text) {
       // create tag cloud
       var chart = anychart.tagCloud();
       // set data with settings
       chart.data(JSON.stringify(cadena,undefined,2), {
        mode: 'by-word',
        minLength: 1,
        maxItems: 200
       });
       // set chart title
       chart.title('Si encuentras un EMAIL ENCONTRADO el email sera valido')
        // set array of angles, by which words will be placed
        .angles([0])
        // enabled color range
        .colorRange(true)
        // set color scale
        .colorScale(anychart.scales.ordinalColor())
        // set settings for normal state
        .normal({
         fontFamily: 'Times New Roman'
        })
        // set settings for hovered state
        .hovered({
         fill: '#df8892'
        })
        // set settings for selected state
        .selected({
         fill: '#df8892',
         fontWeight: 'bold'
        });

       // set container id for the chart
       chart.container('container');
       // initiate chart drawing
       chart.draw();
      });
     });





    });




   });
cadena=[];
  };

 }]);
 