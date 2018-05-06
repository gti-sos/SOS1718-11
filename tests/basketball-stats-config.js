exports.config = {
        seleniumAddress: 'http://localhost:8910',
        
        specs: ['T01-basketballstats-loadData.js','T02-basketballstats-addStat.js'],
        
        capabilities: {
            'browserName':'phantomjs'
        }
}