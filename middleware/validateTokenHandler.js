const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const validateToken=asyncHandler(async(req,res,next)=>{
let token;
let authHeader=req.headers.Authorization||req.headers.authorization;

if(authHeader&&authHeader.startsWith("Bearer")){
    token=authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err) {
            res.status(401);
            throw new Error("user is not authorized");
        }
        req.user = decoded.user;
        next();
        if(!token){
            res.status(401);
            throw new Error("user is not authorized or token is missing");
        }

        console.log(decoded);
    });
}

});

module.exports=validateToken;