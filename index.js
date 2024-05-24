const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const  ServerlessHttp = require("serverless-http")
const dotenv=require("dotenv").config();
connectDb();
const app=express();
const Port= 5001  ;
app.use(express.json());
app.use("/.netlify/api/contacts",require("./routes/contactsRoutes"));
const handler =ServerlessHttp(app);
app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(Port,()=>{
    console.log(`the server running in  port number is ${Port}`);
});

