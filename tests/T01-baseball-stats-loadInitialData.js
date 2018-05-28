var config = require("./config.js")

describe('Baseball data is loaded', function() {

    it('should show some initialbaseballstats', function() {
        browser.get(config.getBaseballUrl())
            .then(function() {
                element
                    .all(by.repeater('baseballstat in initialbaseballstats'))
                    .then(function(initialbaseballstats) {
                        expect(initialbaseballstats.length).toBeGreaterThan(0);
                    });
            });
    });

});

