var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var path = require("path");
var port = (process.env.PORT || 16778);
var BASE_API_PATH = "/api/v1";
var MongoClient = require("mongodb").MongoClient;
var DataStore = require("nedb");

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));


//-------------------football-stats-DATABASE-VARIABLES----------------------------//
var dbFootball = __dirname + "/football-stats.db"
var dbfootballstats = new DataStore({
    filename: dbFootball,
    autoload: true
});

//-------------------basketball-stats-DATABASE-VARIABLES----------------------------//
var dbBasketball = __dirname+"/basketball-stats-API/basketball-stats.db" 
var dbbasketballstats = new DataStore({
    filename: dbBasketball, 
    autoload: true
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
    basketballstatsAPI.register(app, dbbasketballstats);
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


//-------------------baseball-stats-DATABASE-VARIABLES----------------------------//
var dbBaseball = __dirname + "/baseball-stats.db"
var dbbaseballstats = new DataStore({
    filename: dbBaseball,
    autoload: true
})


//-------------------------------------------------------------//
var initialfootballstats = [{
        "stadium": "barcelona",
        "date": "2018-02-27",
        "mm-goal": 11,
        "mm-corner": 15,
        "mm-fault": 13
    },
    {
        "stadium": "florencia",
        "date": "2018-03-01",
        "mm-goal": 3,
        "mm-corner": 16,
        "mm-fault": 14
    }, {
        "stadium": "barcelona",
        "date": "2018-03-11",
        "mm-goal": 3,
        "mm-corner": 16,
        "mm-fault": 16
    },
    {
        "stadium": "glasgow",
        "date": "2018-03-09",
        "mm-goal": 2,
        "mm-corner": 5,
        "mm-fault": 15
    }, ,
    {
        "stadium": "florencia",
        "date": "2018-03-11",
        "mm-goal": 9,
        "mm-corner": 26,
        "mm-fault": 11
    }
];








//-------------------football-stats----------------------------//

app.get(BASE_API_PATH + "/football-help", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/1806181/collection/RVnYgit DKSG");

});

//Inicializa base de datos vacia
app.get(BASE_API_PATH + "/football-stats/loadInitialData", (req, res) => {

    dbfootballstats.insert(initialfootballstats, function(err, newDoc) {
        if (err) {
            console.log("Error accesing ");
            process.exit(1);
            return;
        }
        else {
            res.sendStatus(201);
            console.log("DB initialized with: " + initialfootballstats.length + " partidos");
        }
    });

});



//GET a ruta base
app.get(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date(), " - GET /football-stats");
    dbfootballstats.find({}, (err, footballstats) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(footballstats);

    });
});


//POST a ruta base
app.post(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date() + " - POST /football-stats");
    var footballstat = req.body;

    dbfootballstats.insert(footballstat, (err, newDoc) => {

        if (err) {
            console.log("Conflicto");
            res.sendStatus(409);
        }

        res.sendStatus(201);
    });
});




//PUT a ruta base (Error)
app.put(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date() + " - PUT /football-stats");
    res.sendStatus(405);
});


//DELETE a ruta base
app.delete(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date() + " - DELETE /football-stats");

    dbfootballstats.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.log("Error accesing data base");
            res.sendStatus(500);
        }
        else {
            console.log("Removed: " + numRemoved);
            res.sendStatus(200);

        }
    });
});


//GET a un conjunto de recursos concreto
app.get(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
    var stadium = req.params.stadium;

    console.log(Date(), "- GET /football-stats/" + stadium);

    dbfootballstats.find({ "stadium": stadium }, (err, stadium) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(stadium);
    });
});


//GET a un recurso concreto
app.get(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
    var stadium = req.params.stadium;
    var date = req.params.date;


    dbfootballstats.find({ "stadium": stadium, "date": date }, (err, footballstats) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        else if (footballstats.length == 0) {
            res.sendStatus(404);
            return;
        }
        console.log(Date(), "- GET /football-stats/" + stadium + date);
        res.send(footballstats);
    });
});


//DELETE a un conjunto de recursos concreto
app.delete(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
    var stadium = req.params.stadium;

    console.log(Date() + " - DELETE /football-stats/" + stadium);

    dbfootballstats.remove({ "stadium": stadium }, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.log("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        else {
            console.log("Removed: " + numRemoved);
            res.sendStatus(200);
        }
    });
});


//DELETE a un recurso concreto
app.delete(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
    var stadium = req.params.stadium;
    var date = req.params.date;
    console.log(Date() + " - DELETE /football-stats/" + stadium + date);

    dbfootballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
        if (err) {
            console.log("Error remove");
            res.sendStatus(500);
            return;
        }
        else {
            console.log("Removed: " + numRemoved);
            res.sendStatus(200);
        }
    });
});

//POST a un recurso concreto (Error)
app.post(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /football-stats/" + stadium);
    res.sendStatus(405);
    return;
});

//PUT a conjunto recursos (Error)
app.put(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
    var stadium = req.params.stadium;
    console.log(Date() + " - PUT /football-stats/" + stadium);
    console.log("Error 405");
    res.sendStatus(405);
    return;
});


//PUT a un recurso concreto
app.put(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
    var stadium = req.params.stadium;
    var date = req.params.date;
    var footballstat = req.body;

    console.log(Date() + " - PUT /football-stats/" + stadium + date);

    dbfootballstats.update({ "stadium": footballstat.stadium }, footballstat, (err, numUpdated) => {
        if (err) {
            console.log("Error accesing data base");
            res.sendStatus(500);
            return;
        }
        else if (numUpdated == 0) {

            console.log("error");
            res.sendStatus(404);
            return;
        }
        else {
            console.log("Updated: " + numUpdated);
            res.sendStatus(200);
        }
    });
});

app.listen(port, () => {
    console.log("Server ready on port" + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});
