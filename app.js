const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

app.get("/", function(req, res){
  res.send("Homepage")
})