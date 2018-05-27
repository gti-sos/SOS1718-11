var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var path = require("path");
var port = (process.env.PORT || 16778);
var BASE_API_PATH = "/api/v1";
var MongoClient = require("mongodb").MongoClient;
var secure = require("./secure.js");
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cors());
var dbURL = "mongodb://comun:123456@ds119049.mlab.com:19049/sos1718-als-sandbox";


MongoClient.connect(dbURL, { native_parser: true }, (err, mlabs) => {

    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    console.log("Connected to Football Stats DB");
    var dbFootball = mlabs.db("sos1718-als-sandbox");
    var dbfootballstats = dbFootball.collection("football-stats");
    var footballstatsAPI = require("./football-stats-API/v2");
    footballstatsAPI.register(app, dbfootballstats,secure.checkApiKey);



    console.log("Connected to Basketball Stats DB");
    var dbBasketball = mlabs.db("sos1718-als-sandbox");
    var dbbasketballstats = dbBasketball.collection("basketball-stats");
    var basketballstatsAPI = require("./basketball-stats-API/v2");
    basketballstatsAPI.register(app, dbbasketballstats, secure.checkApiKey);



    console.log("Connected to Baseball Stats DB");
    var dbBaseball = mlabs.db("sos1718-als-sandbox");
    var dbbaseballstats = dbBaseball.collection("baseball-stats");
    var baseballstatsAPI = require("./baseball-stats-API/v2");
    baseballstatsAPI.register(app, dbbaseballstats, secure.checkApiKey);



    app.listen(port, () => {
        console.log("Server ready on port" + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });

});
