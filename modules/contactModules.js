const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    user_id: {
        type:
            mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: [true, "Please add the contact user name"],
    },
    name: {
        type: String,
        require: [true, "Please add the contact user name"],
    }, email: {
        type: String,
        require: [true, "Please add the contact user email"],
    }, phone: {
        type: String,
        require: [true, "Please add the contact user phone Number"],
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contacts", contactSchema); 