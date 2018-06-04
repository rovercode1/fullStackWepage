const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express(),

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

app.get("/", function(req, res){
  res.render("index");
});



// ============
// ROUTES
// ============

// Get items from database
app.get("/shop", function(req, res){
  Product.find({}, function(err, products){
    if(err){
      console.log(err);
    }else{
      res.render("shop", {product:products});
      var pLength = products.length;
      console.log(Math.floor(Math.random()*pLength));
    }
  });
});

// ============
// NEW PRODUCT
// ============


app.get("/shop/new", function(req, res){
  res.render("new");
});

// ============
// POST NEW PRODUCT
// ============


app.post("/shop", function(req, res){
  Product.create(req.body.product, function (err, newProduct) {
    if(err){
      console.log(err);
    }else{
      res.redirect("/shop");
    }
  });
});

// ============
// SHOW MORE OF PRODUCT
// ============


app.get("/shop/:id", function(req, res) {
  Product.findById(req.params.id, function(err, foundProduct){
    if(err){
      console.log(err);
    }else{
        res.render("show", {product:foundProduct});
      // Make random item recommendation
      //  Product.find({}, function(err, products){
      //     if(err){
      //       console.log(err);
      //    }else{
      //       res.render("shop", {product:products});
      //      var pLength = products.length;
      //      console.log(Math.floor(Math.random()*pLength));
      //   }
      // });
    }
  });
});

// ============
// PAGE NOT FOUND
// ============


app.get("/*", function(req, res){
	res.render("notfound");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})