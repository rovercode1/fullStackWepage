const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

mongoose.connect("mongodb://localhost/shop_app");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})