var newman = require("newman");
var path = require("path");

describe('Baseball API should work', function() {

    newman.run({
        collection: require(path.join(process.cwd(), "tests", "/SOS1718-baseball-stats-Heroku.postman_collection.json")),
        reporters: "cli"
    }, function(err) {
        if (err)
            throw err;
        else
            console.log("Baseball collection run completed!");
    })
});
