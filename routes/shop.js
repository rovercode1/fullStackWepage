var express = require("express"),
router = express.Router(),
Product	= require("../models/product");

// Get items from database
router.get("/", function(req, res){
  Product.find({}, function(err, products){
    if(err){
      console.log(err);
    }else{
      res.render("shop/shop", {product:products});
      var pLength = products.length;
      // console.log(Math.floor(Math.random()*pLength));
    }
  });
});

// ============
// NEW PRODUCT
// ============
router.get("/new", function(req, res){
  res.render("shop/new");
});
// ============
// POST NEW PRODUCT
// ============
router.post("/", function(req, res){
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


router.get("/:id", function(req, res) {
  Product.findById(req.params.id, function(err, foundProduct){
    if(err){
      console.log(err);
    }else{
        res.render("shop/show", {product:foundProduct});
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
// EDIT PRODUCT
// ============

router.get("/:id/edit", function(req, res) {
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

router.put("/:id", function(req, res) {
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

router.delete("/:id", function(req, res) {
  Product.findByIdAndRemove(req.params.id, function(err, deletedProduct){
    if(err){
      console.log(err);
    }else{
      res.redirect("/shop");
    }
  });
});

module.exports = router;