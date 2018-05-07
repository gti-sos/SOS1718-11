exports.config = {
    seleniumAddress: "http://localhost::8910",

    specs: ['T01-baseball-stats-loadInitialData.js', 'T02-baseball-stats-addStat.js'],
    capabilities: {
        'browserName': 'phantomjs'
    }
}
