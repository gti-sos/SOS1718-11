 /*global angular*/
 /* global anychart*/
 /* global chartData*/

 angular.module("StatsManagerApp").controller("FootballIntegration3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
     console.log("List Football Ctrl initialized!");

     if (!$rootScope.apikey) $rootScope.apikey = "scraping";
     var api = "/api/v2/secure/football-stats";
     var conjunto = [];
     var conjunto2 = [];

     // var myJSON= {stadium:"",goal:0 ,transportedTraveler:0 };


     $http.get(api + '?apikey=' + $rootScope.apikey).then(function(response) {

         var footballData = response.data;
         console.log(footballData);

         $http.get('https://sos1718-10.herokuapp.com/api/v1/buses').then(function(response) {

             var univData = response.data;
                
            for (var i = 0; i < footballData.length; i++) {
                conjunto2.push([footballData[i].stadium,footballData[i].goal,0]);
            }
             footballData.map(function(d) {
                 conjunto.push({ stadium: d['stadium'], goal: d['goal'], transportedTraveler: 0 });
                 // conjunto2.push([d['stadium'],d['goal'],0]);
               //  for (var i = 0; i < footballData.length; i++) {
                    // conjunto2.push([d.stadium,d.goal,0]);
                     
                     
                     
                // }
             }); 
             univData.map(function(d) {
                 for (var i = 0; i < conjunto.length; i++) {
                     //console.log(conjunto[i])
                     if (conjunto[i].stadium == d['community']) {
                         conjunto[i].transportedTraveler = parseInt(d['transportedTraveler'] / 100);
                     }
                    /*  if (conjunto2[i].includes(d['community'])) {
                     // console.log("jack hemos encontrado algo")
                     conjunto2[i].splice(2, 1, parseInt(d['transportedTraveler']));
                 }*/
                 }

                 //Creamos el array




                
                 //  conjunto.push([d['community'],0,(parseInt(d['transportedTraveler']))]);


             });

             console.log(conjunto);
             console.log("Conjunto 2: " + conjunto2);


             //Aqui mete las graficas


             // create data set on our data
             chartData = {
                 title: 'Average temperature in London',
                 header: ['#', 'Day (max)', 'Night (min)'],
                 rows: /*[
                     ['January', 8.1, 2.3],
                     ['February', 8.4, 2.1],
                     ['March', 11.4, 3.9],
                     ['April', 14.2, 5.5],
                     ['May', 17.9, 8.7],
                     ['June', 21.1, 11.7],
                     ['July', 23.5, 13.9],
                     ['August', 23.2, 13.7],
                     ['September', 19.9, 11.4],
                     ['October', 15.6, 8.4],
                     ['November', 11.2, 4.9],
                     ['December', 8.3, 2.7]
                 ]*/conjunto
             };

             // create radar chart
             var chart = anychart.radar();

             // set default series type
             chart.defaultSeriesType('area');

             // set chart data
             chart.data(chartData);

             // set chart yScale settings
             chart.yScale()
                 .minimum(0)
                 .maximumGap(0)
                 .ticks({
                     interval: 5
                 });

             // set axes labels settings
             chart.xAxis().labels().padding(5);

             // set chart legend settings
             chart.legend()
                 .align('center')
                 .enabled(true);

             // set tooltip format
             chart.tooltip().format('Temperature: {%Value}?');

             // set container id for the chart
             chart.container('container');
             // initiate chart drawing
             chart.draw();
         });












         /*
         var chart = AmCharts.makeChart("chartdiv", {
             "theme": "light",
             "type": "serial",
             "dataProvider":conjunto/* [{
                 "country": "USA",
                 "year2004": 3.5,
                 "year2005": 4.2
             }, {
                 "country": "UK",
                 "year2004": 1.7,
                 "year2005": 3.1
             }, {
                 "country": "Canada",
                 "year2004": 2.8,
                 "year2005": 2.9
             }, {
                 "country": "Japan",
                 "year2004": 2.6,
                 "year2005": 2.3
             }, {
                 "country": "France",
                 "year2004": 1.4,
                 "year2005": 2.1
             }, {
                 "country": "Brazil",
                 "year2004": 2.6,
                 "year2005": 4.9
             }]*/
         /*,
             "valueAxes": [{
                 "unit": "",
                 "position": "left",
                 "title": "goles y gente que coje los buses",
             }],
             "startDuration": 1,
             "graphs": [{
                 "balloonText": "Goles in [[category]]: <b>[[value]]</b>",
                 "fillAlphas": 0.9,
                 "lineAlpha": 0.2,
                 "title": "2004",
                 "type": "column",
                 "valueField": "goal"
             }, {
                 "balloonText": "Gente en el bus in [[category]]: <b>[[value]]</b>",
                 "fillAlphas": 0.9,
                 "lineAlpha": 0.2,
                 "title": "2005",
                 "type": "column",
                 "clustered":false,
                 "columnWidth":0.5,
                 "valueField": "transportedTraveler"
             }],
             "plotAreaFillAlphas": 0.1,
             "categoryField": "stadium",
             "categoryAxis": {
                 "gridPosition": "start"
             },
             "export": {
             	"enabled": true
              }

         });*/



     });



     // });

 }]);
 