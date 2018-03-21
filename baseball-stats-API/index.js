var BASE_API_PATH = "/api/v1";
var baseballstatsAPI = {};

module.exports = baseballstatsAPI;


var initialbaseballstats = [{
        "stadium": "new-york",
        "date": "2018-02-27",
        "mm-run": 6,
        "mm-hit": 25,
        "mm-error": 21
    },
    {
        "stadium": "goodyear",
        "date": "2018-03-09",
        "mm-run": 5,
        "mm-hit": 11,
        "mm-error": 0
    },

    {
        "stadium": "seattle",
        "date": "2018-02-27",
        "mm-run": 8,
        "mm-hit": 14,
        "mm-error": 1
    },
    {
        "stadium": "seattle",
        "date": "2018-03-09",
        "mm-run": 5,
        "mm-hit": 10,
        "mm-error": 0
    },
    {
        "stadium": "new-york",
        "date": "2018-03-09",
        "mm-run": 7,
        "mm-hit": 9,
        "mm-error": 0
    }
];


baseballstatsAPI.register = function(app, dbbaseballstats) {
    //-------------------baseball-stats----------------------------//

 console.log("Registering routes for Baseball Stats API...");
 
 

    app.get(BASE_API_PATH + "/baseball-help", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3883703/collection/RVnYDKMz");

    });


    //Inicializa base de datos vacia
    app.get(BASE_API_PATH + "/baseball-stats/loadInitialData", (req, res) => {

        dbbaseballstats.insert(initialbaseballstats, function(err, newDoc) {
            if (err) {
                console.log("Error accesing ");
                process.exit(1);
                return;
            }
            else {
                res.sendStatus(201);
                console.log("DB initialized with: " + initialbaseballstats.length + " partidos");
            }
        });

    });



    //GET a ruta base
    app.get(BASE_API_PATH + "/baseball-stats", (req, res) => {
        console.log(Date(), " - GET /baseball-stats");
        dbbaseballstats.find({}).toArray((err, baseballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            
            console.log(baseballstats);
            res.send(baseballstats);
            

        });
    });


    //POST a ruta base
    app.post(BASE_API_PATH + "/baseball-stats", (req, res) => {
        console.log(Date() + " - POST /baseball-stats");
        var baseballstat = req.body;

        dbbaseballstats.insert(baseballstat, (err, newDoc) => {

            if (err) {
                console.log("Conflicto");
                res.sendStatus(409);
            }

            res.sendStatus(201);
        });
    });




    //PUT a ruta base (Error)
    app.put(BASE_API_PATH + "/baseball-stats", (req, res) => {
        console.log(Date() + " - PUT /baseball-stats");
        res.sendStatus(405);
    });


    //DELETE a ruta base
    app.delete(BASE_API_PATH + "/baseball-stats", (req, res) => {
        console.log(Date() + " - DELETE /baseball-stats");

        dbbaseballstats.remove({}, { multi: true }, (err, numRemoved) => {
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
    app.get(BASE_API_PATH + "/baseball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;

        console.log(Date(), "- GET /baseball-stats/" + stadium);

        dbbaseballstats.find({ "stadium": stadium }).toArray((err, stadium) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            
            console.log(stadium);
            res.send(stadium);
        });
    });


    //GET a un recurso concreto
    app.get(BASE_API_PATH + "/baseball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;


        dbbaseballstats.find({ "stadium": stadium, "date": date }).toArray((err, baseballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (baseballstats.length == 0) {
                res.sendStatus(404);
                return;
            }
            console.log(Date(), "- GET /baseball-stats/" + stadium + date);
            console.log(baseballstats);
            res.send(baseballstats[0]);
        });
    });


    //DELETE a un conjunto de recursos concreto
    app.delete(BASE_API_PATH + "/baseball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;

        console.log(Date() + " - DELETE /baseball-stats/" + stadium);

        dbbaseballstats.remove({ "stadium": stadium }, { multi: true }, (err, numRemoved) => {
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
    app.delete(BASE_API_PATH + "/baseball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /baseball-stats/" + stadium + date);

        dbbaseballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
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
    app.post(BASE_API_PATH + "/baseball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /baseball-stats/" + stadium);
        res.sendStatus(405);
        return;
    });

    //PUT a conjunto recursos (Error)
    app.put(BASE_API_PATH + "/baseball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;
        console.log(Date() + " - PUT /baseball-stats/" + stadium);
        console.log("Error 405");
        res.sendStatus(405);
        return;
    });


    //PUT a un recurso concreto
    app.put(BASE_API_PATH + "/baseball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        var baseballstat = req.body;

        console.log(Date() + " - PUT /baseball-stats/" + stadium + date);

        dbbaseballstats.update({ "stadium": baseballstat.stadium }, baseballstat, (err, numUpdated) => {
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


};
