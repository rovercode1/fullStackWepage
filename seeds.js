var mongoose = require("mongoose");
var Product = require("./models/product");
var Comment = require("./models/comments");
var data = [
    {    
        title : "Cool T-shirt!",
        quantity :10,
        price : 12,
        image:"https://www.companycasuals.com/imglib/mresjpg/T473_Black_Model_Front_080810.jpg",
        desc : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        category : "Clothes",
    }, 
    {    
        title : "Cool Jacket!",
        quantity :13,
        price : 25,
        image:"http://www.gearone.com/media/product-images/498c79597e3aa4092a9a99d46b311014.jpg",
        desc : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        category : "Clothes",
    }, 
    {    
        title : "Cool Tent",
        quantity :30,
        price : 2,
        image: "http://campingannie.com/wp-content/uploads/2014/01/wenzel-Alpine8Dome1.jpg",
        desc : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        category : "Outdoors",
    }, 
    
];




function seedDB(){
// Remove all Products
	Product.remove({}, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Products removed");
		}
	});
// Add a few Products
  data.forEach(function(seed){
    Product.create(seed, function(err, newProduct){
      if(err){
        console.log(err);
      }else{
        console.log("Product added!");
        Comment.create({text:"I love this!", author:{username:"Bjork"}}, function(err, newComment){
          if(err){
            console.log(err);
          }else{
            newProduct.comments.push(newComment);
            newProduct.save();
            console.log("Comment added!");
          }
        });
      }
    });
  });
}



// Add a few comments


module.exports = seedDB;
