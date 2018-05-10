var BASE_API_PATH = "/api/v2";
var BASE_API_PATH_SECURE = "/api/v2/SECURE";
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
        "stadium": "madrid",
        "date": "2018-03-01",
        "goal": 3,
        "corner": 16,
        "fault": 14
    }, {
        "stadium": "granada",
        "date": "2018-03-11",
        "goal": 3,
        "corner": 16,
        "fault": 16
    },
    {
        "stadium": "murcia",
        "date": "2018-03-09",
        "goal": 2,
        "corner": 5,
        "fault": 15
    },
    {
        "stadium": "sevilla",
        "date": "2018-04-10",
        "goal": 9,
        "corner": 26,
        "fault": 11
    },
    {
        "stadium": "galicia",
        "date": "2018-04-15",
        "goal": 5,
        "corner": 5,
        "fault": 31
    },
    {
        "stadium": "huelva",
        "date": "2018-04-10",
        "goal": 2,
        "corner": 4,
        "fault": 23
    },
    {
        "stadium": "extremadura",
        "date": "2018-03-19",
        "goal": 1,
        "corner": 1,
        "fault": 1
    },
    {
        "stadium": "asturias",
        "date": "2018-04-05",
        "goal": 1,
        "corner": 1,
        "fault": 1
    },{
        "stadium": "navarra",
        "date": "2018-06-05",
        "goal": 1,
        "corner": 1,
        "fault": 1
    },{
        "stadium": "bar del toldo",
        "date": "2018-04-05",
        "goal": 1,
        "corner": 1,
        "fault": 1
    },{
        "stadium": "bar del bolo",
        "date": "2018-05-05",
        "goal": 1,
        "corner": 1,
        "fault": 1
    }];

footballstatsAPI.register = function(app, dbfootballstats, checkApiKey) {
    console.log("Registering router for Football Stats API...");


// METODOS

// llamada a pruebas postman

app.get(BASE_API_PATH + "/football-stats/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/1806181/collection/RVnYDKSG");
});


// Inicializamos la base de datos

app.get(BASE_API_PATH + "/football-stats/loadInitialData", (req, res) => {
    dbfootballstats.insert(initialfootballstats, function(err, newDoc) {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
            return;
        } else{

    console.log("Created");
    res.sendStatus(201);
    console.log("db initialized with: " + initialfootballstats.length);
}});
});


//POST a ruta base

app.post(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date() + " - POST /football-stats");
    var footballstat = req.body;

    if (!footballstat.stadium || !footballstat.date ||!footballstat.goal || !footballstat.corner || !footballstat.fault || Object.keys(footballstat).length != 5 ) {
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


// PUT a la ruta base 405 not allowed
app.put(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date() + " - PUT /football-stats");
    console.log("Method 405 not allowed")
    res.sendStatus(405);
});

// DELETE a recurso base

app.delete(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date() + " - DELETE /football-stats");

    dbfootballstats.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        }else if (numRemoved.result.n==0){
          console.log("Not found");
        }else{
        console.log("DELETED " + numRemoved.result.n);
        res.sendStatus(200);
        }
    });
});


// DELETE a recurso concreto (1 parámetro)

app.delete(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
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
        }else{
        console.log("DELETED " + numRemoved.result.n);
        res.sendStatus(200);
        }
    });
});

// DELETE a recurso concreto (2 parámetros)

app.delete(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
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
        }else{
        console.log("DELETED " + numRemoved.result.n);
        res.sendStatus(200);
        }
    });
});


  //POST a un recurso concreto (Error)
  app.post(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
      var stadium = req.params.stadium;
      console.log(Date() + " - POST /football-stats/" + stadium);
      console.log("method not allowed");
      res.sendStatus(405);
      return;
  });


  // PUT a recurso concreto (1 parámetros)

  app.put(BASE_API_PATH + "/football-stats/:data", (req, res) => {
      var data = req.params.data;
      console.log(Date() + " - PUT /football-stats/" + data);
      console.log("Method not allowed");
      res.sendStatus(405);
      return;

  });


  //PUT a un recurso concreto
  app.put(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
      var stadium = req.params.stadium;
      var date = req.params.date;
      var footballstat = req.body;

      console.log(Date() + " - PUT /football-stats/" + stadium +"/"+ date);

      if (stadium != footballstat.stadium || date != footballstat.date) {
          res.sendStatus(400);
          console.log("Bad request");
          return;

      }

      dbfootballstats.update({ "stadium": stadium, "date": date }, footballstat, (err, numUpdated) => {
          if (err) {
              console.log("Error accesing data base");
              res.sendStatus(500);
              return;
          }
          else if (numUpdated.result.n == 0) {
              console.log("Not found 404");
              res.sendStatus(404);
              return;
          }else{
          console.log("Updated: " + numUpdated.result.n);
          res.sendStatus(200);
          }
      });
  });



  //GET a un recurso con dos parametros

  app.get(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
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

// GET con un parametro

  app.get(BASE_API_PATH + "/football-stats/:dato", (req, res) => {
        var limit = 0;
        var offset = Number.MAX_SAFE_INTEGER;

        // Almacenamos el offset y borramos la query
        if(req.query.offset){
          offset= parseInt(req.query.offset);
          delete req.query.offset;

        }

        // almacenamos el limit y borramos la query
        if(req.query.limit){
          offset= parseInt(req.query.limit);
          delete req.query.limit;
        }

        console.log(Date() + " - GET /football-stats" + req.params.dato);

          dbfootballstats.find({ $or: [{ "stadium": req.params.dato }, { "date": req.params.dato }] }).skip(offset).limit(limit).toArray(function(err, footballstats) {

              if (err) {
                  console.error('WARNING: Error getting data from DB');
                  res.sendStatus(500);
                  return; // internal server error
              }
              else {
                  if (footballstats.length === 0) {
                      res.sendStatus(404);
                  }
                    else {
                          res.sendStatus(200).send(footballstats);
                      }
                  }

          });
  });




    //Get a un recurso base con busquedas


    app.get(BASE_API_PATH + "/football-stats", (req, res) => {

        var limit = 0;
        var offset = Number.MAX_SAFE_INTEGER;
        var query = {};

        // Almacenamos el offset y borramos la query
        if(req.query.offset){
          offset= parseInt(req.query.offset);
          delete req.query.offset;

        }

        // almacenamos el limit y borramos la query
        if(req.query.limit){
          limit= parseInt(req.query.limit);
          delete req.query.limit;
        }

        // metemos las busquedas
        for (var parametro in req.query){
          if (parametro === "stadium")
              query[parametro] = req.query[parametro];
          if (parametro === "date")
              query[parametro] = req.query[parametro];
          if (parametro === "goal")
              query["goal"] = parseInt(req.query[parametro]);
          if (parametro === "corner")
              query["corner"] = parseInt(req.query[parametro]);
          if (parametro === "fault")
              query["fault"] = parseInt(req.query[parametro]);

        }
            dbfootballstats.find(query).skip(offset).limit(limit).toArray(function(err, dbfootballstats) {
                if (err) {
                    console.error('ERROR from database');
                    res.sendStatus(500);
                    return; // internal server error
                }
              else{
                res.status(200).send(dbfootballstats);
                }
            });
    });



  




    //--------------------------SECURE--------------------------------






    //Inicializa base de datos vacia
    app.get(BASE_API_PATH_SECURE + "/football-stats/loadInitialData", (req, res) => {
        if (!checkApiKey(req, res)) return;

        dbfootballstats.insert(initialfootballstats, function(err, newDoc) {
            if (err) {
                console.log("Error accesing ");
                process.exit(1);
                return;
            }
            else {
                console.log("Created");
                res.sendStatus(201);
                console.log("DB initialized with: " + initialfootballstats.length + " partidos");
            }
        });

    });

    app.get(BASE_API_PATH_SECURE + "/football-stats/count", (req, res) => {
        if (!checkApiKey(req, res)) return;

        let query = {};

        for (let attr in req.query) {


            if (attr === "stadium")
                query[attr] = req.query[attr];
            if (attr === "date")
                 query[attr] = req.query[attr];
            if (attr === "goal")
                query["goal"] = parseInt(req.query[attr]);
            if (attr === "corner")
                query["corner"] = parseInt(req.query[attr]);
            if (attr === "fault")
                query["fault"] = parseInt(req.query[attr]);
                

        }
        

        dbfootballstats.find(query).count((err, num_footballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(String(num_footballstats));

            }
        });

    });

    app.post(BASE_API_PATH_SECURE + "/football-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - POST /football-stats");
        var footballstat = req.body;


        if (!footballstat.stadium || !footballstat.date || !footballstat.goal || !footballstat.corner || !footballstat.fault || Object.keys(footballstat).length != 5) {
            res.sendStatus(400);
            return;
        }
        else {
            dbfootballstats.find({ "stadium": footballstat.stadium, "date": footballstat.date }).toArray((err, footballstats) => {
                if (err) {
                    console.error("Error accesing DB");
                    res.sendStatus(500);
                    return;
                }
                else if (footballstats.length != 0) {
                    res.sendStatus(409);
                    return;
                }
                else {
                    dbfootballstats.insert(footballstat, function(err, newDoc) {
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    // intento de generar
   app.get(BASE_API_PATH_SECURE + "/football-stats/estadisticas", function(req, res) {
    if (!checkApiKey(req, res)) return;
    console.log(res.data);
      

        dbfootballstats.find({}).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(footballstats.map(function(d) {return d.stadium }));

            }
        });
   
      });
















    //PUT a ruta base (Error)
    app.put(BASE_API_PATH_SECURE + "/football-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - PUT /football-stats");
        console.log("Method not allowed");
        res.sendStatus(405);
    });


    //DELETE a ruta base
    app.delete(BASE_API_PATH_SECURE + "/football-stats", (req, res) => {
        if (!checkApiKey(req, res)) return;

        console.log(Date() + " - DELETE /football-stats");

        dbfootballstats.remove({}, { multi: true }, (err, numRemoved) => {
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
    app.delete(BASE_API_PATH_SECURE + "/football-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;

        console.log(Date() + " - DELETE /football-stats/" + stadium);

        dbfootballstats.remove({ "stadium": stadium }, { multi: true }, (err, numRemoved) => {
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
    app.delete(BASE_API_PATH_SECURE + "/football-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /football-stats/" + stadium + date);

        dbfootballstats.remove({ "stadium": stadium, "date": date }, (err, numRemoved) => {
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
    app.post(BASE_API_PATH_SECURE + "/football-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        console.log(Date() + " - POST /football-stats/" + stadium);
        console.log("Method not allowed");

        res.sendStatus(405);
        return;
    });

    //PUT a conjunto recursos (Error)
    app.put(BASE_API_PATH_SECURE + "/football-stats/:stadium", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        console.log(Date() + " - PUT /football-stats/" + stadium);
        console.log("Error 405");
        res.sendStatus(405);
        return;
    });


    //PUT a un recurso concreto
    app.put(BASE_API_PATH_SECURE + "/football-stats/:stadium/:date", (req, res) => {
        if (!checkApiKey(req, res)) return;

        var stadium = req.params.stadium;
        var date = req.params.date;
        var footballstat = req.body;



        console.log(Date() + " - PUT /football-stats/" + stadium + date);

        if (stadium != footballstat.stadium || date != footballstat.date || Object.keys(footballstat).length != 5) {
            console.log("Bad request");
            res.sendStatus(400);
            return;

        }

        dbfootballstats.update({ "stadium": stadium, "date": date }, footballstat, (err, numUpdated) => {
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


    app.get(BASE_API_PATH_SECURE + "/football-stats/:parametro", (req, res) => {
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

        console.log(Date() + " - GET /football-stats " + req.params.parametro);


        dbfootballstats.find({ $or: [{ "stadium": req.params.parametro }, { "date": req.params.parametro }] }).skip(offset).limit(limit).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                if (footballstats.length === 0) {
                    res.status(404).send(footballstats);
                }
                else {
                    res.status(200).send(footballstats);
                }
            }
        });
    });

    // GET Collection (WITH SEARCH)

    app.get(BASE_API_PATH_SECURE + "/football-stats", function(req, res) {
        if (!checkApiKey(req, res)) return;
        console.log("INFO: New GET request to /football-stats ");

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
            if (attr === "goal")
                query["goal"] = parseInt(req.query[attr]);
            if (attr === "corner")
                query["corner"] = parseInt(req.query[attr]);
            if (attr === "fault")
                query["fault"] = parseInt(req.query[attr]);

        }

        dbfootballstats.find(query).skip(offset).limit(limit).toArray((err, footballstats) => {
            if (err) {
                console.error("Error accesing to DB");
                res.sendStatus(500);
                return;
            }
            else {
                res.status(200).send(footballstats);

            }
        });

    });
  };
