import mongoose from "mongoose";

const messageSchema = new mongoose.Schema ({
    FirstName :{
        type: String,
        required : true

    },
    LastName:{
        type: String,
    },
    email :{
        type: String,
        required : true
    },
    phone:{
        type:Number,
        required : true,
        unique : true ,
        minLength : 10,
        maxLength : 10
    },
    message:{
        type: String,
        required : true
    }
})

const Message = mongoose.model('Message', messageSchema);
export default Message;