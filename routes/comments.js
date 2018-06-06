var express = require("express"),
router = express.Router(),
Product	= require("../models/product"),
Comment	= require("../models/comments");

router.get("/shop/:id/comment/new", function(req, res){
  Product.findById(req.params.id, function(err, product){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new",{product:product});
    }
  });
});

router.post("/shop/:id/comment", function(req ,res){
  Product.findById(req.params.id, function (err, product) {
    if(err){
      console.log(err);
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }else{
          console.log(req.body.comment);
          console.log(product)
          product.comments.push(comment);
          product.save();
          console.log(product);
          res.redirect("/shop/"+req.params.id);
        }
      });
    }
  });
});
module.exports = router;