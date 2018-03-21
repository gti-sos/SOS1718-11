var BASE_API_PATH = "/api/v1";
var footballstatsAPI = {};
module.exports = footballstatsAPI;

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

footballstatsAPI.register= function(app, dbfootballstats){
    console.log("Registering router for Football Stats API...");
    
    // Inicializamos la base de datos
    
    app.get(BASE_API_PATH+"/football-stats/loadInitialData", (req,res)=>{
        dbfootballstats.insert(initialfootballstats, function(err, newDoc){
            if (err){
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            };
        });
        res.sendStatus(200);
        console.log("INSERTED" + initialfootballstats.length);
        
    });
    
    app.get(BASE_API_PATH +"/football-help" , (req,res)=>{
        res.redirect("https://documenter.getpostman.com/view/1806181/collection/RVnYgit DKSG");
    });
    
    //Get a un recurso base
    
    app.get(BASE_API_PATH+ "/football-stats", (req, res)=>{
        dbfootballstats.find({}).toArray((err, footballstats)=>{
            if(err){
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log(Date()+ " - GET /football-stats");
            res.send(footballstats);
        });
    });
    
    //GET a recurso concreto 1 parámetro
    
    app.get(BASE_API_PATH +"/football-stats/:dato", (req, res)=>{
    var dato = req.params.dato;
    dbfootballstats.find({ $or: [{"stadium": dato}, {"date": dato}]}).toArray((err,footballstats)=>{
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        else if (footballstats.length==0){
            res.sendStatus(404);
            return;
        };
        console.log(Date()+ " - GET /football-stats" + dato);
        res.send(footballstats);
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
        console.log(Date(), "- GET /football-stats/" + stadium + "/"+ date);
        res.send(footballstats[0]);
    });
});

//POST a ruta base
app.post(BASE_API_PATH + "/football-stats", (req, res) => {
    console.log(Date() + " - POST /football-stats");
    var footballstat = req.body;

    dbfootballstats.insert(footballstat, function(err, newDoc) {
          if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            };
            res.sendStatus(201);
            console.log("INSERTED " + initialfootballstats.length);

        });
    });


//POST a un recurso concreto (Error)
app.post(BASE_API_PATH + "/football-stats/:stadium", (req, res) => {
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /football-stats/" + stadium);
    res.sendStatus(405);
    return;
});



//PUT a un recurso concreto
app.put(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
    var stadium = req.params.stadium;
    var date = req.params.date;
    var footballstat = req.body;

    console.log(Date() + " - PUT /football-stats/" + stadium + date);
    
    if (stadium != footballstat.stadium || date != footballstat.date) {
            res.sendStatus(409);
            return;

        }

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
        };
            console.log("Updated: " + numUpdated.result.n);
            res.sendStatus(200);
    });
});


    // PUT a recurso concreto 1 parámetros

    app.put(BASE_API_PATH + "/football-stats/:data", (req, res) => {
        var data = req.params.data;
        console.log(Date() + " - POST /football-stats/" + data);
        res.sendStatus(405);

    });


    // PUT a recurso base

    app.put(BASE_API_PATH + "/football-stats", (req, res) => {
        console.log(Date() + " - PUT /football-stats");
        res.sendStatus(405);
    });


 // DELETE a recurso concreto 1 parámetro

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
            };
            console.log("DELETED " + numRemoved.result.n);
            res.sendStatus(200);

        });
    });


    // DELETE a recurso concreto 2 parámetros

    app.delete(BASE_API_PATH + "/football-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /football-stats/" + stadium + "/" + date);

        dbfootballstats.remove({ "stadium": stadium, "date": date },(err, numRemoved) => {
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

    app.delete(BASE_API_PATH + "/football-stats", (req, res) => {

        console.log(Date() + " - DELETE /football-stats");

        dbfootballstats.remove({}, { multi: true },(err, numRemoved) => {
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












