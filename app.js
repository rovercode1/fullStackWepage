const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

app.get("/", function(req, res){
  res.send("Homepage");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})