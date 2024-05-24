const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please add the contact user name"],
    }, email: {
        type: String,
        require: [true, "Please add the contact user email"],
        unique:[true,"This email is already used ."]
    }, password: {
        type: String,
        require: [true, "Please add the contact user phone Number"],
    }
},
{
    timestamps:true,
}
);

module.exports=mongoose.model("User",userSchema); 