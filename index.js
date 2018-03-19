var express = require("express");
var bodyParser= require("body-parser");
var app = express();
var path = require("path");
var port = (process.env.PORT || 16778);
var BASE_API_PATH="/api/v1";
var DataStore= require("nedb");
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname,"public")));




//-------------------football-stats-DATABASE-VARIABLES----------------------------//
var dbFootball = __dirname+"/football-stats.db" 
var dbfootballstats = new DataStore({
    filename: dbFootball, 
    autoload: true
});

//-------------------basketball-stats-DATABASE-VARIABLES----------------------------//
var dbBasketball = __dirname+"/basketball-stats.db" 
var dbbasketballstats = new DataStore({
    filename: dbBasketball, 
    autoload: true
});

//-------------------baseball-stats-DATABASE-VARIABLES----------------------------//
var dbBaseball= __dirname+"/baseball-stats.db"
var dbbaseballstats = new DataStore({
   filename: dbBaseball, 
    autoload: true
});


//-------------------------------------------------------------//
var initialfootballstats= [
    {
        "stadium": "barcelona",
        "date": "2018-02-27",
        "mm-goal": 11,
        "mm-corner":15,
        "mm-fault":13
    },
    {
        "stadium": "florencia",
        "date":"2018-03-01",
        "mm-goal": 3,
        "mm-corner":16,
        "mm-fault":14
    },{
        "stadium": "barcelona",
        "date": "2018-03-11",
        "mm-goal": 3,
        "mm-corner":16,
        "mm-fault":16
    },
    {
        "stadium": "glasgow",
        "date": "2018-03-09",
        "mm-goal": 2,
        "mm-corner":5,
        "mm-fault":15
    },,
    {
        "stadium": "florencia",
        "date": "2018-03-11",
        "mm-goal": 9,
        "mm-corner":26,
        "mm-fault":11
    }
    ];
    
    

    
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

var initialbaseballstats= [
    {
    "stadium": "new-york", 
    "date": "2018-02-27",
    "mm-run" : 6, 
    "mm-hit": 25, 
    "mm-error" : 21
    },
    { 
    "stadium": "goodyear",
    "date": "2018-03-09" ,
    "mm-run" : 5,
    "mm-hit": 11,
    "mm-error" : 0
    },
    
    { 
    "stadium": "seattle",
    "date": "2018-02-27" ,
    "mm-run" : 8,
    "mm-hit": 14,
    "mm-error" : 1
    },
    { 
    "stadium": "seattle",
    "date": "2018-03-09" ,
    "mm-run" : 5,
    "mm-hit": 10,
    "mm-error" : 0
    },
    {
    "stadium": "new-york", 
    "date": "2018-03-09",
    "mm-run" : 7, 
    "mm-hit": 9, 
    "mm-error" : 0
    }
    ];




//------------------------------------------------------------//
app.get("/hello", (req,res) =>{
    console.log("new request to /time")
    res.send("Hello world!");
});

//-------------------football-stats----------------------------//

app.get(BASE_API_PATH+"/football-help", (req,res)=>{
 res.redirect("https://documenter.getpostman.com/view/1806181/collection/RVnYgit DKSG");
    
});

//Inicializa base de datos vacia
app.get(BASE_API_PATH+"/football-stats/loadInitialData",(req,res)=>{

    dbfootballstats.insert(initialfootballstats, function (err, newDoc){
        if(err){ 
            console.log("Error accesing ");
            process.exit(1);
            return;
        }else{
            res.sendStatus(201);
            console.log("DB initialized with: "+ initialfootballstats.length + " partidos");
        }
});

});



//GET a ruta base
app.get(BASE_API_PATH+"/football-stats",(req,res)=>{
    console.log(Date(), " - GET /football-stats");
    dbfootballstats.find({},(err,footballstats)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }
   
   res.send(footballstats);
   
});
});


//POST a ruta base
app.post(BASE_API_PATH+"/football-stats",(req,res)=>{
    console.log(Date() + " - POST /football-stats");
    var footballstat=req.body;
    
    dbfootballstats.insert(footballstat, (err,newDoc)=>{
     
     if(err){
         console.log("Conflicto");
         res.sendStatus(409);
     }   
    
    res.sendStatus(201);
    });
});




//PUT a ruta base (Error)
app.put(BASE_API_PATH+"/football-stats", (req,res)=>{
    console.log(Date() + " - PUT /football-stats");
    res.sendStatus(405);
});


//DELETE a ruta base
app.delete(BASE_API_PATH+"/football-stats", (req,res)=>{
    console.log(Date() + " - DELETE /football-stats");

    dbfootballstats.remove({}, {multi : true}, (err, numRemoved)=>{
        if(err){
            console.log("Error accesing data base");
            res.sendStatus(500);
        }else{
        console.log("Removed: " + numRemoved);
        res.sendStatus(200);

        }
        });
});


//GET a un conjunto de recursos concreto
app.get(BASE_API_PATH+"/football-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    
    console.log(Date(), "- GET /football-stats/" + stadium);
    
     dbfootballstats.find({"stadium" : stadium},(err,stadium)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }
     
     res.send(stadium);
    });
});


//GET a un recurso concreto
app.get(BASE_API_PATH+"/football-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date =req.params.date;
    
   
    dbfootballstats.find({"stadium" : stadium, "date" : date},(err,footballstats)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }else if(footballstats.length==0){
            res.sendStatus(404);
            return;
        }
      console.log(Date(), "- GET /football-stats/" + stadium+ date);
     res.send(footballstats);
    });
});


//DELETE a un conjunto de recursos concreto
app.delete(BASE_API_PATH+"/football-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    
    console.log(Date() + " - DELETE /football-stats/"+stadium);
    
     dbfootballstats.remove({"stadium" : stadium },{multi:true}, (err, numRemoved)=>{
        if(err){
            console.log("Error accesing DB");
            res.sendStatus(500);
            return;
        }else{
        console.log("Removed: " + numRemoved);
        res.sendStatus(200);
        }
    });
});


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/football-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date = req.params.date; 
    console.log(Date() + " - DELETE /football-stats/"+stadium + date);
    
     dbfootballstats.remove({"stadium" : stadium , "date": date}, (err, numRemoved)=>{
        if(err){
            console.log("Error remove");
            res.sendStatus(500);
            return;
        }else{
        console.log("Removed: " + numRemoved);
        res.sendStatus(200);
        }
        });
});

//POST a un recurso concreto (Error)
app.post(BASE_API_PATH+"/football-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /football-stats/"+stadium);
    res.sendStatus(405);
    return;
});

//PUT a conjunto recursos (Error)
app.put(BASE_API_PATH+"/football-stats/:stadium", (req,res)=>{
    var stadium= req.params.stadium;
    console.log(Date() + " - PUT /football-stats/"+ stadium);
    console.log("Error 405");
    res.sendStatus(405);
    return;
});


//PUT a un recurso concreto
app.put(BASE_API_PATH+"/football-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date = req.params.date;
    var footballstat = req.body;
    
    console.log(Date() + " - PUT /football-stats/"+stadium+date);
    
    dbfootballstats.update({"stadium" : footballstat.stadium}, footballstat,(err, numUpdated)=>{
        if(err){
            console.log("Error accesing data base");
            res.sendStatus(500);
            return;
      }else if(numUpdated == 0){
      
          console.log("error");
          res.sendStatus(404);
          return;
      }else{
        console.log("Updated: " + numUpdated);
        res.sendStatus(200);
        }
    });
});

//-------------------baseball-stats----------------------------//



app.get(BASE_API_PATH+"/baseball-help", (req,res)=>{
 res.redirect("https://documenter.getpostman.com/view/3883703/collection/RVnYDKMz");
    
});


//Inicializa base de datos vacia
app.get(BASE_API_PATH+"/baseball-stats/loadInitialData",(req,res)=>{

    dbbaseballstats.insert(initialbaseballstats, function (err, newDoc){
        if(err){ 
            console.log("Error accesing ");
            process.exit(1);
            return;
        }else{
            res.sendStatus(201);
            console.log("DB initialized with: "+ initialbaseballstats.length + " partidos");
        }
});

});



//GET a ruta base
app.get(BASE_API_PATH+"/baseball-stats",(req,res)=>{
    console.log(Date(), " - GET /baseball-stats");
    dbbaseballstats.find({},(err,baseballstats)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }
   
   res.send(baseballstats);
   
});
});


//POST a ruta base
app.post(BASE_API_PATH+"/baseball-stats",(req,res)=>{
    console.log(Date() + " - POST /baseball-stats");
    var baseballstat=req.body;
    
    dbbaseballstats.insert(baseballstat, (err,newDoc)=>{
     
     if(err){
         console.log("Conflicto");
         res.sendStatus(409);
     }   
    
    res.sendStatus(201);
    });
});




//PUT a ruta base (Error)
app.put(BASE_API_PATH+"/baseball-stats", (req,res)=>{
    console.log(Date() + " - PUT /baseball-stats");
    res.sendStatus(405);
});


//DELETE a ruta base
app.delete(BASE_API_PATH+"/baseball-stats", (req,res)=>{
    console.log(Date() + " - DELETE /baseball-stats");

    dbbaseballstats.remove({}, {multi : true}, (err, numRemoved)=>{
        if(err){
            console.log("Error accesing data base");
            res.sendStatus(500);
        }else{
        console.log("Removed: " + numRemoved);
        res.sendStatus(200);

        }
        });
});


//GET a un conjunto de recursos concreto
app.get(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    
    console.log(Date(), "- GET /baseball-stats/" + stadium);
    
     dbbaseballstats.find({"stadium" : stadium},(err,stadium)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }
     
     res.send(stadium);
    });
});


//GET a un recurso concreto
app.get(BASE_API_PATH+"/baseball-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date =req.params.date;
    
   
    dbbaseballstats.find({"stadium" : stadium, "date" : date},(err,baseballstats)=>{
    if(err){
       console.error("Error accesing DB");
       res.sendStatus(500);
      return;
     }else if(baseballstats.length==0){
            res.sendStatus(404);
            return;
        }
      console.log(Date(), "- GET /baseball-stats/" + stadium+ date);
     res.send(baseballstats);
    });
});


//DELETE a un conjunto de recursos concreto
app.delete(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    
    console.log(Date() + " - DELETE /baseball-stats/"+stadium);
    
     dbbaseballstats.remove({"stadium" : stadium },{multi:true}, (err, numRemoved)=>{
        if(err){
            console.log("Error accesing DB");
            res.sendStatus(500);
            return;
        }else{
        console.log("Removed: " + numRemoved);
        res.sendStatus(200);
        }
    });
});


//DELETE a un recurso concreto
app.delete(BASE_API_PATH+"/baseball-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date = req.params.date; 
    console.log(Date() + " - DELETE /baseball-stats/"+stadium + date);
    
     dbbaseballstats.remove({"stadium" : stadium , "date": date}, (err, numRemoved)=>{
        if(err){
            console.log("Error remove");
            res.sendStatus(500);
            return;
        }else{
        console.log("Removed: " + numRemoved);
        res.sendStatus(200);
        }
        });
});

//POST a un recurso concreto (Error)
app.post(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /baseball-stats/"+stadium);
    res.sendStatus(405);
    return;
});

//PUT a conjunto recursos (Error)
app.put(BASE_API_PATH+"/baseball-stats/:stadium", (req,res)=>{
    var stadium= req.params.stadium;
    console.log(Date() + " - PUT /baseball-stats/"+ stadium);
    console.log("Error 405");
    res.sendStatus(405);
    return;
});


//PUT a un recurso concreto
app.put(BASE_API_PATH+"/baseball-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date = req.params.date;
    var baseballstat = req.body;
    
    console.log(Date() + " - PUT /baseball-stats/"+stadium+date);
    
    dbbaseballstats.update({"stadium" : baseballstat.stadium}, baseballstat,(err, numUpdated)=>{
        if(err){
            console.log("Error accesing data base");
            res.sendStatus(500);
            return;
      }else if(numUpdated == 0){
      
          console.log("error");
          res.sendStatus(404);
          return;
      }else{
        console.log("Updated: " + numUpdated);
        res.sendStatus(200);
        }
    });
});

/*
app.get(BASE_API_PATH+"/baseball-stats",(req,res)=>{
    console.log(Date(), " - GET /baseballstats")
       res.send(baseballstats);
});
});


app.post(BASE_API_PATH+"/baseball-stats",(req,res)=>{
    console.log(Date() + " - POST /baseball-stats");
    var baseballstat=req.body;
    baseballstats.push(baseballstat);
    res.sendStatus(201);
});



app.get(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
     var stadium = req.params.stadium;
    
    console.log(Date(), "- GET /baseball-stats/" + stadium);
    
    res.send(baseballstats.filter((c)=>{
        return (c.stadium == stadium);
    })[0]);
    
});    

app.put(BASE_API_PATH+"/baseball-stats", (req,res)=>{
    console.log(Date() + " - PUT /baseball-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/baseball-stats",(req,res)=>{
    console.log(Date() + " - DELETE /baseball-stats/"+stadium);
    baseballstats=[];
    res.sendStatus(200);
 });

app.delete(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    
    console.log(Date() + " - DELETE /baseball-stats/"+stadium);
     baseballstats = baseballstats.filter((c)=>{
        return (c.stadium != stadium);
    });
    res.sendStatus(200);
 });


app.post(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log("Error 409");
    res.sendStatus(409);
)};


app.put(BASE_API_PATH+"/baseball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    var baseballstat = req.body;
    
        console.log(Date() + " - PUT /baseball-stats/"+stadium);

    
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
*/











//-------------------basketball-stats----------------------------//

/*
    dbbasketballstats.find({}, (err, basketballstats) => {
        if(err){
            console.error("Error accessing DB");
            process.exit(1);
        }
        if (basketballstats.length == 0){
            console.log("Empty DB");
            dbbasketballstats.insert(initialBasketballstats);
        }
        else{
            console.log("DB initialized with " + basketballstats.length + " stats");
        }
    });
*/

// Inicializa DB
app.get(BASE_API_PATH+"/basketball-stats/loadInitialData",(req,res)=> {
        
        dbbasketballstats.insert(initialBasketballstats, function (err, newDoc) {
            if(err){
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            };
        
        });
        res.sendStatus(200);
        console.log("INSERTED "+initialBasketballstats.length);
});


app.get(BASE_API_PATH+"/basketball-help",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3936462/collection/RVnZhJZt")
});


app.get(BASE_API_PATH+"/basketball-stats",(req,res)=>{

    dbbasketballstats.find({},(err,basketballstats)=>{
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
    
    dbbasketballstats.insert(basketballstat, function (err, newDoc) {
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        };
        res.sendStatus(201);
        console.log("INSERTED "+initialBasketballstats.length);

    });
});


app.put(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    console.log(Date() + " - PUT /basketball-stats");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    
    console.log(Date() + " - DELETE /basketball-stats");

    dbbasketballstats.remove({}, { multi: true }, function (err, numRemoved) {
            if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        };
        console.log("DELETED "+numRemoved);
        res.sendStatus(200);
    });
});


app.get(BASE_API_PATH+"/basketball-stats/:parametro",(req,res)=>{
    var parametro = req.params.parametro;

    dbbasketballstats.find({$or:[{"stadium":parametro}, {"date":parametro}]},(err,basketballstats)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }else if(basketballstats.length==0){
            res.sendStatus(404);
            return;
        };
        console.log(Date() + " - GET /basketball-stats "+ parametro );
        res.send(basketballstats);
    });
});

app.get(BASE_API_PATH+"/basketball-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date =req.params.date;
    dbbasketballstats.find({"stadium":stadium, "date":date},(err,basketballstats)=>{
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }else if(basketballstats.length==0){
            res.sendStatus(404);
            return;
        };
        console.log(Date() + " - GET /basketball-stats "+ stadium+ "/"+date );
        res.send(basketballstats[0]);
    });
});


app.delete(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    
    console.log(Date() + " - DELETE /basketball-stats/"+stadium);

    dbbasketballstats.remove({ "stadium": stadium },{ multi: true }, function (err, numRemoved) {
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }else if(numRemoved==0){
            res.sendStatus(404);
            return;
        };
        console.log("DELETED "+numRemoved);
        res.sendStatus(200);
  
    });
});


app.delete(BASE_API_PATH+"/basketball-stats/:stadium/:date",(req,res)=>{
    var stadium = req.params.stadium;
    var date = req.params.date;
    console.log(Date() + " - DELETE /basketball-stats/"+stadium+"/"+date);

    dbbasketballstats.remove({ "stadium": stadium, "date": date }, function (err, numRemoved) {
        if(err){
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }else if(numRemoved==0){
            res.sendStatus(404);
            return;
        };
        console.log("DELETED "+numRemoved);
        res.sendStatus(200);
  
    });
});



app.post(BASE_API_PATH+"/basketball-stats/:stadium",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /basketball-stats/"+stadium);
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

app.put(BASE_API_PATH+"/basketball-stats/:parametro",(req,res)=>{
    var parametro = req.params.parametro;
    console.log(Date() + " - POST /basketball-stats/"+parametro);
    res.sendStatus(405);
    
});

app.put(BASE_API_PATH+"/basketball-stats",(req,res)=>{
    var stadium = req.params.stadium;
    console.log(Date() + " - POST /basketball-stats/"+stadium);
    res.sendStatus(405);
    
}); 
app.put(BASE_API_PATH+"/basketball-stats/:stadium/:date",(req,res)=>{
    
    var stadium = req.params.stadium;
    var date = req.params.date;
    var basketballstat = req.body;
    console.log(Date() + " - PUT /basketball-stats/"+stadium);
    
    if(stadium!=basketballstat.stadium||date!=basketballstat.date){
        res.sendStatus(409);
        return;  
        
    }
    dbbasketballstats.update({"stadium": stadium, "date":date}, basketballstat,(err,numUpdated)=>{
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