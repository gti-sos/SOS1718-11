var newman = require('newman');
var path = require('path');

describe('API should work', function(){
    newman.run({
        collection: require(path.join(process.cwd(),"tests","/SOS1718-backend-tests.postman_collection.json")),
        reporters: "cli"
    }, function(err){
        if(err)
            throw err;
        else
            console.log("Collection run complete!")
            
    });
});