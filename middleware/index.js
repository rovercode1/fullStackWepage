var Product = require("../models/product");
var Comment = require("../models/comments");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkProductOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Product.findById(req.params.id, function(err, foundProduct){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the Product?
            if(foundProduct.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;