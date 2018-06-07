var express = require("express"),
router = express.Router(),
Product	= require("../models/product"),
Comment	= require("../models/comments");

// Get items from database
router.get("/", isLoggedIn, function(req, res){
  Product.find({}, function(err, products){
    if(err){
      console.log(err);
    }else{
      res.render("shop/shop", {product:products});
    }
  });
});
// ============
// NEW PRODUCT
// ============
router.get("/new", isLoggedIn, function(req, res){
  res.render("shop/new");
});
// ============
// POST NEW PRODUCT
// ============
router.post("/", isLoggedIn, function(req, res){
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
router.get("/:id", isLoggedIn, function(req, res) {
  // Populate - Finds the infomation in the comments id
  Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
    if(err){
      console.log(err);
    }else{
      // Make random item recommendation
      // Later versions will use catagory to pick products
        Product.find({}, function(err, recProducts){
          if(err){
            console.log(err);
          }else{
        res.render("shop/show", {product:foundProduct, recProduct:recProducts});
        }
      });
    }
  });
});
// ============
// EDIT PRODUCT
// ============
router.get("/:id/edit", isLoggedIn, function(req, res) {
  Product.findById(req.params.id, function(err, editProduct){
    if(err){
      console.log(err);
    }else{
      res.render("shop/edit",{product:editProduct});
    }
  });
});
// ============
// UPDATE PRODUCT
// ============
router.put("/:id", isLoggedIn, function(req, res) {
  Product.findByIdAndUpdate(req.params.id, req.body.product, function (err, updatedProduct) {
    if(err){
      console.log(err);
    }else{
      res.redirect("/shop/" + req.params.id);
    }
  });
});
// ============
// DELETE
// ============
router.delete("/:id", isLoggedIn, function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err, deletedProduct){
    if(err){
      console.log(err);
    }else{
      res.redirect("/shop");
    }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};
 isLoggedIn,
module.exports = router;
