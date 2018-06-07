var express = require("express"),
router = express.Router(),
Product	= require("../models/product"),
Comment	= require("../models/comments");

// ==========
// NEW COMMENT FORM
// ==========

router.get("/:id/comment/new", isLoggedIn, function(req, res){
  Product.findById(req.params.id, function(err, product){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new",{product:product});
    }
  });
});

// ==========
// POST NEW COMMENT
// ==========

router.post("/:id/comment", isLoggedIn,function(req ,res){
  Product.findById(req.params.id, function (err, product) {
    if(err){
      console.log(err);
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }else{
          product.comments.push(comment);
          product.save();
          res.redirect("/shop/"+req.params.id);
        }
      });
    }
  });
});

// ==========
// EDIT COMMENT
// ==========

router.get("/:id/comment/:comment_id/edit",isLoggedIn, function(req, res){
  Product.findById(req.params.id, function(err, product){
    if(err){
      console.log(err);
    }else{
      Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
          console.log(err);
        }else{
          res.render("comments/edit",{product:product, comment:foundComment});
        }
      });
    }
  });
});

// ==========
// UPDATE COMMENT
// ==========

router.put("/:id/comment/:comment_id/edit",isLoggedIn, function(req, res){
  Product.findById(req.params.id, function(err, product){
    if(err){
      console.log(err);
    }else{
      Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedComment) {
        if(err){
          console.log(err);
        }else{
         res.redirect("/shop/"+req.params.id);
        }
      });
    }
  });
});

// ==========
// DELETE COMMENT
// ==========

router.delete("/:id/comment/:comment_id",isLoggedIn, function (req, res) {
  Product.findById(req.params.id, function(err, product) {
      if(err){
        console.log(err);
      }else{
      Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
        if(err){
          console.log(err);
        }else{
          res.redirect("/shop/" + req.params.id);
        }
      });
      }
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;