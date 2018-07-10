var express = require("express"),
// Able to acsess :id
router = express.Router({mergeParams:true}),
Product	= require("../models/product"),
middleware = require("../middleware"),
Comment	= require("../models/comments");

// ==========
// NEW COMMENT FORM
// ==========

router.get("/new", middleware.isLoggedIn, function(req, res){
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

router.post("/", middleware.isLoggedIn,function(req ,res){
  Product.findById(req.params.id, function (err, product) {
    if(err){
      console.log(err);
    }else{
      Comment.create(req.body.comment, function(err, newComment){
        if(err){
          console.log(err);
        }else{
				// Add username and ID to comment
  				newComment.author.id = req.user._id;
  				newComment.author.username = req.user.username;
  				// Save comment
          newComment.save();
          
          product.comments.push(newComment);
          product.save();
          console.log(newComment);
          res.redirect("/shop/"+req.params.id);
        }
      });
    }
  });
});

// ==========
// EDIT COMMENT
// ==========

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
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

router.put("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
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

router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
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

module.exports = router;