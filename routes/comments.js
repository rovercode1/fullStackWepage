var express = require("express"),
router = express.Router(),
Product	= require("../models/product"),
Comment	= require("../models/comments");

router.get("/comment", function(req, res){
    res.render("comments/new");
});

router.post("/:id/:comment_id", function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err)
        }else{
            console.log(foundProduct)
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err)
                }else{
                    res.render("/shop/show")
                }
            })
        }
    })
});

module.exports = router;