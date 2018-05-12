var fs = require("fs");
var path = require("path");

describe('data is loaded', function() {

  
    it('should show some initialbaseballstats', function() {
        browser.get('https://sos171811mls-sos171811mls.c9users.io/#!/baseball-stats')
            .then(function() {
                element
                    .all(by.repeater('baseballstat in initialbaseballstats'))
                    .then(function(initialbaseballstats) {
                        expect(initialbaseballstats.length).toBeGreaterThan(0);
                    });
            });
    });

});

