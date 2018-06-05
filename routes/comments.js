var express = require("express"),
router = express.Router(),
Product	= require("../models/product");

router.get("/comment", function(req, res){
    res.render("comments/new");
});

router.post("/", function(req, res){
    
});

module.exports = router;