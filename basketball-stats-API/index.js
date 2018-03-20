

//-------------------index.js basketball-stats ----------------------------//

var BASE_API_PATH = "/api/v1";
var basketballstatsAPI = {};
module.exports = basketballstatsAPI;

var initialBasketballstats = [
        { 
        "stadium": "boston", 
        "date": "2018-02-27" , 
        "mm-first-c" : 49, 
        "mm-second-c": 15, 
        "mm-third-c" : 36, 
        "mm-fourth-c" : 42 
        },
        {
        "stadium": "charlote", 
        "date": "2018-03-09" , 
        "mm-first-c" : 64, 
        "mm-second-c": 60, 
        "mm-third-c" : 57, 
        "mm-fourth-c" : 55
        },
        {
        "stadium": "miami", 
        "date": "2018-03-09", 
        "mm-first-c" : 57, 
        "mm-second-c": 45, 
        "mm-third-c" : 45, 
        "mm-fourth-c" : 66
        },
        {
        "stadium": "toronto", 
        "date": "2018-03-09" , 
        "mm-first-c" : 63, 
        "mm-second-c": 43, 
        "mm-third-c" :54, 
        "mm-fourth-c" : 47
        },
        {
        "stadium": "ocklahoma", 
        "date": "2018-03-09" , 
        "mm-first-c" : 54, 
        "mm-second-c": 38, 
        "mm-third-c" : 68, 
        "mm-fourth-c" : 47
        }
    ];
    

basketballstatsAPI.register = function(app, dbbasketballstats) {
    
    console.log("Registering routes for Basketball Stats API...");
    
    // Inicializa DB
    app.get(BASE_API_PATH + "/basketball-stats/loadInitialData", (req, res) => {

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


    app.get(BASE_API_PATH + "/basketball-help", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3936462/collection/RVnZhJZt")
    });


    app.get(BASE_API_PATH + "/basketball-stats", (req, res) => {

        dbbasketballstats.find({}, (err, basketballstats) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log(Date() + " - GET /basketball-stats");
            res.send(basketballstats);
        });
    });


    app.post(BASE_API_PATH + "/basketball-stats", (req, res) => {
        console.log(Date() + " - POST /basketball-stats");
        var basketballstat = req.body;

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


    app.put(BASE_API_PATH + "/basketball-stats", (req, res) => {
        console.log(Date() + " - PUT /basketball-stats");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/basketball-stats", (req, res) => {

        console.log(Date() + " - DELETE /basketball-stats");

        dbbasketballstats.remove({}, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            };
            console.log("DELETED " + numRemoved);
            res.sendStatus(200);
        });
    });


    app.get(BASE_API_PATH + "/basketball-stats/:parametro", (req, res) => {
        var parametro = req.params.parametro;

        dbbasketballstats.find({ $or: [{ "stadium": parametro }, { "date": parametro }] }, (err, basketballstats) => {
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

    app.get(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        dbbasketballstats.find({ "stadium": stadium, "date": date }, (err, basketballstats) => {
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


    app.delete(BASE_API_PATH + "/basketball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;

        console.log(Date() + " - DELETE /basketball-stats/" + stadium);

        dbbasketballstats.remove({ "stadium": stadium }, { multi: true }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved == 0) {
                res.sendStatus(404);
                return;
            };
            console.log("DELETED " + numRemoved);
            res.sendStatus(200);

        });
    });


    app.delete(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {
        var stadium = req.params.stadium;
        var date = req.params.date;
        console.log(Date() + " - DELETE /basketball-stats/" + stadium + "/" + date);

        dbbasketballstats.remove({ "stadium": stadium, "date": date }, function(err, numRemoved) {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            else if (numRemoved == 0) {
                res.sendStatus(404);
                return;
            };
            console.log("DELETED " + numRemoved);
            res.sendStatus(200);

        });
    });



    app.post(BASE_API_PATH + "/basketball-stats/:stadium", (req, res) => {
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /basketball-stats/" + stadium);
        res.sendStatus(405);
    });

    /*
    app.put(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
        
        var stadium = req.params.stadium;
        var basketballstat = req.body;
        
        console.log(Date() + " - PUT /basketball-stats/"+stadium);
        
        if(stadium!=basketballstat.stadium){
            res.sendStatus(409);
            return; 
        }else{
        dbbasketballstats.update({"stadium": stadium}, basketballstat,(err,numUpdated)=>{
            
            if(err){
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            
            }else if(numUpdated==0){
                res.sendStatus(404);
                return;
            };
            console.log("UPDATED "+numUpdated);
            res.sendStatus(200);
        });
        }
    }); 
    */

    app.put(BASE_API_PATH + "/basketball-stats/:parametro", (req, res) => {
        var parametro = req.params.parametro;
        console.log(Date() + " - POST /basketball-stats/" + parametro);
        res.sendStatus(405);

    });

    app.put(BASE_API_PATH + "/basketball-stats", (req, res) => {
        var stadium = req.params.stadium;
        console.log(Date() + " - POST /basketball-stats/" + stadium);
        res.sendStatus(405);

    });
    app.put(BASE_API_PATH + "/basketball-stats/:stadium/:date", (req, res) => {

        var stadium = req.params.stadium;
        var date = req.params.date;
        var basketballstat = req.body;
        console.log(Date() + " - PUT /basketball-stats/" + stadium);

        if (stadium != basketballstat.stadium || date != basketballstat.date) {
            res.sendStatus(409);
            return;

        }
        dbbasketballstats.update({ "stadium": stadium, "date": date }, basketballstat, (err, numUpdated) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;

            }
            else if (numUpdated == 0) {
                res.sendStatus(404);
                return;
            };
            console.log("UPDATED " + numUpdated);
            res.sendStatus(200);
        });
    });
};
/*
app.get(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    console.log(Date() + " - GET /basketball-stats");
    res.send(basketballstats);
});
app.get(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
   console.log(Date() + " - GET /basketball-stats/"+stadium);
    
    res.send(basketballstats.filter((c)=>{
        return (c.stadium == stadium);
    })[0]);
});
app.post(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    basketballstats.push(stat);
    res.sendStatus(201);
});
app.put(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{    
    if(stadium != stat.stadium){
         res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    basketballstats = basketballstats.map((c)=>{
      if(c.stadium == stat.stadium)
      return stat;
      else
         return c;
    });
    
    res.sendStatus(200);
});
app.delete(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    console.log(Date() + " - DELETE /basketball-stats");
    basketballstats = [];
    res.sendStatus(200);
});
*/



//--------------------------------------------------------------//
