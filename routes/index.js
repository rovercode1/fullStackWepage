var express = require("express"),
router = express.Router();

router.get("/", function(req, res){
  res.render("index/index");
});

router.get("/register", function(req, res){
    res.render("index/register");
});



// ============
// PAGE NOT FOUND
// ============

router.get("/*", function(req, res){
	res.render("index/notfound");
});


module.exports = router;