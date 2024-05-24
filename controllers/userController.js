const asyncHandler = require("express-async-handler");
const User = require("../modules/userModules");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@des Get all contats
//@route /api/contats
//@acess public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("you have to full the all fields .");
    }
    const userAvilable = await User.findOne({ email });
    if (userAvilable) {
        res.status(400);
        throw new Error("user email is already used .");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("HashedPassword", hashedPassword)

    const user = await User.create(
        {
            username, email, password: hashedPassword
        }
    );
    if (User) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("user data is invalid.");
    }
    res.status(200).json({ message: "user register successfully" });
});



const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
   
    if (!email || !password) {
        res.status(400);
        throw new Error("you have to full the all fields .");
    }
    const user = await User.findOne({ email });
    console.log(user);
    const ss=await bcrypt.compare(password, user.password);
   
    if (user && await bcrypt.compare(password, user.password)) {
        const acessToken = jwt.sign({
            user: { username: user.username, email: user.email, id: user.id },
        }, process.env.ACCESS_TOKEN, { expiresIn: "30 minutes" });
        console.log(acessToken);
        res.status(200).json({ message: "user login successfully" });
    }
    else{
        res.status(400);
        throw new Error("user email or password is invalid.");
    }
    
});



const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});



module.exports = { registerUser, loginUser, currentUser };