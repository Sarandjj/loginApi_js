const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const { messaging } = require("firebase-admin");
const dotenv=require("dotenv").config();
connectDb();
const app=express();
const port = process.env.PORT || 4000;
// const Port= 8080;
app.use(express.json());
app.use("/api/contacts",require("./routes/contactsRoutes"));





app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`the server running in  port number is ${port}`);
});





