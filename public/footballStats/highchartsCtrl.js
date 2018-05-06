/* global angular */
angular.module("StatsManagerApp").controller("HighChartsCtrl", ["$scope","$http","$rootScope", function($scope,$http,$rootScope) {
    console.log("List Football Ctrl initialized!");
    var api ="/api/v2/secure/football-stats";
    
    if(!$rootScope.apikey) $rootScope.apikey = "scraping";
    
    
    $http.get(api +"/estadisticas" + "?apikey=" + $rootScope.apikey).then(function(response){
      var cont = 0;
      var data= response.data;
       var stadiumrep=[];
                for(var i=0; i<=(response.data.length)-1;i++){
                  for(var j=i+1; i<=response.data.length;j++){
                    if(data[i]==data[j]){
                      cont ++;
                      stadiumrep.push({stadium:data[i], numb: cont });
                    }
                    
                  }
                  
                }
    });
                    
      
      // Create the chart
Highcharts.chart('analytics', {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Stadium, 2018'
  },
  subtitle: {
    text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '{point.stadium}: {point.y}'
      }
    }
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.stadium}</span><br>',
    pointFormat: '<span style="color:{point.color}">{point.stadium}</span>: <b>{point.y:.2f}%</b> of total<br/>'
  },

  "series": [
    {
      "stadium": "Stadium",
      "colorByPoint": true,
      "data": [
        {
          "stadium": "Chrome",
          "y": 62.74,
          "drilldown": "Chrome"
        },
        {
          "stadium": "Firefox",
          "y": 10.57,
          "drilldown": "Firefox"
        },
        {
          "stadium": "Internet Explorer",
          "y": 7.23,
          "drilldown": "Internet Explorer"
        },
        {
          "stadium": "Safari",
          "y": 5.58,
          "drilldown": "Safari"
        },
        {
          "stadium": "Edge",
          "y": 4.02,
          "drilldown": "Edge"
        },
        {
          "stadium": "Opera",
          "y": 1.92,
          "drilldown": "Opera"
        },
        {
          "stadium": "Other",
          "y": 7.62,
          "drilldown": null
        }
      ]
    }
  ],
  "drilldown": {
    "series": [
      {
        "stadium": "Chrome",
        "id": "Chrome",
        "data": [
          [
            "v65.0",
            0.1
          ],
          [
            "v64.0",
            1.3
          ],
          [
            "v63.0",
            53.02
          ],
          [
            "v62.0",
            1.4
          ],
          [
            "v61.0",
            0.88
          ],
          [
            "v60.0",
            0.56
          ],
          [
            "v59.0",
            0.45
          ],
          [
            "v58.0",
            0.49
          ],
          [
            "v57.0",
            0.32
          ],
          [
            "v56.0",
            0.29
          ],
          [
            "v55.0",
            0.79
          ],
          [
            "v54.0",
            0.18
          ],
          [
            "v51.0",
            0.13
          ],
          [
            "v49.0",
            2.16
          ],
          [
            "v48.0",
            0.13
          ],
          [
            "v47.0",
            0.11
          ],
          [
            "v43.0",
            0.17
          ],
          [
            "v29.0",
            0.26
          ]
        ]
      },
      {
        "stadium": "Firefox",
        "id": "Firefox",
        "data": [
          [
            "v58.0",
            1.02
          ],
          [
            "v57.0",
            7.36
          ],
          [
            "v56.0",
            0.35
          ],
          [
            "v55.0",
            0.11
          ],
          [
            "v54.0",
            0.1
          ],
          [
            "v52.0",
            0.95
          ],
          [
            "v51.0",
            0.15
          ],
          [
            "v50.0",
            0.1
          ],
          [
            "v48.0",
            0.31
          ],
          [
            "v47.0",
            0.12
          ]
        ]
      },
      {
        "stadium": "Internet Explorer",
        "id": "Internet Explorer",
        "data": [
          [
            "v11.0",
            6.2
          ],
          [
            "v10.0",
            0.29
          ],
          [
            "v9.0",
            0.27
          ],
          [
            "v8.0",
            0.47
          ]
        ]
      },
      {
        "stadium": "Safari",
        "id": "Safari",
        "data": [
          [
            "v11.0",
            3.39
          ],
          [
            "v10.1",
            0.96
          ],
          [
            "v10.0",
            0.36
          ],
          [
            "v9.1",
            0.54
          ],
          [
            "v9.0",
            0.13
          ],
          [
            "v5.1",
            0.2
          ]
        ]
      },
      {
        "stadium": "Edge",
        "id": "Edge",
        "data": [
          [
            "v16",
            2.6
          ],
          [
            "v15",
            0.92
          ],
          [
            "v14",
            0.4
          ],
          [
            "v13",
            0.1
          ]
        ]
      },
      {
        "stadium": "Opera",
        "id": "Opera",
        "data": [
          [
            "v50.0",
            0.96
          ],
          [
            "v49.0",
            0.82
          ],
          [
            "v12.1",
            0.14
          ]
        ]
      }
    ]
  }
});
      
      console.log(response.data);
        
    });
    

    
}]);