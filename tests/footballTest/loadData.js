var fs = require("fs");
var path = require("path");

describe('data is loaded', function() {

  
    it('should show some initialfootballstats', function() {
        browser.get('https://sos171811ldvc-sos171811ldvc.c9users.io/#!/football-stats')
            .then(function() {
                element
                    .all(by.repeater('footbalstat in initialfootballstats'))
                    .then(function(initialfootballstats) {
                        browser
                            .takeScreenshot()
                            .then(function(png){
                                var stream = fs.createWriteStream(path.join(process.cwd(),'tests/footballTest','outputfootball','captura.png'));
                                stream.write(new Buffer(png,'base64'));
                                stream.end();
                            });
                        expect(initialfootballstats.length).toBeGreaterThan(0);
                    });
            });
    });

});