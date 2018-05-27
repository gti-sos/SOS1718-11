exports.config = {
    seleniumAddress: 'http://localhost:8910',

    specs: ['T00-basketball-stats-API.js',  'T02-basketball-stats-addStat.js', 'T01-basketball-stats-loadData.js', 'T00-baseball-stats-API.js', 'T01-baseball-stats-loadInitialData.js', 'T02-baseball-stats-addStat.js'],

    capabilities: {
        'browserName': 'phantomjs'
    },
    params: {
        host: 'sos1718-11.herokuapp.com',
        port: '80'
    }
}

exports.getBasketUrl = function() {
    console.log("https://" + browser.params.host  + "/#!/basketball-stats" );
    return "https://" + browser.params.host  + "/#!/basketball-stats";
}

exports.getBaseballUrl = function() {
    console.log("https://" + browser.params.host  + "/#!/baseball-stats" );
    return "https://" + browser.params.host  + "/#!/baseball-stats";
}


