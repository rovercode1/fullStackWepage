const express = require("express"),
User = require("../models/user"),
Product = require("../models/product"),
router = express.Router();

// ============
// USER PAGE
// ============
router.get("/:user_id", function(req, res){
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
          // return res.send('This user has no products.');
          return res.render('index/user',{noProduct:product, user:user});
        }
       console.log(product.author.id);
      // Find all the products from that user.
       Product.find({'author.id':product.author.id}, function(err, foundProduct){
         if(err){
           console.log(err);
           console.log("Something went wrong!");
         }else{
           console.log(foundProduct);
          res.render('index/user',{products:foundProduct,noProduct:product, user:user});
         }
       });
      }
    });
    }
  });
});

module.exports = router;