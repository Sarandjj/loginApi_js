const asyncHandler=require("express-async-handler");
const Contact=require("../modules/contactModules");
const { Error } = require("mongoose");
const { use } = require("../routes/userRoutes");
//@des Get all contats
//@route /api/contats
//@acess public

const getContacts=asyncHandler(async(req,res)=>{
const connects=await Contact.find({user_id:req.user.id});
    res.status(200).json({connects });

});
//@des Create all contats
//@route /api/contats/id
//@acess public

const cerateContact=asyncHandler(async(req,res)=>{
    console.log("The new contact",req.body);
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("you have to full the all fields .");
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json({Contact});
});
//@des Get all contats
//@route /api/contats/:id
//@acess public

const getContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({contact});
});
//@des update all contats
//@route /api/contats/:id
//@acess public

const updateContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.body.user_id){
        res.status(403);
        throw new Error("you can't update other contacts");
    }
    const updateContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json({updateContact});
});
//@des delete all contats
//@route /api/contats/:id
//@acess public

const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.body.user_id){
        res.status(403);
        throw new Error("you can't delete  other contacts");
    }
   await Contact.deleteOne({_id:req.params.id});
   res.status(200).json({ message: "Contact deleted successfully" });

  //  res.status(200).json({contact});
});


module.exports={getContacts,cerateContact,getContact,updateContact,deleteContact};