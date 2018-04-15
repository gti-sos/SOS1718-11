//-------------------index.js basketball-stats ----------------------------//

var BASE_API_PATH = "/api/v2";
var BASE_API_PATH_SECURE = "/api/v2/secure";
var basketballstatsAPI = {};
module.exports = basketballstatsAPI;

var initialBasketballstats = [{
        "stadium": "boston",
        "date": "2018-02-27",
        "first": 49,
        "second": 15,
        "third": 36,
        "fourth": 42
    },
    {
        "stadium": "charlotte",
        "date": "2018-03-09",
        "first": 64,
        "second": 60,
        "third": 57,
        "fourth": 55
    },
    {
        "stadium": "boston",
        "date": "2018-03-09",
        "first": 64,
        "second": 60,
        "third": 57,
        "fourth": 55
    },
    {
        "stadium": "miami",
        "date": "2018-03-09",
        "first": 57,
        "second": 45,
        "third": 45,
        "fourth": 66
    },
    {
        "stadium": "boston",
        "date": "2018-04-09",
        "first": 64,
        "second": 60,
        "third": 57,
        "fourth": 55
    },
    {
        "stadium": "toronto",
        "date": "2018-03-09",
        "first": 63,
        "second": 43,
        "third": 54,
        "fourth": 47
    },
    {
        "stadium": "ocklahoma",
        "date": "2018-03-09",
        "first": 54,
        "second": 38,
        "third": 68,
        "fourth": 47
    },
    {
        "stadium": "toronto",
        "date": "2018-05-09",
        "first": 63,
        "second": 43,
        "third": 54,
        "fourth": 47
    }
];



//----------------------------------------------------------------------------------//



basketballstatsAPI.register = function(app, dbbasketballstats, checkApiKey) {

    console.log("Registering routes for Basketball Stats API...");



    // Inicializa DB

    app.get(BASE_API_PATH + "/basketball-stats/loadInitialData", (req, res) => {

        dbbasketballstats.insert(initialBasketballstats, function(err, newDoc) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.sendStatus(201);
                console.log("INSERTED " + initialBasketballstats.length);
            }


        });
    });

    // GET a basketball-help

    app.get(BASE_API_PATH + "/basketball-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3936462/collection/RVtvqYrC");
    });


    //----------------------------------------------------------------------------------//
    app.get(BASE_API_PATH + "/basketball-stats", (req, res) => {


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
            if (attr === "fc")
                query["first"] = parseInt(req.query[attr]);
            if (attr === "sc")
                query["second"] = parseInt(req.query[attr]);
            if (attr === "tc")
                query["third"] = parseInt(req.query[attr]);
            if (attr === "frc")
                query["fourth"] = parseInt(req.query[attr]);

        }

        dbbasketballstats.find(query).skip(offset).limit(limit).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(basketballstats);

            }
        });
    });



    // GET a recurso concreto 1 parámetro

    app.get(BASE_API_PATH + "/basketball-stats/:parametro", (req, res) => {

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


        dbbasketballstats.find({ $or: [{ "stadium": req.params.parametro }, { "date": req.params.parametro }] }).skip(offset).limit(limit).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                if (basketballstats.length === 0) {
                    res.status(404).send(basketballstats);
                }
                else {
                    res.status(200).send(basketballstats);
                }
            }
        });
    });


    // GET a recurso concreto 2 parámetros

    app.get(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        dbbasketballstats.find({ "stadium": stadium, "date": date }).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (basketballstats.length == 0) {
                res.status(404).send(basketballstats);
                return;
            }
            else {
                console.log(Date() + " - GET /basketball-stats " + stadium + "/" + date);
                res.status(200).send(basketballstats[0]);
            }

        });
    });


    //----------------------------------------------------------------------------------//


    // POST a recurso base

    app.post(BASE_API_PATH + "/basketball-stats", (req, res) => {
        console.log(Date() + " - POST /basketball-stats");
        var basketballstat = req.body;
        basketballstat.first = parseInt(basketballstat.first)
        basketballstat.second = parseInt(basketballstat.second)
        basketballstat.third = parseInt(basketballstat.third)
        basketballstat.fourth = parseInt(basketballstat.fourth)

        if (!basketballstat.stadium || !basketballstat.date || !basketballstat.first || !basketballstat.second || !basketballstat.third || !basketballstat.fourth || Object.keys(basketballstat).length != 6) {
            res.sendStatus(400);
            return;
        }
        else {
            dbbasketballstats.find({ "stadium": basketballstat.stadium, "date": basketballstat.date }).toArray((err, basketballstats) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                else if (basketballstats.length != 0) {
                    res.sendStatus(409);
                    return;
                }
                else {
                    dbbasketballstats.insert(basketballstat, function(err, newDoc) {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        else {
                            res.sendStatus(201);
                            console.log("INSERTED 1");
                        }

                    });
                }

            });
        }
    });


    // POST a recurso concreto

    app.post(BASE_API_PATH + "/basketball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /basketball-stats/" + stadium);
        res.sendStatus(405);
    });


    //----------------------------------------------------------------------------------//




    // PUT a recurso concreto 2 parámetros

    app.put(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        var basketballstat = req.body;
        console.log(Date() + " - PUT /basketball-stats/" + stadium);

        if (!basketballstat.stadium || !basketballstat.date || !basketballstat.first || !basketballstat.second || !basketballstat.third || !basketballstat.fourth || stadium != basketballstat.stadium || date != basketballstat.date || Object.keys(basketballstat).length != 6) {
            res.sendStatus(400);
            return;
        }
        else {
            dbbasketballstats.update({ "stadium": stadium, "date": date }, basketballstat, (err, numUpdated) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;

                }
                else if (numUpdated.result.n == 0) {
                    res.sendStatus(404);
                    return;
                }
                else {
                    console.log("UPDATED " + numUpdated.result.n);
                    res.sendStatus(200);
                }
            });
        }
    });


    // PUT a recurso concreto 1 parámetros

    app.put(BASE_API_PATH + "/basketball-stats/:parametro", (req, res) => {
        var parametro = req.params.parametro;
        console.log(Date() + " - POST /basketball-stats/" + parametro);
        res.sendStatus(405);

    });


    // PUT a recurso base

    app.put(BASE_API_PATH + "/basketball-stats", (req, res) => {
        console.log(Date() + " - PUT /basketball-stats");
        res.sendStatus(405);
    });



    //----------------------------------------------------------------------------------//




    // DELETE a recurso concreto 1 parámetro

    app.delete(BASE_API_PATH + "/basketball-stats/:parametro", (req, res) => {
        var parametro = req.params.parametro;

        console.log(Date() + " - DELETE /basketball-stats/" + parametro);

        dbbasketballstats.remove({ $or: [{ "stadium": parametro }, { "date": parametro }] }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });


    // DELETE a recurso concreto 2 parámetros

    app.delete(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /basketball-stats/" + stadium + "/" + date);

        dbbasketballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });


    // DELETE a recurso base

    app.delete(BASE_API_PATH + "/basketball-stats", (req, res) => {
        console.log(Date() + " - DELETE /basketball-stats");

        dbbasketballstats.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });




    //--------------------------------------------------------------//


    // Inicializa DB

    app.get(BASE_API_PATH + "/basketball-stats/loadInitialData", (req, res) => {
        if (!checkApiKey(req, res)) return;
        dbbasketballstats.insert(initialBasketballstats, function(err, newDoc) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.sendStatus(201);
                console.log("INSERTED " + initialBasketballstats.length);
            }


        });
    });

    // GET a basketball-help

    app.get(BASE_API_PATH + "/basketball-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3936462/collection/RVtvqYrC");
    });


    //----------------------------------------------------------------------------------//
    app.get(BASE_API_PATH_SECURE + "/basketball-stats", (req, res) => {

        if (!checkApiKey(req, res)) return;

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
            if (attr === "fc")
                query["first"] = parseInt(req.query[attr]);
            if (attr === "sc")
                query["second"] = parseInt(req.query[attr]);
            if (attr === "tc")
                query["third"] = parseInt(req.query[attr]);
            if (attr === "frc")
                query["fourth"] = parseInt(req.query[attr]);

        }

        dbbasketballstats.find(query).skip(offset).limit(limit).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                if (basketballstats.length === 0) {
                    res.status(404).send(basketballstats);
                }
                else {
                    res.status(200).send(basketballstats);
                }
            }
        });
    });



    // GET a recurso concreto 1 parámetro

    app.get(BASE_API_PATH_SECURE + "/basketball-stats/:parametro", (req, res) => {
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

        console.log(Date() + " - GET /basketball-stats " + req.params.parametro);


        dbbasketballstats.find({ $or: [{ "stadium": req.params.parametro }, { "date": req.params.parametro }] }).skip(offset).limit(limit).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                if (basketballstats.length === 1) {
                    res.status(200).send(basketballstats);
                }
            }
        });
    });


    // GET a recurso concreto 2 parámetros

    app.get(BASE_API_PATH_SECURE + "/basketball-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        var date = req.params.date;
        dbbasketballstats.find({ "stadium": stadium, "date": date }).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (basketballstats.length == 0) {
                res.status(404).send(basketballstats);
                return;
            }
            else {
                console.log(Date() + " - GET /basketball-stats " + stadium + "/" + date);
                res.status(200).send(basketballstats[0]);
            }

        });
    });


    //----------------------------------------------------------------------------------//


    // POST a recurso base

    app.post(BASE_API_PATH_SECURE + "/basketball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - POST /basketball-stats");
        var basketballstat = req.body;
        basketballstat.first = parseInt(basketballstat.first);
        basketballstat.second = parseInt(basketballstat.second);
        basketballstat.third = parseInt(basketballstat.third);
        basketballstat.fourth = parseInt(basketballstat.fourth);

        if (!basketballstat.stadium || !basketballstat.date || !basketballstat.first || !basketballstat.second || !basketballstat.third || !basketballstat.fourth || Object.keys(basketballstat).length != 6) {
            res.sendStatus(400);
            return;
        }
        else {
            dbbasketballstats.find({ "stadium": basketballstat.stadium, "date": basketballstat.date }).toArray((err, basketballstats) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                else if (basketballstats.length != 0) {
                    res.sendStatus(409);
                    return;
                }
                else {
                    dbbasketballstats.insert(basketballstat, function(err, newDoc) {
                        if (err) {
                            console.error("Error accesing DB");
                            res.sendStatus(500);
                            return;
                        }
                        else {
                            res.sendStatus(201);
                            console.log("INSERTED 1");
                        }

                    });
                }

            });
        }
    });


    // POST a recurso concreto

    app.post(BASE_API_PATH_SECURE + "/basketball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /basketball-stats/" + stadium);
        res.sendStatus(405);
    });


    //----------------------------------------------------------------------------------//




    // PUT a recurso concreto 2 parámetros

    app.put(BASE_API_PATH_SECURE + "/basketball-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        var date = req.params.date;
        var basketballstat = req.body;
        console.log(Date() + " - PUT /basketball-stats/" + stadium);

        if (!basketballstat.stadium || !basketballstat.date || !basketballstat.first || !basketballstat.second || !basketballstat.third || !basketballstat.fourth || stadium != basketballstat.stadium || date != basketballstat.date || Object.keys(basketballstat).length != 6) {
            res.sendStatus(400);
            return;
        }
        else {
            dbbasketballstats.update({ "stadium": stadium, "date": date }, basketballstat, (err, numUpdated) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;

                }
                else if (numUpdated.result.n == 0) {
                    res.sendStatus(404);
                    return;
                }
                else {
                    console.log("UPDATED " + numUpdated.result.n);
                    res.sendStatus(200);
                }
            });
        }
    });


    // PUT a recurso concreto 1 parámetros

    app.put(BASE_API_PATH_SECURE + "/basketball-stats/:parametro", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var parametro = req.params.parametro;
        console.log(Date() + " - POST /basketball-stats/" + parametro);
        res.sendStatus(405);

    });


    // PUT a recurso base

    app.put(BASE_API_PATH + "/basketball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - PUT /basketball-stats");
        res.sendStatus(405);
    });



    //----------------------------------------------------------------------------------//




    // DELETE a recurso concreto 1 parámetro

    app.delete(BASE_API_PATH_SECURE + "/basketball-stats/:parametro", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var parametro = req.params.parametro;

        console.log(Date() + " - DELETE /basketball-stats/" + parametro);

        dbbasketballstats.remove({ $or: [{ "stadium": parametro }, { "date": parametro }] }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });


    // DELETE a recurso concreto 2 parámetros

    app.delete(BASE_API_PATH_SECURE + "/basketball-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /basketball-stats/" + stadium + "/" + date);

        dbbasketballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });


    // DELETE a recurso base

    app.delete(BASE_API_PATH_SECURE + "/basketball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - DELETE /basketball-stats");

        dbbasketballstats.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else {
                console.log("DELETED " + numRemoved.result.n);
                res.sendStatus(200);
            }
        });
    });



};
