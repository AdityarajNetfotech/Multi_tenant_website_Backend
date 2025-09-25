import mongoose from 'mongoose';

const rmgSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
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
    number:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['RMG'],
        default:'RMG'
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
},{timestamps:true
});

const Rmg = mongoose.model('Rmg', rmgSchema);
export default Rmg;