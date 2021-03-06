var newman = require("newman");
var path = require("path");

describe('Basketball API protractor', function() {
    it('should pass all tests of protractor', function() {
        newman.run({
            collection: require(path.join(process.cwd(), "tests", "/SOS1718-11-basketball-stats Heroku.postman_collection.json")),
            reporters: "cli"
        }, function(err) {
            if (err)
                throw err;
            else
                console.log("Basketball collection run completed!");
        })
    });
});
