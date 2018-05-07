var BASE_API_PATH = "/api/v2";
var BASE_API_PATH_SECURE = "/api/v2/secure";
var footballstatsAPI = {};
module.exports = footballstatsAPI;


var initialfootballstats = [{
        "stadium": "barcelona",
        "date": "2018-02-27",
        "goal": 11,
        "corner": 15,
        "fault": 13
    },
    {
        "stadium": "florencia",
        "date": "2018-03-01",
        "goal": 3,
        "corner": 16,
        "fault": 14
    }, {
        "stadium": "paris",
        "date": "2018-03-11",
        "goal": 3,
        "corner": 16,
        "fault": 16
    },
    {
        "stadium": "glasgow",
        "date": "2018-03-09",
        "goal": 2,
        "corner": 5,
        "fault": 15
    },
    {
        "stadium": "venecia",
        "date": "2018-04-10",
        "goal": 9,
        "corner": 26,
        "fault": 11
    },
    {
        "stadium": "santiago de chile",
        "date": "2018-04-15",
        "goal": 5,
        "corner": 5,
        "fault": 31
    },
    {
        "stadium": "valencia",
        "date": "2018-04-10",
        "goal": 2,
        "corner": 4,
        "fault": 23
    },
    {
        "stadium": "praga",
        "date": "2018-03-19",
        "goal": 1,
        "corner": 1,
        "fault": 1
    }
];

footballstatsAPI.register = function(app, dbfootballstats, checkApiKey) {
    console.log("Registering router for Football Stats API...");


    var buscador = function(db, aux_set, param_from, param_to, param_stadium, param_date, param_goal, param_corner, param_fault) {

        console.log("Búsqueda con parametros: from = " + param_from + " ,to = " + param_to + ", stadium = " + param_stadium + ", date = " + param_date + ", goal = " + param_goal, ", corner = " + param_corner, ", fault = " + param_fault, +".");

        var from = new Date(param_from);
        var to = new Date(param_to);
        var goal = parseInt(param_goal);
        var corner = parseInt(param_corner);
        var fault = parseInt(param_fault);

         if (param_from != undefined || param_to != undefined || param_stadium != undefined || param_date != undefined) {

            for (var j = 0; j < db.length; j++) {

                var date = new Date(db[j].date);
                var stadium = db[j].stadium;

                // FROM + TO + STADIUM
                if (param_from != undefined && param_to != undefined && param_stadium != undefined && param_date == undefined) {

                    if (from <= date && to >= date && param_stadium == stadium) {
                        aux_set.push(db[j]);
                    }

                    // FROM + STADIUM
                }
                else if (param_from != undefined && param_to == undefined && param_stadium != undefined && param_date == undefined) {

                    if (from <= date && param_stadium == stadium) {
                        aux_set.push(db[j]);
                    }

                    // TO + STADIUM
                }
                else if (param_from == undefined && param_to != undefined && param_stadium != undefined && param_date == undefined) {

                    if (to >= date && param_stadium == stadium) {
                        aux_set.push(db[j]);
                    }

                    //FROM + TO
                }
                else if (param_from != undefined && param_to != undefined && param_stadium == undefined && param_date == undefined) {

                    if (from <= date && to >= date) {
                        aux_set.push(db[j]);
                    }

                    // FROM
                }
                else if (param_from != undefined && param_to == undefined && param_stadium == undefined && param_date == undefined) {

                    if (from <= date) {
                        aux_set.push(db[j]);
                    }

                    // TO
                }
                else if (param_from == undefined && param_to != undefined && param_stadium == undefined && param_date == undefined) {

                    if (to >= date) {
                        aux_set.push(db[j]);
                    }
                    // STADIUM + DATE    
                }
                else if (param_from == undefined && param_to == undefined && param_stadium != undefined && param_date != undefined) {
                    if (param_stadium == stadium && param_date == db[j].date) {
                        aux_set.push(db[j]);
                    }

                    // STADIUM   
                }
                else if (param_from == undefined && param_to == undefined && param_stadium != undefined && param_date == undefined) {

                    if (param_stadium == stadium) {
                        aux_set.push(db[j]);
                    }

                    // DATE    
                }
                else if (param_from == undefined && param_to == undefined && param_stadium == undefined && param_date != undefined) {

                    if (param_date == db[j].date) {
                        aux_set.push(db[j]);
                    }
                }

            }
            
            if (param_goal != undefined || param_corner != undefined || param_fault != undefined && aux_set.length > 0 ) {  
                
                
                for (var j = 0; j < aux_set.length; j++) {
                    if (param_goal != undefined && param_corner == undefined && param_fault == undefined  && aux_set.length >= 0 ) {
                        if (aux_set[j].goal != param_goal) {
                            aux_set.splice(j, 1);
                        }
                    }
                    else if (param_goal == undefined && param_corner != undefined && param_fault == undefined && aux_set.length >= 0 ) {
                        if (aux_set[j].corner != param_corner) {
                            aux_set.splice(j, 1);
                        }
                    }
                    else if (param_goal == undefined && param_corner == undefined && param_fault != undefined && aux_set.length >= 0 ) {
                        if (aux_set[j].fault != param_fault) {
                            aux_set.splice(j, 1);
                        }
                    }
                  
                }
                
            }

        }
        else if (param_goal != undefined || param_corner != undefined || param_fault != undefined ) {

            for (var i = 0; i < db.length; i++) {
                if (param_goal != undefined && param_corner == undefined && param_fault == undefined ) {
                    if (db[i].goal == param_goal) {
                        aux_set.push(db[i]);
                    }
                }
                else if (param_goal == undefined && param_corner != undefined && param_fault == undefined ) {
                    if (db[i].corner == param_corner) {
                        aux_set.push(db[i]);
                    }
                }
                else if (param_goal == undefined && param_corner == undefined && param_fault != undefined) {
                    if (db[i].fault == param_fault) {
                        aux_set.push(db[i]);
                    }
                }
                
            }
        }
        return aux_set;

    };

    // Inicializamos la base de datos

    app.get(BASE_API_PATH + "/football-stats/loadInitialData", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        dbfootballstats.insert(initialfootballstats, function(err, newDoc) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
        });
        res.sendStatus(201);
        console.log("INSERTED" + initialfootballstats.length);

    });
    

    //Get docs

    app.get(BASE_API_PATH + "/football-stats/docs", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        res.redirect("https://documenter.getpostman.com/view/1806181/collection/RVnYDKSG");
    });

    //Get a un recurso base


    app.get(BASE_API_PATH + "/football-stats", (req, res) => {
       // if (!checkApiKey(req, res)) return;

         var limit = parseInt(req.query.limit);
          var offset = parseInt(req.query.offset);
          var from = req.query.fromDate;
          var to = req.query.toDate;
          var stadium = req.query.stadium;
          var date = req.query.date;
          var goal = req.query.goal;
          var corner = req.query.corner;
          var fault = req.query.fault;
          
          var aux = [];
          var aux2= [];

      
    
        if (limit || offset>=0) {
            console.log("INFO : new request to /footballstats");
            dbfootballstats.find({}).skip(offset).limit(limit).toArray(function(err, footballstats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (footballstats.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || stadium || date || goal || corner || fault) {

                        aux = buscador(footballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(footballstats);
                    }
                }
            });

        }
        else {

            dbfootballstats.find({}).toArray(function(err, dbfootballstats) {
                if (err) {
                    console.error('ERROR from database');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (dbfootballstats.length == 0) {
                        res.sendStatus(204);
                        return;
                    }
                    if (from || to || stadium || date || goal || corner || fault ) {
                        aux = buscador(dbfootballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            if (stadium != undefined && date != undefined) {
                                res.send(aux[0]);
                            }
                            else {
                                res.send(aux);
                            }
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
                        res.send(dbfootballstats);
                    }
                }
            });
        }

    });
    //GET a recurso concreto 1 dato

    app.get(BASE_API_PATH + "/football-stats/:dato", (req, res) => {
       // if (!checkApiKey(req, res)) return;
        
          var limit = parseInt(req.query.limit);
          var offset = parseInt(req.query.offset);
          var from = req.query.fromDate;
          var to = req.query.toDate;
          var stadium = req.query.stadium;
          var date = req.query.date;
          var goal = req.query.goal;
          var corner = req.query.corner;
          var fault = req.query.fault;
          
          var aux = [];
          var aux2= [];
          var dato = req.params.dato;
          
        if (limit || offset >= 0) {
            dbfootballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).skip(offset).limit(limit).toArray(function(err, footballstats) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (footballstats.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || date || goal || corner || fault) {

                        aux = buscador(footballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(footballstats);
                    }
                }
            });

        }
        else {
          
        dbfootballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                
            }else{
             if (footballstats.length == 0) {
                res.sendStatus(404);
                return;
            }
             if (from || to || date || goal || corner || fault ) {
                        aux = buscador(footballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
            console.log(Date() + " - GET /football-stats" + dato);
            res.send(footballstats.map((c)=>{
                            delete c._id;
                            return c;
                        }));
                    }
        }
        });
    
    }
    });





    //GET a un recurso con dos parametros 

    app.get(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
     //   if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        var date = req.params.date;


        dbfootballstats.find({ "stadium": stadium, "date": date }).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (footballstats.length == 0) {
                res.sendStatus(404);
                return;
            }
            console.log(Date(), "- GET /football-stats/" + stadium + "/" + date);
            res.send(footballstats[0]);
        });
    });

    //POST a ruta base
    app.post(BASE_API_PATH + "/football-stats", (req, res) => {
       // if (!checkApiKey(req, res)) return;
        console.log(Date() + " - POST /football-stats");
        var footballstat = req.body;
        
        if (!footballstat.stadium || !footballstat.date ||!footballstat.goal || !footballstat.corner || !footballstat.fault ) {
            res.sendStatus(400);
            return;

        }else{

        dbfootballstats.find({ "stadium": footballstat.stadium, "date": footballstat.date }).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (footballstats.length != 0) {
                res.sendStatus(409);
                return;
            }else{
            dbfootballstats.insert(footballstat, function(err, newDoc) {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }else{
                    
                
                res.sendStatus(201);
                console.log("INSERTED " + initialfootballstats.length);
                }
            });
        }

        });
    }
    });


    //POST a un recurso concreto (Error)
    app.post(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /football-stats/" + stadium);
        res.sendStatus(405);
    });



    //PUT a un recurso concreto
    app.put(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
       // if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        var date = req.params.date;
        var footballstat = req.body;

        console.log(Date() + " - PUT /football-stats/" + stadium + date);

        if (stadium != footballstat.stadium || date != footballstat.date ||!footballstat.stadium || !footballstat.date ||!footballstat.goal || !footballstat.corner || !footballstat.fault ) {
            res.sendStatus(400);
            return;

        }else{

        dbfootballstats.update({ "stadium": stadium, "date": date }, footballstat, (err, numUpdated) => {
            if (err) {
                console.log("Error accesing data base");
                res.sendStatus(500);
                return;
            }
            else if (numUpdated.result.n == 0) {
                console.log("error");
                res.sendStatus(404);
                return;
            }else{
            console.log("Updated: " + numUpdated.result.n);
            res.sendStatus(200);
            }
        });
        }
    });


    // PUT a recurso concreto 1 parámetros

    app.put(BASE_API_PATH + "/football-stats/:data", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var data = req.params.data;
        console.log(Date() + " - PUT /football-stats/" + data);
        res.sendStatus(405);

    });


    // PUT a recurso base

    app.put(BASE_API_PATH + "/football-stats", (req, res) => {
       // if (!checkApiKey(req, res)) return;
        console.log(Date() + " - PUT /football-stats");
        res.sendStatus(405);
    });


    // DELETE a recurso concreto 1 parámetro

    app.delete(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;

        console.log(Date() + " - DELETE /football-stats/" + stadium);

        dbfootballstats.remove({ "stadium": stadium }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);

        });
    });


    // DELETE a recurso concreto 2 parámetros

    app.delete(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
        //if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /football-stats/" + stadium + "/" + date);

        dbfootballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);

        });
    });


    // DELETE a recurso base

    app.delete(BASE_API_PATH + "/football-stats", (req, res) => {
        //if (!checkApiKey(req, res)) return;

        console.log(Date() + " - DELETE /football-stats");

        dbfootballstats.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);
        });
    });

    // Inicializamos la base de datos

    app.get(BASE_API_PATH_SECURE + "/football-stats/loadInitialData", (req, res) => {
        if (!checkApiKey(req, res)) return;
        dbfootballstats.insert(initialfootballstats, function(err, newDoc) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
        });
        res.sendStatus(201);
        console.log("INSERTED" + initialfootballstats.length);

    });
    

    //Get docs

    app.get(BASE_API_PATH_SECURE + "/football-stats/docs", (req, res) => {
        if (!checkApiKey(req, res)) return;
        res.redirect("https://documenter.getpostman.com/view/1806181/collection/RVnYDKSG");
    });

    //Get a un recurso base


    app.get(BASE_API_PATH_SECURE + "/football-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

         var limit = parseInt(req.query.limit);
          var offset = parseInt(req.query.offset);
          var from = req.query.fromDate;
          var to = req.query.toDate;
          var stadium = req.query.stadium;
          var date = req.query.date;
          var goal = req.query.goal;
          var corner = req.query.corner;
          var fault = req.query.fault;
          
          var aux = [];
          var aux2= [];

      
    
        if (limit || offset>=0) {
            console.log("INFO : new request to /footballstats");
            dbfootballstats.find({}).skip(offset).limit(limit).toArray(function(err, footballstats) {
                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (footballstats.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || stadium || date || goal || corner || fault) {

                        aux = buscador(footballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(footballstats);
                    }
                }
            });

        }
        else {

            dbfootballstats.find({}).toArray(function(err, dbfootballstats) {
                if (err) {
                    console.error('ERROR from database');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (dbfootballstats.length == 0) {
                        res.sendStatus(204);
                        return;
                    }
                    if (from || to || stadium || date || goal || corner || fault ) {
                        aux = buscador(dbfootballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            if (stadium != undefined && date != undefined) {
                                res.send(aux[0]);
                            }
                            else {
                                res.send(aux);
                            }
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
                        res.send(dbfootballstats);
                    }
                }
            });
        }

    });
    //GET a recurso concreto 1 dato

    app.get(BASE_API_PATH_SECURE + "/football-stats/:dato", (req, res) => {
        if (!checkApiKey(req, res)) return;
        
          var limit = parseInt(req.query.limit);
          var offset = parseInt(req.query.offset);
          var from = req.query.fromDate;
          var to = req.query.toDate;
          var stadium = req.query.stadium;
          var date = req.query.date;
          var goal = req.query.goal;
          var corner = req.query.corner;
          var fault = req.query.fault;
          
          var aux = [];
          var aux2= [];
          var dato = req.params.dato;
          
        if (limit || offset >= 0) {
            dbfootballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).skip(offset).limit(limit).toArray(function(err, footballstats) {

                if (err) {
                    console.error('WARNING: Error getting data from DB');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (footballstats.length === 0) {
                        res.sendStatus(404);
                    }

                    if (from || to || date || goal || corner || fault) {

                        aux = buscador(footballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);

                        }
                        else {
                            res.sendStatus(404); // No content 
                        }
                    }
                    else {
                        res.send(footballstats);
                    }
                }
            });

        }
        else {
          
        dbfootballstats.find({ $or: [{ "stadium": dato }, { "date": dato }] }).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                
            }else{
             if (footballstats.length == 0) {
                res.sendStatus(404);
                return;
            }
             if (from || to || date || goal || corner || fault ) {
                        aux = buscador(footballstats, aux, from, to, stadium, date, goal, corner, fault);
                        if (aux.length > 0) {
                            res.send(aux);
                        }
                        else {
                            res.sendStatus(404); //No content
                        }
                    }
                    else {
            console.log(Date() + " - GET /football-stats" + dato);
            res.send(footballstats);
                    }
        }
        });
    
    }
    });





    //GET a un recurso con dos parametros 

    app.get(BASE_API_PATH_SECURE + "/football-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        var date = req.params.date;


        dbfootballstats.find({ "stadium": stadium, "date": date }).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (footballstats.length == 0) {
                res.sendStatus(404);
                return;
            }
            console.log(Date(), "- GET /football-stats/" + stadium + "/" + date);
            res.send(footballstats[0]);
        });
    });

    //POST a ruta base
    app.post(BASE_API_PATH_SECURE + "/football-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;
        console.log(Date() + " - POST /football-stats");
        var footballstat = req.body;
        
        if (!footballstat.stadium || !footballstat.date ||!footballstat.goal || !footballstat.corner || !footballstat.fault ) {
            res.sendStatus(400);
            return;

        }else{

        dbfootballstats.find({ "stadium": footballstat.stadium, "date": footballstat.date }).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (footballstats.length != 0) {
                res.sendStatus(409);
                return;
            }else{
            dbfootballstats.insert(footballstat, function(err, newDoc) {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }else{
                    
                
                res.sendStatus(201);
                console.log("INSERTED " + initialfootballstats.length);
                }
            });
        }

        });
    }
    });


    //POST a un recurso concreto (Error)
    app.post(BASE_API_PATH_SECURE + "/football-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /football-stats/" + stadium);
        res.sendStatus(405);
    });



    //PUT a un recurso concreto
    app.put(BASE_API_PATH_SECURE + "/football-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        var date = req.params.date;
        var footballstat = req.body;

        console.log(Date() + " - PUT /football-stats/" + stadium + date);

        if (stadium != footballstat.stadium || date != footballstat.date ||!footballstat.stadium || !footballstat.date ||!footballstat.goal || !footballstat.corner || !footballstat.fault ) {
            res.sendStatus(400);
            return;

        }else{

        dbfootballstats.update({ "stadium": stadium, "date": date }, footballstat, (err, numUpdated) => {
            if (err) {
                console.log("Error accesing data base");
                res.sendStatus(500);
                return;
            }
            else if (numUpdated.result.n == 0) {
                console.log("error");
                res.sendStatus(404);
                return;
            }else{
            console.log("Updated: " + numUpdated.result.n);
            res.sendStatus(200);
            }
        });
        }
    });


    // PUT a recurso concreto 1 parámetros

    app.put(BASE_API_PATH_SECURE + "/football-stats/:data", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var data = req.params.data;
        console.log(Date() + " - PUT /football-stats/" + data);
        res.sendStatus(405);

    });


    // PUT a recurso base

    app.put(BASE_API_PATH_SECURE + "/football-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;
        console.log(Date() + " - PUT /football-stats");
        res.sendStatus(405);
    });


    // DELETE a recurso concreto 1 parámetro

    app.delete(BASE_API_PATH_SECURE + "/football-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;

        console.log(Date() + " - DELETE /football-stats/" + stadium);

        dbfootballstats.remove({ "stadium": stadium }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);

        });
    });


    // DELETE a recurso concreto 2 parámetros

    app.delete(BASE_API_PATH_SECURE + "/football-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;
        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /football-stats/" + stadium + "/" + date);

        dbfootballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved.result.n == 0) {
                res.sendStatus(404);
                return;
            }
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);

        });
    });


    // DELETE a recurso base

    app.delete(BASE_API_PATH_SECURE + "/football-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - DELETE /football-stats");

        dbfootballstats.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);
        });
    });
};
