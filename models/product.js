const mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
   title : String,
   quantity : Number,
   price : Number,
   image:
    {type:String, default:"https://www.wpfreeware.com/wp-content/uploads/2014/09/placeholder-images.jpg"},
   desc : String,
   category : String,
   author:{
      id:
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String,
   },
   comments:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Comment",
      }
   ]
});
module.exports =  mongoose.model("Product", productSchema);