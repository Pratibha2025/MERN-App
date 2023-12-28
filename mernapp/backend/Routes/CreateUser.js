const express= require('express');
const router= express.Router();
const User= require('../models/User');
const {body, validationResult}= require('express-validator')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const jwtsecret= "MyNameIsPratibhaTheGreatestOf34%";

router.post("/createuser",[
    body('email','incorrect email').isEmail(),
    body('password','incorrect password').isLength({min:5}),
    body('name','incorrect name').isLength({min:5}),
    

],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const salt= await bcrypt.genSalt(10);
    const secPassword= await bcrypt.hash(req.body.password,salt);

    try{
       await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
       })
       res.json({success:true})
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})



router.post("/loginuser",[
    body('email','incorrect email').isEmail(),
    body('password','incorrect password').isLength({min:5})
],async(req,res)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    let email= req.body.email;
    try{
      let userdata= await User.findOne({email});
      if(!userdata){
        return res.status(400).json({errors:"user not found"})
      }

      const pswrdmatch= await bcrypt.compare(req.body.password,userdata.password)
      if(!pswrdmatch){//if(req.body.password!==userdata.password){
        return res.status(400).json({errors:"wrong password"})
      }
      const data={
        user:{
            id:userdata.id
        }
      }
      const authToken= jwt.sign(data,jwtsecret)
      return res.json({success: true,authToken})

    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})


module.exports = router;