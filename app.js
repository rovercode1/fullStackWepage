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
authRoutes  = require("./routes/index.js"),

// ============
// MODELS
// ============
Product = require("./models/product"),
User = require("./models/user");

// ============
// APP CONFIG
// ============

mongoose.connect("mongodb://localhost/shop_app");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOveride("_method"));


app.use("/shop", shopRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})