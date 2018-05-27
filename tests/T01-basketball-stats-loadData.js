/*global expect*/
/*global browser*/
/*global element*/
/*global by*/

var config = require("./config.js")

describe('Basketball data is loaded', function() {
    it('should show some stats', function() {
        browser.get(config.getBasketUrl())
            .then(function() {
                var stats = element.all(by.repeater('stat in stats'));
                expect(stats.count()).toBeGreaterThan(0);

            });

    });
});
