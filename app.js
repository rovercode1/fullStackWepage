const 
methodOverride	= require("method-override"),
localStrategy			= require("passport-local"),
bodyParser				= require("body-parser"),
passport				= require("passport"),
mongoose				= require("mongoose"),
express 				= require("express"),
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

// ============
// PASSPORT CONFIG
// ============
app.use(require("express-session")({
	secret:"Bjork is amazing",
	resave:false,
	saveUninitialized:false,
}));
// Start up passport
// Start the session
app.use(passport.initialize());
app.use(passport.session());
// Authenticating User's Schema.
passport.use(new localStrategy(User.authenticate()));
// Keeps session data small
// Then deletes it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seedDB();

// Middleware - adds currentUser var to every route
// res.locals = what is avaliable in our template
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// ============
// APP CONFIG
// ============
mongoose.connect("mongodb://localhost/shop_app");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/shop", shopRoutes);
app.use("/shop/:id/comment",commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})