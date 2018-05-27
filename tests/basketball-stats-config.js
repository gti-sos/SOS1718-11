exports.config = {
    seleniumAddress: 'http://localhost:8910',

    specs: ['T01-basketballstats-loadData.js', 'T02-basketballstats-addStat.js'],

    capabilities: {
        'browserName': 'phantomjs'
    },
    params: {
        host: 'localhost',
        port: '8080'
    }
}

exports.getAppUrl = function() {
    console.log("https://" + browser.params.host  + "/#!/basketball-stats" );
    return "https://" + browser.params.host  + "/#!/basketball-stats";
}
