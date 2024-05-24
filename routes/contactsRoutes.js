const express=require("express");
const router=express.Router();
const{getContacts,cerateContact,getContact,updateContact,deleteContact }=require("../controllers/contactControllers");
const { route } = require("./userRoutes");
const validateToken = require("../function/middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(cerateContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);   




module.exports=router;