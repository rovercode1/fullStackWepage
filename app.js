const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

app.use("view engine", "ejs")

app.get("/", function(req, res){
  res.send("index");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})