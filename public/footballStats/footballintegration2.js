/* global angular */
/* global Highcharts */
angular.module("StatsManagerApp").controller("FootballIntegration2Ctrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    
       if(!$rootScope.apikey) $rootScope.apikey = "scraping";
       var api ="/api/v2/secure/football-stats";
       
       
      /*  $http
                .get(api + '?apikey=' + $rootScope.apikey)
                .then(function(response) {

                    var datache = response.data;

                    $http
                        .get('https://sos1718-02.herokuapp.com/api/v2/expenditures')
                        .then(function(response) {

                            var datacheandres = response.data;
                            
                            var data = [];
                            
                            datache.map(function(d) {
                                data.push([d['stadium'],d['goal']]);
                            })

                            datacheandres.map(function(d) {
                                data.push([d['country'],d['primary'].length]);
                            })
                            console.log(data);    */
       
       
       
       
       
       
         var dataPlace=[];
        var datosandres=[];
        var goals=[];
       
        
        
        $http.get("https://sos1718-02.herokuapp.com/api/v2/expenditures").then(function doneFilter(responsePrimary){
             $http.get(api + '?apikey=' + $rootScope.apikey).then(function doneFilter(responseGoal){
                 
                 
                 for (var i = 0; i < responsePrimary.data.length; i++) {
                    dataPlace.push(responsePrimary.data[i].country);
                    datosandres.push(parseInt(responsePrimary.data[i].primary));
                    goals.push("");
                }
                
                 for (var i = 0; i < responseGoal.data.length; i++) {
                    dataPlace.push(responseGoal.data[i].stadium );
                    datosandres.push("");
                    goals.push(responseGoal.data[i].goal);
                }

  Highcharts.chart('container', {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'G02-G11'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: dataPlace
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'expendidures',
        data: datosandres 
    }, {
        name: 'goals',
        data: goals
    }]
});
                    
       




/*Highcharts.chart('container', {
  chart: {
    type: 'pyramid'
  },
  title: {
    text: 'goals and xxx pyramid',
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
    name: 'Unique users',
    data: data
  }]
});


/*Highcharts.chart('container', {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false
  },
  title: {
    text: 'Browser<br>shares<br>2017',
    align: 'center',
    verticalAlign: 'middle',
    y: 40
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        distance: -50,
        style: {
          fontWeight: 'bold',
          color: 'white'
        }
      },
      startAngle: -90,
      endAngle: 90,
      center: ['50%', '75%']
    }
  },
  series: [{
    type: 'pie',
    name: 'Browser share',
    innerSize: '50%',
    data: [
      ['Chrome', 58.9],
      ['Firefox', 13.29],
      ['Internet Explorer', 13],
      ['Edge', 3.78],
      ['Safari', 3.42],
      {
        name: 'Other',
        y: 7.61,
        dataLabels: {
          enabled: false
        }
      }
    ]
  }]
});*/

});
});
}]);