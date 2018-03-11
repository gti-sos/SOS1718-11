var express = require("express");
var app = express();

app.use("/", express.static("/home/ubuntu/workspace/SOS1718-11/public"))

app.get("/hello", (req,res) =>{
    
    res.send("Hello world!");
} );

app.listen(process.env.PORT);

