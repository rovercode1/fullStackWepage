const express = require("express"),
passport				= require("passport"),
localStrategy			= require("passport-local"),
User = require("../models/user"),
router = express.Router();

// ============
// HOME PAGE
// ============

router.get("/", function(req, res){
  res.render("index/index");
});

// ============
// REGISTER FORM
// ============

router.get("/register", function(req, res){
    res.render("index/register");
});

// ============
// REGISITER LOGIC
// ============
router.post('/register', function(req, res) {
    var newUser =new User ({username:req.body.username});
    User.register(newUser, req.body.password, function(err, newUser){
        if(err){
            console.log(err);
            return res.redirect("register");
          }
            passport.authenticate("local")(req, res, function(){
              res.redirect("/shop");
          });
    });
});

// ============
// LOGIN FORM
// ============

router.get("/login", function(req, res){
  res.render("index/login");
});

// ============
// LOGIN LOGIC
// ============


router.post("/login", passport.authenticate("local",{
  // Middleware checks if login details are correct
	successRedirect: "/shop",
	failureRedirect:"/login",
  }),function(req, res) {
});

// ============
// LOGOUT
// ============

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})

// ============
// PAGE NOT FOUND
// ============

router.get("/*", function(req, res){
	res.render("index/notfound");
});


module.exports = router;