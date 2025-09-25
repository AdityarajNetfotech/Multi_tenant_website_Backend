import mongoose from "mongoose";

const superadminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    number:{
        type:Number,
        required: true
    },
},{timestamps:true});

const Superadmin = mongoose.model('Superadmin', superadminSchema);
export default Superadmin;