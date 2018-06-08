const mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose")
var userSchema = new mongoose.Schema({
    username : String,
    password :String,
});
// Adds methods to user
userSchema.plugin(passportLocalMongoose)

module.exports =  mongoose.model("User", userSchema);