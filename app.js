const 
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

// ============
// APP CONFIG
// ============

mongoose.connect("mongodb://localhost/shop_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
  res.render("index");
});

// ============
// MODELS
// ============

var productSchema = new mongoose.Schema({
    title : String,
    quantity : Number,
    price : Number,
	  image:
			{type:String, default:"https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg"},
    desc : String,
});
var Product = mongoose.model("Product", productSchema);


// ============
// ROUTES
// ============

// Get items from database
app.get("/shop", function(req, res){
  Product.find({}, function(err, products){
    if(err){
      console.log(err);
    }else{
      res.render("shop", {product:products});
    }
  });
});

app.get("/shop/new", function(req, res){
  res.render("new");
});

app.post("/shop", function(req, res){
  Product.create(req.body.product, function (err, newProduct) {
    if(err){
      console.log(err);
    }else{
      console.log(newProduct);
      res.redirect("/shop");
    }
  });
  console.log(req.body.product);
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is working...");
})