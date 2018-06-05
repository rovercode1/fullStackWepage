const mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
    title : String,
    quantity : Number,
    price : Number,
	  image:
		{type:String, default:"https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg"},
    desc : String,
    category : String,
});

module.exports =  mongoose.model("Product", productSchema);