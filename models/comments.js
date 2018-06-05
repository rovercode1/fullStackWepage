var mongoose = require("mongoose");
// Add fields that store users ID and users name
var commentSchema = new mongoose.Schema({
	text:String,
	author:{	// author takes infomation in the userSchema.
				// and uses it in the commentsSchema
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User",
			// Type refers to the users ID. Not a new ID.
		},
		username:String,
	},
	
});

module.exports = mongoose.model("Comment", commentSchema);