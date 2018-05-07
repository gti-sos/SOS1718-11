/*global expect*/

var fs = require('fs');

describe('Data is loaded', function() {
    it('should show some stats', function() {
        browser.get('https://sos171811als-sos171811als.c9users.io/#!/basketball-stats')
            .then(function() {
                var stats = element.all(by.repeater('stat in stats'));
                expect(stats.count()).toBeGreaterThan(0);

            });

    });
});
