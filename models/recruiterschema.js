import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    recruiterId:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Recruiter'],
        default:'Recruiter'
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
},{timestamps:true});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);
export default Recruiter;