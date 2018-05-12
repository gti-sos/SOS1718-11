var BASE_API_PATH = "/api/v2";
var BASE_API_PATH_secure = "/api/v2/secure";
var baseballstatsAPI = {};
var request = require("request");
var cors=  require("cors");


var port = (process.env.PORT || 1607);

module.exports = baseballstatsAPI;



var initialbaseballstats = [{
        "stadium": "new-york",
        "date": "2018-02-27",
        "run": 6,
        "hit": 25,
        "error": 21
    },
    {
        "stadium": "goodyear",
        "date": "2018-03-09",
        "run": 5,
        "hit": 11,
        "error": 1
    },

    {
        "stadium": "seattle",
        "date": "2018-02-27",
        "run": 8,
        "hit": 14,
        "error": 1
    },
    {
        "stadium": "seattle",
        "date": "2018-03-09",
        "run": 5,
        "hit": 10,
        "error": 1
    },
    {
        "stadium": "new-york",
        "date": "2018-03-09",
        "run": 7,
        "hit": 9,
        "error": 1
    },
    {
        "stadium": "new-york",
        "date": "2018-03-10",
        "run": 5,
        "hit": 8,
        "error": 1
    },
    {
        "stadium": "seattle",
        "date": "2018-06-27",
        "run": 9,
        "hit": 11,
        "error": 1
    },
    {
        "stadium": "goodyear",
        "date": "2018-05-17",
        "run": 6,
        "hit": 14,
        "error": 1
    }, {
        "stadium": "seattle",
        "date": "2018-01-09",
        "run": 6,
        "hit": 12,
        "error": 1
    },
    {
        "stadium": "new-orleans",
        "date": "2018-03-15",
        "run": 7,
        "hit": 10,
        "error": 1
    },
    {
        "stadium": "new-orleans",
        "date": "2018-07-16",
        "run": 5,
        "hit": 11,
        "error": 1
    }
];

baseballstatsAPI.register = function(app, dbbaseballstats, checkApiKey) {
    //-------------------baseball-stats----------------------------//

    console.log("Registering routes for Baseball Stats API...");
     app.use(cors());

    var apiServerHostOS = "https://SOS1718-05.herokuapp.com";
    
    var apiServerHost = "https://sos1718-09.herokuapp.com";
   
    app.use("/proxyMLS", function(req, res) {
        var url = apiServerHostOS + req.url;
        console.log(req.url);
        req.pipe(request(url)).pipe(res);
    });
    
     app.use("/proxyRF", function(req, res) {
        var url = apiServerHost + req.url;
        console.log(req.url);
        req.pipe(request(url)).pipe(res);
    });
  


    //---------------------------MONGODB--------------------------------------//


    //-------------------------------METODOS----------------------------------------//

    app.get(BASE_API_PATH + "/baseball-stats/docs", (req, res) => {
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
                console.log("Created");
                res.sendStatus(201);
                console.log("DB initialized with: " + initialbaseballstats.length + " partidos");
            }
        });

    });




    app.post(BASE_API_PATH + "/baseball-stats", (req, res) => {
        console.log(Date() + " - POST /baseball-stats");
        var baseballstat = req.body;


        if (!baseballstat.stadium || !baseballstat.date || !baseballstat.hit || !baseballstat.run || !baseballstat.error || Object.keys(baseballstat).length != 5) {
            res.sendStatus(400);
            return;
        }
        else {
            dbbaseballstats.find({ "stadium": baseballstat.stadium, "date": baseballstat.date }).toArray((err, baseballstats) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                else if (baseballstats.length != 0) {
                    res.sendStatus(409);
                    return;
                }
                else {
                    dbbaseballstats.insert(baseballstat, function(err, newDoc) {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        else {
                            res.sendStatus(201);
                            console.log("INSERTED 1 element");
                        }

                    });
                }

            });
        }
    });



    //PUT a ruta base (Error)
    app.put(BASE_API_PATH + "/baseball-stats", (req, res) => {
        console.log(Date() + " - PUT /baseball-stats");
        console.log("Method not allowed");
        res.sendStatus(405);
    });


    //DELETE a ruta base
    app.delete(BASE_API_PATH + "/baseball-stats", (req, res) => {
        console.log(Date() + " - DELETE /baseball-stats");

        dbbaseballstats.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            else if (numRemoved.result.n == 0) {
                console.log("Not found");
                res.sendStatus(404);
            }
            else {
                console.log("Removed: " + numRemoved.result.n);
                res.sendStatus(200);

            }
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
            else if (numRemoved.result.n == 0) {
                console.log("Not found");
                res.sendStatus(404);
            }
            else {
                console.log("Removed: " + numRemoved.result.n);
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
            else if (numRemoved.result.n == 0) {
                console.log("Not found");

                res.sendStatus(404);
            }
            else {
                console.log("Removed: " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });

    //POST a un recurso concreto (Error)
    app.post(BASE_API_PATH + "/baseball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /baseball-stats/" + stadium);
        console.log("Method not allowed");

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

        console.log(Date() + " - PUT /baseball-stats/" + stadium + "/" + date);
        //|| Object.keys(baseballstat).length != 5
        if (stadium != baseballstat.stadium || date != baseballstat.date) {
            console.log("Bad request");
            res.sendStatus(400);
            return;

        }

        dbbaseballstats.update({ "stadium": stadium, "date": date }, baseballstat, (err, numUpdated) => {
            if (err) {
                console.log("Error accesing data base");
                res.sendStatus(500);
                return;
            }
            else if (numUpdated.result.n == 0) {
                console.log("Not found");
                res.sendStatus(404);
                return;
            }
            else {
                console.log("Updated: " + numUpdated.result.n);
                res.sendStatus(200);
            }
        });

    });


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
            console.log(Date(), "- GET /baseball-stats/" + stadium + "/" + date);
            res.send(baseballstats[0]);
        });
    });


    app.get(BASE_API_PATH + "/baseball-stats/:parametro", (req, res) => {

        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }

        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        console.log(Date() + " - GET /basketball-stats " + req.params.parametro);


        dbbaseballstats.find({ $or: [{ "stadium": req.params.parametro }, { "date": req.params.parametro }] }).skip(offset).limit(limit).toArray((err, baseballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                if (baseballstats.length === 0) {
                    res.status(404).send(baseballstats);
                }
                else {
                    res.status(200).send(baseballstats);
                }
            }
        });
    });

    // GET Collection (WITH SEARCH)

    app.get(BASE_API_PATH + "/baseball-stats", function(req, res) {
        console.log("INFO: New GET request to /baseball-stats ");

        let query = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }

        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        for (let attr in req.query) {


            if (attr === "stadium")
                query[attr] = req.query[attr];
            if (attr === "date")
                query[attr] = req.query[attr];
            if (attr === "hit")
                query["hit"] = parseInt(req.query[attr]);
            if (attr === "run")
                query["run"] = parseInt(req.query[attr]);
            if (attr === "error")
                query["error"] = parseInt(req.query[attr]);

        }

        dbbaseballstats.find(query).skip(offset).limit(limit).toArray((err, baseballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(baseballstats);

            }
        });
    });

    app.get(BASE_API_PATH + "/baseball-stats/count", (req, res) => {
        let query = {};

        for (let attr in req.query) {


            if (attr === "stadium")
                query[attr] = req.query[attr];
            if (attr === "date")
                query[attr] = req.query[attr];
            if (attr === "hit")
                query["hit"] = parseInt(req.query[attr]);
            if (attr === "run")
                query["run"] = parseInt(req.query[attr]);
            if (attr === "error")
                query["error"] = parseInt(req.query[attr]);

        }

        dbbaseballstats.find(query).count((err, num_baseballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(num_baseballstats);

            }
        });

    });



    //----------------------------------------------SECURE---------------------------------------------------


    //Inicializa base de datos vacia
    app.get(BASE_API_PATH_secure + "/baseball-stats/loadInitialData", (req, res) => {
        if (!checkApiKey(req, res)) return;

        dbbaseballstats.insert(initialbaseballstats, function(err, newDoc) {
            if (err) {
                console.log("Error accesing ");
                process.exit(1);
                return;
            }
            else {
                console.log("Created");
                res.sendStatus(201);
                console.log("DB initialized with: " + initialbaseballstats.length + " partidos");
            }
        });

    });

    app.get(BASE_API_PATH_secure + "/baseball-stats/count", (req, res) => {
        if (!checkApiKey(req, res)) return;

        let query = {};

        for (let attr in req.query) {


            if (attr === "stadium")
                query[attr] = req.query[attr];
            if (attr === "date")
                query[attr] = req.query[attr];
            if (attr === "hit")
                query["hit"] = parseInt(req.query[attr]);
            if (attr === "run")
                query["run"] = parseInt(req.query[attr]);
            if (attr === "error")
                query["error"] = parseInt(req.query[attr]);

        }

        dbbaseballstats.find(query).count((err, num_baseballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(String(num_baseballstats));

            }
        });

    });

    app.post(BASE_API_PATH_secure + "/baseball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - POST /baseball-stats");
        var baseballstat = req.body;


        if (!baseballstat.stadium || !baseballstat.date || !baseballstat.hit || !baseballstat.run || !baseballstat.error || Object.keys(baseballstat).length != 5) {
            res.sendStatus(400);
            return;
        }
        else {
            dbbaseballstats.find({ "stadium": baseballstat.stadium, "date": baseballstat.date }).toArray((err, baseballstats) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                else if (baseballstats.length != 0) {
                    res.sendStatus(409);
                    return;
                }
                else {
                    dbbaseballstats.insert(baseballstat, function(err, newDoc) {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        else {
                            res.sendStatus(201);
                            console.log("INSERTED 1 element");
                        }

                    });
                }

            });
        }
    });



    //PUT a ruta base (Error)
    app.put(BASE_API_PATH_secure + "/baseball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - PUT /baseball-stats");
        console.log("Method not allowed");
        res.sendStatus(405);
    });


    //DELETE a ruta base
    app.delete(BASE_API_PATH_secure + "/baseball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - DELETE /baseball-stats");

        dbbaseballstats.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
            }
            else if (numRemoved.result.n == 0) {
                console.log("Not found");
                res.sendStatus(404);
            }
            else {
                console.log("Removed: " + numRemoved.result.n);
                res.sendStatus(200);

            }
        });
    });



    //DELETE a un conjunto de recursos concreto
    app.delete(BASE_API_PATH_secure + "/baseball-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;

        console.log(Date() + " - DELETE /baseball-stats/" + stadium);

        dbbaseballstats.remove({ "stadium": stadium }, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.log("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                console.log("Not found");
                res.sendStatus(404);
            }
            else {
                console.log("Removed: " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });


    //DELETE a un recurso concreto
    app.delete(BASE_API_PATH_secure + "/baseball-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /baseball-stats/" + stadium + date);

        dbbaseballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
            if (err) {
                console.log("Error remove");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                console.log("Not found");

                res.sendStatus(404);
            }
            else {
                console.log("Removed: " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });

    //POST a un recurso concreto (Error)
    app.post(BASE_API_PATH_secure + "/baseball-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        console.log(Date() + " - POST /baseball-stats/" + stadium);
        console.log("Method not allowed");

        res.sendStatus(405);
        return;
    });

    //PUT a conjunto recursos (Error)
    app.put(BASE_API_PATH_secure + "/baseball-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        console.log(Date() + " - PUT /baseball-stats/" + stadium);
        console.log("Error 405");
        res.sendStatus(405);
        return;
    });


    //PUT a un recurso concreto
    app.put(BASE_API_PATH_secure + "/baseball-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        var date = req.params.date;
        var baseballstat = req.body;



        console.log(Date() + " - PUT /baseball-stats/" + stadium + date);

        if (stadium != baseballstat.stadium || date != baseballstat.date || Object.keys(baseballstat).length != 5) {
            console.log("Bad request");
            res.sendStatus(400);
            return;

        }

        dbbaseballstats.update({ "stadium": stadium, "date": date }, baseballstat, (err, numUpdated) => {
            if (err) {
                console.log("Error accesing data base");
                res.sendStatus(500);
                return;
            }
            else if (numUpdated.result.n == 0) {
                console.log("Not found");
                res.sendStatus(404);
                return;
            }
            else {
                console.log("Updated: " + numUpdated.result.n);
                res.sendStatus(200);
            }
        });

    });


    app.get(BASE_API_PATH_secure + "/baseball-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

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
            console.log(Date(), "- GET /baseball-stats/" + stadium + "/" + date);
            res.send(baseballstats[0]);
        });
    });


    app.get(BASE_API_PATH_secure + "/baseball-stats/:parametro", (req, res) => {
        if (!checkApiKey(req, res)) return;


        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }

        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        console.log(Date() + " - GET /baseball-stats " + req.params.parametro);


        dbbaseballstats.find({ $or: [{ "stadium": req.params.parametro }, { "date": req.params.parametro }] }).skip(offset).limit(limit).toArray((err, baseballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                if (baseballstats.length === 0) {
                    res.status(404).send(baseballstats);
                }
                else {
                    res.status(200).send(baseballstats);
                }
            }
        });
    });

    // GET Collection (WITH SEARCH)

    app.get(BASE_API_PATH_secure + "/baseball-stats", function(req, res) {
        if (!checkApiKey(req, res)) return;
        console.log("INFO: New GET request to /baseball-stats ");

        let query = {};
        let offset = 0;
        let limit = Number.MAX_SAFE_INTEGER;

        if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }

        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }

        for (let attr in req.query) {


            if (attr === "stadium")
                query[attr] = req.query[attr];
            if (attr === "date")
                query[attr] = req.query[attr];
            if (attr === "hit")
                query["hit"] = parseInt(req.query[attr]);
            if (attr === "run")
                query["run"] = parseInt(req.query[attr]);
            if (attr === "error")
                query["error"] = parseInt(req.query[attr]);

        }

        dbbaseballstats.find(query).skip(offset).limit(limit).toArray((err, baseballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(baseballstats);

            }
        });

    });
};
