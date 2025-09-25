import Rmg from "../models/rmgschema";
import Recruiter from "../models/recruiterschema"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const generatePassword =()=>{
    return Math.random().toString(36).slice(-8);
}

export const registerRMG = async(req,res)=>{
    try{
        const {name,employeeID,email}=req.body;

        const exists = await Rmg.findOne({email});
        if(exists){
            return res.status(400).json({message:"RMG already exists"});
        }
        const plainPassword = generatePassword();
        const hashedpassword = await bcrypt.hash(plainPassword,10);
        const newRMG= await Rmg.create({
            name,
            employeeID,
            email,
            password:hashedpassword,
        });
        await newRMG.save();


        const subject = "Your RMG Account Credentials";
        const text = `Dear ${name},\n\nYour RMG account has been created successfully. Here are your login credentials:\n\nEmail: ${email}\nPassword: ${plainPassword}\n\nPlease change your password after logging in for the first time.\n\nBest regards,\nAdmin Team`;

        await sendEmail(email,subject,text);
        res.status(201).json({message: "RMG registered successfully and credentials sent to email", rmgID: newRMG._id});

    }catch(error){
        res.status(500).json({message:"Error in registerRMG" + error.message});
    }
}


export const registerRecruiter = async(req,res)=>{
    try{
        const {name,employeeID,email,compan}
    }
}