exports.config = {
    seleniumAddress: 'http://localhost:8910',

    specs: ['T00-basketball-stats-API.js', 'T01-basketballstats-loadData.js', 'T02-basketballstats-addStat.js'],

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
