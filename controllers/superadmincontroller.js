import Superadmin from "../models/superadmin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1d",
    });
}

export const registersuperadmin = async(req, res)=>{
    const {name,email,password,number}=req.body;
    try{
        const superadminexists = await Superadmin.findOne({email});
        if(superadminexists){
            return res.status(400).json({message:"Superadmin already exists"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const superadmin = await Superadmin.create({
            name,
            email,
            password:hashedpassword,
            number
        });
        res.status(201).json({message: "Super admin registered successfully"});

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

export const loginsuperadmin = async(req,res)=>{
    const {email,password}= req.body;
    try{
        const superadminlogin = await Superadmin.findOne({email});
        if(!superadminlogin){
            return res.status(400).json({message:"Super admin not found"});
        }
        const ispasswordmatch= await bcrypt.compare(password,superadminlogin.password);
        if(!ispasswordmatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        res.status(200).json({
            _id: superadminlogin._id,
            name:superadminlogin.name,
            email: superadminlogin.email,
            token: generateToken(superadminlogin._id)
        })
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
}

