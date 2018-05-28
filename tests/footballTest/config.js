
exports.config = {
  seleniumAddress: 'http://localhost:8910',
  specs: ['T00-API.js','loadData.js', 'addData.js'],
  capabilities:{
    'browserName' : 'phantomjs'
  },
    params: {
        host: 'localhost',
        port: '8080'
    }

};

exports.getAppUrl = function() {
    console.log("https://" + browser.params.host  + "/#!/football-stats" );
    return "https://" + browser.params.host  + "/#!/football-stats";
};