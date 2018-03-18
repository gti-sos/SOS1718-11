var express = require("express");
var bodyParser= require("body-parser");
var app = express();
var path = require("path");
var port = (process.env.PORT || 16778);
var BASE_API_PATH="/api/v1";
var DataStore= require("nedb");
var dbBaseball= __dirname+"/baseball-stats.db"



=======
>>>>>>> 0e0af88e31289b87a5b2bc63491e9d909e067f46
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname,"public")));
var DataStore = require("nedb");



//-------------------basketball-stats-DATABASE-VARIABLES----------------------------//
var dbBasketball = __dirname+"/basketball-stats.db" 
var dbbasketball = new DataStore({
    filename: dbBasketball, 
    autoload: true
});





<<<<<<< HEAD

=======
>>>>>>> 0e0af88e31289b87a5b2bc63491e9d909e067f46
//-------------------------------------------------------------//
var dbluciano= __dirname+"/football-stats.db";
var footballstats= [
    {
        "stadium": "barcelona",
        "date": 2018-27-02,
        "mm-goal": 11,
        "mm-corner":15,
        "mm-fault":13
    },
    {
        "stadium": "florencia",
        "date": 2018-28-01,
        "mm-goal": 3,
        "mm-corner":16,
        "mm-fault":14
    }
    ];
    
var initialBasketballstats = [
        { 
        "stadium": "boston", 
        "date": 2018-02-27 , 
        "mm-first-c" : 49, 
        "mm-second-c": 15, 
        "mm-third-c" : 36, 
        "mm-fourth-c" : 42 
        },
        {
        "stadium": "charlote", 
        "date": 2018-03-09 , 
        "mm-first-c" : 64, 
        "mm-second-c": 60, 
        "mm-third-c" : 57, 
        "mm-fourth-c" : 55
        },
        {
        "stadium": "miami", 
        "date": 2018-03-09 , 
        "mm-first-c" : 57, 
        "mm-second-c": 45, 
        "mm-third-c" : 45, 
        "mm-fourth-c" : 66
        },
        {
        "stadium": "toronto", 
        "date": 2018-03-09 , 
        "mm-first-c" : 63, 
        "mm-second-c": 43, 
        "mm-third-c" :54, 
        "mm-fourth-c" : 47
        },
        {
        "stadium": "ocklahoma", 
        "date": 2018-03-09 , 
        "mm-first-c" : 54, 
        "mm-second-c": 38, 
        "mm-third-c" : 68, 
        "mm-fourth-c" : 47
        }
    ];
<<<<<<< HEAD
    
var initialbaseballstats= [
    {
    "stadium": "new-york", 
    "date": 2018-02-27,
    "mm-run" : 6, 
    "mm-hit": 25, 
    "mm-error" : 21
    },
    { 
    "stadium": "goodyear",
    "date": 2018-03-09 ,
    "mm-run" : 5,
    "mm-hit": 11,
    "mm-error" : 0
    }
    ];
=======

    
>>>>>>> 75e993a41dc7cc6ccd8290c233eec22ea325ff83
    
var baseballstats= [
    {
    "stadium": "new-york", 
    "date": 2018-02-27,
    "mm-run" : 6, 
    "mm-hit": 25, 
    "mm-error" : 21
    },
    { 
    "stadium": "goodyear",
    "date": 2018-03-09 ,
    "mm-run" : 5,
    "mm-hit": 11,
    "mm-error" : 0
    },
    
    { 
    "stadium": "seattle",
    "date": 2018-02-27 ,
    "mm-run" : 8,
    "mm-hit": 14,
    "mm-error" : 1
    },
    { 
    "stadium": "seattle",
    "date": 2018-03-09 ,
    "mm-run" : 5,
    "mm-hit": 10,
    "mm-error" : 0
    },
    {
    "stadium": "new-york", 
    "date": 2018-03-09,
    "mm-run" : 7, 
    "mm-hit": 9, 
    "mm-error" : 0
    }
    ];

<<<<<<< HEAD
app.get(BASE_API_PATH+"baseball-help", (req,res)=>{
 res.redirect("https://documenter.getpostman.com/view/3883703/collection/RVnYDKMz");
    
});


var dbbaseballstats = new DataStore({
   filename: dbBaseball, 
    autoload: true
});


=======
>>>>>>> 75e993a41dc7cc6ccd8290c233eec22ea325ff83



//------------------------------------------------------------//
app.get("/hello", (req,res) =>{
    console.log("new request to /time")
    res.send("Hello world!");
});

//-------------------football-stats----------------------------//
app.get(BASE_API_PATH+"/football-stats",(req,res)=>{
    console.log(Date()+" - GET /football-stats");
    
   

});

app.post(BASE_API_PATH+"/football-stats",(req,res)=>{
    console.log(Date()+" - POST /football-stats");
    var footballstat= req.body;
    footballstats.push(footballstat);
    res.sendStatus(201);
});

app.put(BASE_API_PATH+"/football-stats",(req,res)=>{
    console.log(Date() + " - PUT /football-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/football-stats",(req,res)=>{
    console.log(Date() + " - DELETE /football-stats");
    footballstats = [];
    res.sendStatus(200);
});


app.get(BASE_API_PATH+"/football-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - GET /football-stats/"+stadium);
    
    res.send(footballstats.filter((c)=>{
        return (c.stadium == stadium);
    })[0]);
});

app.delete(BASE_API_PATH+"/football-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - DELETE /football-stats/"+stadium);
    
    footballstats = footballstats.filter((c)=>{
        return (c.stadium != stadium);
    });
    
    res.sendStatus(200);
});

app.post(BASE_API_PATH+"/football-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /football-stats/"+stadium);
    res.sendStatus(405);
});

app.put(BASE_API_PATH+"/football-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    var stats = req.body;
    
    console.log(Date() + " - PUT /football-stats/"+stadium);
    
    if(stadium != stats.stadium){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
    footballstats = footballstats.map((c)=>{
        if(c.stadium == stats.stadium)
            return stats;
        else
            return c;
    });
    
    res.sendStatus(200);
});




//-------------------baseball-stats----------------------------//
<<<<<<< HEAD
app.get(BASE_API_PATH+"/loadInitialBaseballStats",(req,res)=>{

    dbbaseballstats.find({},(err,baseballstats)=>{
        if(err){ 
            console.log("Error accesing ");
            process.exit(1);
        } 
        
        if(baseballstats.length == 0){
            console.log("Empty database");
            dbbaseballstats.insert(initialbaseballstats);
        }else{
            console.log("DB initialized with: "+ initialbaseballstats.length + " partidos");
        }
});
=======

>>>>>>> 75e993a41dc7cc6ccd8290c233eec22ea325ff83


app.get(BASE_API_PATH+"/baseball-stats",(req,res)=>{
    console.log(Date(), " - GET /baseballstats")
    dbbaseballstats.find({},(err,baseballstats)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }
   
   res.send(baseballstats);
   
});
});

app.post(BASE_API_PATH+"/baseball-stats",(req,res)=>{
    console.log(Date() + " - POST /baseball-stats");
    var baseballstat=req.body;
    baseballstats.push(baseballstat);
    res.sendStatus(201);
});

app.put(BASE_API_PATH+"/baseball-stats", (req,res)=>{
    console.log(Date() + " - PUT /baseball-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/baseball-stats", (req,res)=>{
    console.log(Date() + " - DELETE /baseball-stats");
    baseballstats=[];
    
    dbbaseballstats.remove({}, (err, numRemoved)=>{
        if(err){
            console.log("Error remove");
        }else{
        console.log("Removed: " + numRemoved);
    
        }
        });
    res.sendStatus(200);
});

app.get(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
     var stadium = req.params.stadium;
    
    console.log(Date(), "- GET /baseball-stats/" + stadium);
    
    res.send(baseballstats.filter((c)=>{
        return (c.stadium == stadium);
    })[0]);
    
     dbbaseballstats.find({"stadium" : stadium},(err,stadium)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }
     
     
         
         
});


app.delete(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    var baseballstat = req.body;
    
    console.log(Date() + " - DELETE /baseball-stats/"+stadium);
    
     dbbaseballstats.remove({"stadium" : baseballstat.stadium }, (err, numRemoved)=>{
        if(err){
            console.log("Error remove");
            res.sendStatus(500);
        }else{
        console.log("Removed: " + numRemoved);
    
        }
        });
    
    baseballstats = baseballstats.filter((c)=>{
        return (c.stadium != stadium);
    });
    
    res.sendStatus(200);
});

app.post(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /baseball-stats/"+stadium);
    dbbaseballstats.insert({},()=>{
        
        
        
    });
    res.sendStatus(405);
});

app.put(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    var baseballstat = req.body;
    
    console.log(Date() + " - PUT /baseball-stats/"+stadium);
    
    
    dbbaseballstats.update({"stadium" : baseballstat.stadium}, baseballstat,(err, numUpdated)=>{
        if(err){
            console.log("Error update");
<<<<<<<<< saved version
    
=========
            res.sendStatus(409);
>>>>>>>>> local version
        }else{
        console.log("Updated: " + numUpdated);
    
        }
        });
    
    if(stadium != baseballstat.stadium){
        res.sendStatus(409);
        console.warn(Date()+" - Hacking attempt!");
        return;
    }
    
   baseballstats = baseballstats.map((c)=>{
        if(c.stadium == baseballstat.stadium)
            return baseballstat;
        else
            return c;
    });
    
    res.sendStatus(200);
});


//-------------------basketball-stats----------------------------//

/*
    dbbasketball.find({}, (err, basketballstats) => {
        if(err){
            console.error("Error accessing DB");
            process.exit(1);
        }
        if (basketballstats.length == 0){
            console.log("Empty DB");
            dbbasketball.insert(initialBasketballstats);
        }
        else{
            console.log("DB initialized with " + basketballstats.length + " stats");
        }
    });
*/


app.get(BASE_API_PATH+"/basketball-stats/loadInitialBasketballstats",(req,res)=> {
        
        dbbasketball.insert(initialBasketballstats, function (err, newDoc) {
            if(err){
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            };
        
        });
        res.sendStatus(200);
        console.log("Insertados  " + initialBasketballstats.length + " stats");
});

app.get(BASE_API_PATH+"/basketball-help",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3936462/collection/RVnYDKSF")
});


app.get(BASE_API_PATH+"/basketball-stats",(req,res)=>{

    dbbasketball.find({},(err,basketballstats)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }
        console.log(Date() + " - GET /basketball-stats");
        res.send(basketballstats);
    });
});


app.post(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    console.log(Date() + " - POST /basketball-stats");
    var basketballstat = req.body;
    
    dbbasketball.insert(basketballstat, function (err, newDoc) {
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        };
        res.sendStatus(200);
    });
});


app.put(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    console.log(Date() + " - PUT /basketball-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    
    console.log(Date() + " - DELETE /basketball-stats");

    dbbasketball.remove({}, { multi: true }, function (err, numRemoved) {
            if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        };
        console.log("DELETE "+numRemoved);
        res.sendStatus(200);
    });
});


app.get(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;

    dbbasketball.find({"stadium":stadium},(err,basketballstats)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }else if(basketballstats.length==0){
            res.sendStatus(404);
            return;
        };
        console.log(Date() + " - GET /basketball-stats "+ stadium );
        res.send(basketballstats);
    });
});


app.delete(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    
    console.log(Date() + " - DELETE /basketball-stats/"+stadium);

    dbbasketball.remove({ "stadium": stadium }, function (err, numRemoved) {
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }else if(numRemoved==0){
            res.sendStatus(404);
            return;
        };
        console.log("DELETE "+numRemoved);
        res.sendStatus(200);
  
    });
});



app.post(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /basketball-stats/"+stadium);
    res.sendStatus(405);
});


app.put(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
    
    var stadium = req.params.stadium;
    var basketballstat = req.body;
    
    console.log(Date() + " - PUT /basketball-stats/"+stadium);
    dbbasketball.update({"stadium": stadium}, basketballstat,(err,numUpdated)=>{
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
});    


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
app.listen(port,()=>{
    console.log("Server ready on port"+port+"!");
}).on("error",(e)=>{
    console.log("Server NOT READY:"+e);
});