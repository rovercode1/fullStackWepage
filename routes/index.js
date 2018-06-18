const express = require("express"),
passport				= require("passport"),
User = require("../models/user"),
Product = require("../models/product"),
router = express.Router();

// ============
// HOME PAGE
// ============

router.get("/", function(req, res){
  res.render("index/index");
});

// ============
// SEARCH PAGE
// ============

router.get("/search", function(req, res){
  Product.find({}, function(err, foundProduct){
    if(err){
      console.log(err);
    }else{
      User.find({}, function(err, foundUser){
        if(err){
          console.log(err);
        }else{
          res.render("index/search", {product:foundProduct, users:foundUser});
        }
      });
    }
  });
});

// ============
// USER PAGE
// ============
router.get("/usr/:user_id", function(req, res){
  // Gets the user id.
  User.findOne({username:req.params.user_id}, function(err, user){
    if(err){
      console.log(err);
    }else{
      // Gets one product from that user.
    Product.findOne({'author.username':user.username}, function(err, product){
      if(err){
        console.log(err);
      }else{
        // If the user has no products...
        if(product == null){
          return res.send('This user has no products.');
        }
       console.log(product.author.id);
      // Find all the products from that user.
       Product.find({'author.id':product.author.id}, function(err, foundProduct){
         if(err){
           console.log(err);
           console.log("Something went wrong!");
         }else{
           console.log(foundProduct);
          res.render('index/user',{products:foundProduct, user:product.author, noProductUser:user});
         }
       });
      }
    });
    }
  });
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
    res.redirect("/");
});

// ============
// PAGE NOT FOUND
// ============

router.get("/*", function(req, res){
	res.render("index/notfound");
});


module.exports = router;