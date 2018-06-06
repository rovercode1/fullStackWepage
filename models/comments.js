var mongoose = require("mongoose");
// Add fields that store users ID and users name
var commentSchema = new mongoose.Schema({
	text:String,
	author: String,
	
});

module.exports = mongoose.model("Comment", commentSchema);