var BASE_API_PATH = "/api/v2";
var BASE_API_PATH_secure = "/api/v2/secure";
var baseballstatsAPI = {};
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
    }
];

baseballstatsAPI.register = function(app, dbbaseballstats, checkApiKey) {
    //-------------------baseball-stats----------------------------//

    console.log("Registering routes for Baseball Stats API...");

    //---------------------------MONGODB--------------------------------------//


    // SEARCH FUNCTION

    var buscador = function(base, aux_set, param_from, param_to, param_stadium, param_date, param_hit, param_run, param_error) {

        console.log("Búsqueda con parametros: from = " + param_from + " ,to = " + param_to + ", stadium = " + param_stadium + ", date = " + param_date + ", hit = " + param_hit + ", run = " + param_run + ", error = " + param_error + ".");

        var f = new Date(param_from);
        var t = new Date(param_to);

        if (param_from != undefined || param_to != undefined || param_stadium != undefined || param_date != undefined || param_hit != undefined || param_run != undefined || param_error != undefined) {

            for (var j = 0; j < base.length; j++) {

                var date = new Date(base[j].date);
                var stadium = base[j].stadium;
                var hit = base[j].hit;
                var run = base[j].run;
                var error = base[j].error;

                // FROM + TO + STADIUM
                if (param_from != undefined && param_to != undefined && param_stadium != undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (f <= date && t >= date && param_stadium == stadium) {
                        aux_set.push(base[j]);
                    }

                    // FROM + STADIUM
                }
                else if (param_from != undefined && param_to == undefined && param_stadium != undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (f <= date && param_stadium == stadium) {
                        aux_set.push(base[j]);
                    }

                    // TO + STADIUM
                }
                else if (param_from == undefined && param_to != undefined && param_stadium != undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (t >= date && param_stadium == stadium) {
                        aux_set.push(base[j]);
                    }

                    //FROM + TO
                }
                else if (param_from != undefined && param_to != undefined && param_stadium == undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (f <= date && t >= date) {
                        aux_set.push(base[j]);
                    }

                    // FROM
                }
                else if (param_from != undefined && param_to == undefined && param_stadium == undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (f <= date) {
                        aux_set.push(base[j]);
                    }

                    // TO
                }
                else if (param_from == undefined && param_to != undefined && param_stadium == undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (date <= f) {
                        aux_set.push(base[j]);
                    }
                    // STADIUM + DATE    
                }
                else if (param_from == undefined && param_to == undefined && param_stadium != undefined && param_date != undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {
                    if (param_stadium == stadium && param_date == base[j].date) {
                        aux_set.push(base[j]);
                    }

                    // STADIUM   
                }
                else if (param_from == undefined && param_to == undefined && param_stadium != undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (param_stadium == stadium) {
                        aux_set.push(base[j]);
                    }

                    // DATE    
                }
                else if (param_from == undefined && param_to == undefined && param_stadium == undefined && param_date != undefined && param_hit == undefined && param_run == undefined && param_error == undefined) {

                    if (param_date == base[j].date) {
                        aux_set.push(base[j]);
                    }

                    //RUN, HIT, ERROR
                }
                else if (param_from == undefined && param_to == undefined && param_stadium == undefined && param_date == undefined && param_hit != undefined && param_run != undefined && param_error != undefined) {

                    if (param_hit == base[j].hit && param_run == base[j].run && param_error == base[j].error) {
                        aux_set.push(base[j]);
                    }

                    //RUN    
                }
                else if (param_from == undefined && param_to == undefined && param_stadium == undefined && param_date == undefined && param_hit == undefined && param_run != undefined && param_error == undefined) {

                    if (param_run == run) {
                        aux_set.push(base[j]);
                    }

                    //HIT    
                }
                else if (param_from == undefined && param_to == undefined && param_stadium == undefined && param_date == undefined && param_hit != undefined && param_run == undefined && param_error == undefined) {

                    if (param_hit == base[j].hit) {
                        aux_set.push(base[j]);
                    }

                    //ERROR    
                }
                else if (param_from == undefined && param_to == undefined && param_stadium == undefined && param_date == undefined && param_hit == undefined && param_run == undefined && param_error != undefined) {

                    if (param_error == error) {
                        aux_set.push(base[j]);
                    }
                }

            }

        }


        return aux_set;

    };




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

        if (stadium != baseballstat.stadium || date != baseballstat.date || Object.keys(baseballstat).length != 6) {
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


    app.get(BASE_API_PATH + "/baseball-stats/:dato", (req, res) => {

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.fromDate;
        var to = req.query.toDate;
        var stadium = req.query.stadium;
        var date = req.query.date;
        var hit = req.query.hit;
        var run = req.query.run;
        var error = req.query.error;

        var aux = [];
        var aux2 = [];
        var dato = req.params.dato;

        if (limit || offset >= 0) {
            dbbaseballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).skip(offset).limit(limit).toArray(function(err, baseballstats) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (baseballstats.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || date || hit || run || error) {

                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(baseballstats);
                    }
                }
            });

        }
        else {

            dbbaseballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).toArray((err, baseballstats) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);

                }
                else {
                    if (baseballstats.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    if (from || to || date || hit || run || error) {
                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
                        console.log(Date() + " - GET /baseball-stats/" + dato);
                        res.send(baseballstats);
                    }
                }
            });

        }
    });

    // GET Collection (WITH SEARCH)

    app.get(BASE_API_PATH + "/baseball-stats", function(request, response) {
        console.log("INFO: New GET request to /baseball-stats ");

        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var from = request.query.from;
        var to = request.query.to;
        var stadium = request.query.stadium;
        var date = request.query.date;
        var hit = request.query.hit;
        var run = request.query.run;
        var error = request.query.error;
        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            dbbaseballstats.find({}).skip(offset).limit(limit).toArray(function(err, baseballstats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                    return;
                }
                else {
                    if (baseballstats.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending countries:: " + JSON.stringify(baseballstats, 2, null));
                    if (from || to || stadium || date || hit || run || error) {

                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(baseballstats, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                            response.send(aux2);
                        }
                        else {

                            response.send(aux3); // No content 
                            return;
                        }
                    }
                    else {
                        response.send(baseballstats);
                    }
                }
            });

        }
        else {

            dbbaseballstats.find({}).toArray(function(err, baseballstats) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (baseballstats.length === 0) {

                        response.send(baseballstats);
                        return;
                    }
                    //console.log("INFO: Sending baseball-stats: " + JSON.stringify(baseballstats, 2, null));
                    if (from || to || stadium || date || hit || run || error) {
                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(baseballstats);
                    }
                }
            });
        }

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


    app.get(BASE_API_PATH_secure + "/baseball-stats/:dato", (req, res) => {
                if (!checkApiKey(req, res)) return;


        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.fromDate;
        var to = req.query.toDate;
        var stadium = req.query.stadium;
        var date = req.query.date;
        var hit = req.query.hit;
        var run = req.query.run;
        var error = req.query.error;

        var aux = [];
        var aux2 = [];
        var dato = req.params.dato;

        if (limit || offset >= 0) {
            dbbaseballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).skip(offset).limit(limit).toArray(function(err, baseballstats) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (baseballstats.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || date || hit || run || error) {

                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(baseballstats);
                    }
                }
            });

        }
        else {

            dbbaseballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).toArray((err, baseballstats) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);

                }
                else {
                    if (baseballstats.length == 0) {
                        res.sendStatus(404);
                        return;
                    }
                    if (from || to || date || hit || run || error) {
                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
                        console.log(Date() + " - GET /baseball-stats/" + dato);
                        res.send(baseballstats);
                    }
                }
            });

        }
    });

    // GET Collection (WITH SEARCH)

    app.get(BASE_API_PATH_secure + "/baseball-stats", function(request, response) {
                if (!checkApiKey(request, response)) return;

        console.log("INFO: New GET request to /baseball-stats ");

        /*PRUEBA DE BUSQUEDA */
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        var from = request.query.from;
        var to = request.query.to;
        var stadium = request.query.stadium;
        var date = request.query.date;
        var hit = request.query.hit;
        var run = request.query.run;
        var error = request.query.error;
        var aux = [];
        var aux2 = [];
        var aux3 = [];


        if (limit || offset >= 0) {
            dbbaseballstats.find({}).skip(offset).limit(limit).toArray(function(err, baseballstats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                    return;
                }
                else {
                    if (baseballstats.length === 0) {
                        response.sendStatus(404); //No content
                        return;
                    }
                    console.log("INFO: Sending countries:: " + JSON.stringify(baseballstats, 2, null));
                    if (from || to || stadium || date || hit || run || error) {

                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(baseballstats, 2, null));
                            //console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
                            response.send(aux2);
                        }
                        else {

                            response.send(aux3); // No content 
                            return;
                        }
                    }
                    else {
                        response.send(baseballstats);
                    }
                }
            });

        }
        else {

            dbbaseballstats.find({}).toArray(function(err, baseballstats) {
                if (err) {
                    console.error('ERROR from database');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (baseballstats.length === 0) {

                        response.send(baseballstats);
                        return;
                    }
                    //console.log("INFO: Sending baseball-stats: " + JSON.stringify(baseballstats, 2, null));
                    if (from || to || stadium || date || hit || run || error) {
                        aux = buscador(baseballstats, aux, from, to, stadium, date, hit, run, error);
                        if (aux.length > 0) {
                            response.send(aux);
                        }
                        else {
                            response.sendStatus(404); //No content
                            return;
                        }
                    }
                    else {
                        response.send(baseballstats);
                    }
                }
            });
        }

    });
};

