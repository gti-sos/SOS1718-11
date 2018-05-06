/*global expect*/

var fs = require('fs');

function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

describe('Data is loaded', function() {
    it('should show some stats', function() {
        browser.get('https://sos171811als-sos171811als.c9users.io/#!/basketball-stats')
            .then(function() {
                var stats = element.all(by.repeater('stat in stats'));
                browser.takeScreenshot().then(function(png) {
                    writeScreenShot(png, 'ng-test.png');
                });
                expect(stats.count()).toBeGreaterThan(0);

            });

    });
});
