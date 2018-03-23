var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require("path");
var port = (process.env.PORT || 16778);
var BASE_API_PATH = "/api/v1";
var MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));

var dbfootballstatsURL = "mongodb://lucdelcan:test@ds121309.mlab.com:21309/sandbox";

MongoClient.connect(dbfootballstatsURL, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    console.log("Connected to Football Stats DB");
    var dbFootball = mlabs.db("sandbox");
    var dbfootballstats = dbFootball.collection("football-stats");
    var footballstatsAPI = require("./football-stats-API");
    footballstatsAPI.register(app, dbfootballstats);
});



var dbbasketballstatsURL = "mongodb://antlopsou:12345@ds119049.mlab.com:19049/sos1718-als-sandbox";

MongoClient.connect(dbbasketballstatsURL, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    console.log("Connected to Basketball Stats DB");
    var dbBasketball = mlabs.db("sos1718-als-sandbox");
    var dbbasketballstats = dbBasketball.collection("basketball-stats");
    var basketballstatsAPI = require("./basketball-stats-API");
    basketballstatsAPI.register(app, dbbasketballstats,checkApiKey);
});




var dbbaseballstatsURL = "mongodb://marlopsou:12345@ds213118.mlab.com:13118/baseball-stats";

MongoClient.connect(dbbaseballstatsURL, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    console.log("Connected to Baseball Stats DB");
    var dbBaseball = mlabs.db("baseball-stats");
    var dbbaseballstats = dbBaseball.collection("baseball-stats");
    var baseballstatsAPI = require("./baseball-stats-API");
    baseballstatsAPI.register(app, dbbaseballstats);
});


var api_key = "scraping";


var checkApiKey = function (request,response){
    if(!request.query.apikey){
        console.error('WARNING: No apikey');
        response.sendStatus(401);
        return false;
    }  if (request.query.apikey !== api_key) {
        console.error('WARNING: Incorrect apikey was used!');
        response.sendStatus(403);
        return false;
    }
    return true;
};


app.listen(port, () => {
    console.log("Server ready on port" + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
