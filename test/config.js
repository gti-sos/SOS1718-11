
exports.config = {
  seleniumAddress: 'http://localhost:8910',
  specs: ['loadData.js', 'addData.js'],
  capabilities:{
    'browserName' : 'phantomjs'
  }

};