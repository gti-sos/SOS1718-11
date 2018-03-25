//-------------------index.js basketball-stats ----------------------------//

var BASE_API_PATH = "/api/v1";
var basketballstatsAPI = {};
module.exports = basketballstatsAPI;

var initialBasketballstats = [{
        "stadium": "boston",
        "date": "2018-02-27",
        "mm-first-c": 49,
        "mm-second-c": 15,
        "mm-third-c": 36,
        "mm-fourth-c": 42
    },
    {
        "stadium": "charlote",
        "date": "2018-03-09",
        "mm-first-c": 64,
        "mm-second-c": 60,
        "mm-third-c": 57,
        "mm-fourth-c": 55
    },
    {
        "stadium": "boston",
        "date": "2018-03-09",
        "mm-first-c": 64,
        "mm-second-c": 60,
        "mm-third-c": 57,
        "mm-fourth-c": 55
    },
    {
        "stadium": "miami",
        "date": "2018-03-09",
        "mm-first-c": 57,
        "mm-second-c": 45,
        "mm-third-c": 45,
        "mm-fourth-c": 66
    },
        {
        "stadium": "boston",
        "date": "2018-04-09",
        "mm-first-c": 64,
        "mm-second-c": 60,
        "mm-third-c": 57,
        "mm-fourth-c": 55
    },
    {
        "stadium": "toronto",
        "date": "2018-03-09",
        "mm-first-c": 63,
        "mm-second-c": 43,
        "mm-third-c": 54,
        "mm-fourth-c": 47
    },
    {
        "stadium": "ocklahoma",
        "date": "2018-03-09",
        "mm-first-c": 54,
        "mm-second-c": 38,
        "mm-third-c": 68,
        "mm-fourth-c": 47
    },
    {
        "stadium": "toronto",
        "date": "2018-05-09",
        "mm-first-c": 63,
        "mm-second-c": 43,
        "mm-third-c": 54,
        "mm-fourth-c": 47
    }
];



//----------------------------------------------------------------------------------//



basketballstatsAPI.register = function(app, dbbasketballstats, checkApiKey) {

    console.log("Registering routes for Basketball Stats API...");


    var buscador = function(base, aux_set, param_from, param_to, param_stadium, param_date) {

        console.log("Búsqueda con parametros: from = " + param_from + " ,to = " + param_to + ", stadium = " + param_stadium + ", date = " + param_date + ".")
        
        var f = new Date(param_from);
        var t = new Date(param_to);

        for (var j = 0; j < base.length; j++) {

            var date = new Date(base[j].date);
            var stadium = base[j].stadium;
            
            // FROM + TO + STADIUM
            if (param_from != undefined && param_to != undefined && param_stadium != undefined && param_date == undefined) {
                
                if (f <= date && t >= date && param_stadium == stadium) {
                        aux_set.push(base[j]);
                }
                
            // FROM + STADIUM
            }else if (param_from != undefined && param_to == undefined && param_stadium != undefined && param_date == undefined) {
                
                if (f <= date && param_stadium == stadium) {
                        aux_set.push(base[j]);
                }
            
            // TO + STADIUM
            }else if (param_from == undefined && param_to != undefined && param_stadium != undefined && param_date == undefined) {
               
                if (t >= date && param_stadium == stadium) {
                        aux_set.push(base[j]);
                }
                
            //FROM + TO
            }else if (param_from != undefined && param_to != undefined && param_stadium == undefined && param_date == undefined) {
                
                if (f <= date && t >= date) {
                        aux_set.push(base[j]);
                }
            
            // FROM
            }else if (param_from != undefined && param_to == undefined && param_stadium == undefined && param_date == undefined) {
               
                if (f <= date) {
                        aux_set.push(base[j]);
                }
            
            // TO
            }else if (param_from == undefined && param_to != undefined && param_stadium == undefined && param_date == undefined) {
               
                if (t >= date) {
                        aux_set.push(base[j]);
                }    
            // STADIUM + DATE    
            }else if (param_from == undefined && param_to == undefined && param_stadium != undefined && param_date != undefined) {
                if (param_stadium == stadium && param_date == base[j].date) {
                        aux_set.push(base[j]);
                } 
            
            // STADIUM   
            }else if(param_from == undefined && param_to == undefined && param_stadium != undefined && param_date == undefined){
                
                if (param_stadium == stadium) {
                        aux_set.push(base[j]);
                }
            
            // DATE    
            }else if (param_from == undefined && param_to == undefined && param_stadium == undefined && param_date != undefined) {

                if (param_date == base[j].date) {
                        aux_set.push(base[j]);
                }                
            }

        }

        return aux_set;

    };


    // Inicializa DB

    app.get(BASE_API_PATH + "/basketball-stats/loadInitialData", (req, res) => {
        if (!checkApiKey(req, res)) return;
        dbbasketballstats.insert(initialBasketballstats, function(err, newDoc) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            };

        });
        res.sendStatus(200);
        console.log("INSERTED " + initialBasketballstats.length);
    });

    // GET a basketball-help

    app.get(BASE_API_PATH + "/basketball-stats/docs", (req, res) => {
        if (!checkApiKey(req, res)) return;
        res.redirect("https://documenter.getpostman.com/view/3936462/collection/RVnbBxxs")
    });


    //----------------------------------------------------------------------------------//



    // GET a recurso base

    app.get(BASE_API_PATH + "/basketball-stats", (req, res) => {

        if (!checkApiKey(req, res)) return;

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.fromDate;
        var to = req.query.toDate;
        var stadium = req.query.stadium;
        var date = req.query.date;
        var aux = [];
        var aux2 = [];


        if (limit || offset >= 0) {
            dbbasketballstats.find({}).skip(offset).limit(limit).toArray(function(err, basketballstats) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (basketballstats.length === 0) {
                        res.sendStatus(404);
                    }
//                    console.log("INFO: Sending basketballstats: " + JSON.stringify(basketballstats, 2, null));

                    if (from || to || stadium || date) {

                        aux = buscador(basketballstats, aux, from, to, stadium, date);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
/*                            console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux, 2, null));
                            console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(basketballstats, 2, null));
                          console.log("INFO: Sending results with from and to and limit and offset: " + JSON.stringify(aux2, 2, null));
*/
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(basketballstats);
                    }
                }
            });

        }
        else {

            dbbasketballstats.find({}).toArray(function(err, basketballstats) {
                if (err) {
                    console.error('ERROR from database');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (basketballstats.length == 0) {
                        res.sendStatus(204);
                        return;
                    }
//                    console.log("INFO: Sending results: " + JSON.stringify(basketballstats, 2, null));
                    if (from || to || stadium || date) {
                        aux = buscador(basketballstats, aux, from, to, stadium, date);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
                        res.send(basketballstats);
                    }
                }
            });
        }


        /*
        if (!checkApiKey(req, res)) return;
        dbbasketballstats.find({}).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log(Date() + " - GET /basketball-stats");
            res.send(basketballstats);
        });
        */
    });


    // GET a recurso concreto 1 parámetro

    app.get(BASE_API_PATH + "/basketball-stats/:parametro", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var parametro = req.params.parametro;

        dbbasketballstats.find({ $or: [{ "stadium": parametro }, { "date": parametro }] }).toArray((err, basketballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (basketballstats.length == 0) {
                res.sendStatus(404);
                return;
            };
            console.log(Date() + " - GET /basketball-stats " + parametro);
            res.send(basketballstats);
        });
    });


    // GET a recurso concreto 2 parámetros

    app.get(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
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
                res.sendStatus(404);
                return;
            };
            console.log(Date() + " - GET /basketball-stats " + stadium + "/" + date);
            res.send(basketballstats[0]);
        });
    });


    //----------------------------------------------------------------------------------//


    // POST a recurso base

    app.post(BASE_API_PATH + "/basketball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;
        console.log(Date() + " - POST /basketball-stats");
        var basketballstat = req.body;

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
            dbbasketballstats.insert(basketballstat, function(err, newDoc) {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                };
                res.sendStatus(201);
                console.log("INSERTED " + initialBasketballstats.length);
            });

        });
    });


    // POST a recurso concreto

    app.post(BASE_API_PATH + "/basketball-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /basketball-stats/" + stadium);
        res.sendStatus(405);
    });


    //----------------------------------------------------------------------------------//




    // PUT a recurso concreto 2 parámetros

    app.put(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        var date = req.params.date;
        var basketballstat = req.body;
        console.log(Date() + " - PUT /basketball-stats/" + stadium);

        if (stadium != basketballstat.stadium || date != basketballstat.date) {
            res.sendStatus(400);
            return;

        }
        dbbasketballstats.update({ "stadium": stadium, "date": date }, basketballstat, (err, numUpdated) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;

            }
            else if (numUpdated.result.n == 0) {
                res.sendStatus(404);
                return;
            };
            console.log("UPDATED " + numUpdated.result.n);
            res.sendStatus(200);
        });
    });


    // PUT a recurso concreto 1 parámetros

    app.put(BASE_API_PATH + "/basketball-stats/:parametro", (req, res) => {
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

    app.delete(BASE_API_PATH + "/basketball-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;

        console.log(Date() + " - DELETE /basketball-stats/" + stadium);

        dbbasketballstats.remove({ "stadium": stadium }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            };
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);

        });
    });


    // DELETE a recurso concreto 2 parámetros

    app.delete(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
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
            };
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);

        });
    });


    // DELETE a recurso base

    app.delete(BASE_API_PATH + "/basketball-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;
        console.log(Date() + " - DELETE /basketball-stats");

        dbbasketballstats.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            };
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);
        });
    });


};

//--------------------------------------------------------------//
