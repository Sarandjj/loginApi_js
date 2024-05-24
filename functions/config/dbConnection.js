const mongoose = require("mongoose");
const connectDb = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://kumar2004saran:saran2djj@sarankumarcluster.0zwpeta.mongodb.net/djj18?retryWrites=true&w=majority",);
        console.log("database connet:", connect.connection.host,connect.connection.name);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }

};
module.exports = connectDb;
