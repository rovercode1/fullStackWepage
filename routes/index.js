var express = require("express"),
router = express.Router();

router.get("/", function(req, res){
  res.render("index/index");
});
router.get("/login", function(req, res){
    res.send("Login!");
});

// ============
// PAGE NOT FOUND
// ============

router.get("/*", function(req, res){
	res.render("index/notfound");
});


module.exports = router;