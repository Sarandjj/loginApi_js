const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const  ServerlessHttp = require("serverless-http");
const { messaging } = require("firebase-admin");
const dotenv=require("dotenv").config();
connectDb();
const app=express();
const Port= 5001  ;
app.use(express.json());
app.use("/.netlify/api/contacts",require("./routes/contactsRoutes"));

app.get("/.netlify/api/use",(req,res)=>{
    return res.json({  messages:"dwafsfd"});
})



app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandler);
const handler =ServerlessHttp(app);
app.listen(Port,()=>{
    console.log(`the server running in  port number is ${Port}`);
});
module.exports.handler=async(event, context)=> {
    const result= await handler(event, context);
    return result; // Semicolon added here
}




