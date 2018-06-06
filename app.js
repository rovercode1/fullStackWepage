const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOveride = require("method-override"),
app = express(),

Product = require("./models/product"),
Comment = require("./models/comments"),
User = require("./models/user"),
seedDB	= require("./seeds"),

// ============
// ROUTES
// ============
shopRoutes  = require("./routes/shop.js"),
commentRoutes  = require("./routes/comments.js"),
authRoutes  = require("./routes/index.js");

// seedDB();
// ============
// APP CONFIG
// ============
mongoose.connect("mongodb://localhost/shop_app");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOveride("_method"));

app.use("/shop", shopRoutes);
app.use("/shop",commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})