var express = require("express");
var app = express();
var port = (process.env.PORT || 16778)

app.use("/", express.static("/home/ubuntu/workspace/SOS1718-11/public"))

app.get("/hello", (req,res) =>{
    
    res.send("Hello world!");
} );

app.listen(port);

