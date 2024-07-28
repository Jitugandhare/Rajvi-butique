const express=require('express');

const {UserModel}=require("../model/user.model");
const userRouter=express.Router();


userRouter.get('/', (req, res) => {
    res.send('User route');
});

userRouter.post("/register", async(req,res)=>{
    const { name, email, password, age,phone,city } = req.body;
    const user=new UserModel({name,email,password,age,phone,city})
    await user.save();
    res.status(200).json({
        msg: "The new user has been registered",
        registeredUser: user,
      });
})




module.exports=userRouter;
