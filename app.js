const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOveride = require("method-override"),
app = express(),

// ============
// ROUTES
// ============

shopRoutes  = require("./routes/shop.js"),

// ============
// MODELS
// ============
Product = require("./models/product");

// ============
// APP CONFIG
// ============

mongoose.connect("mongodb://localhost/shop_app");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOveride("_method"));

app.get("/", function(req, res){
  res.render("index");
});



// ============
// ROUTES
// ============


// ============
// PAGE NOT FOUND
// ============


app.use("/shop", shopRoutes);


app.get("/*", function(req, res){
	res.render("notfound");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})