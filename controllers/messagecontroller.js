// import Message from "../models/messageSchema";
import Message from "../models/messageSchema.js"

export const addMessage = async(req,res)=>{
    const {FirstName, LastName, email, phone, message} = req.body;

    if(!FirstName || !email || !phone || !message){
        return res.status(422).json({error : "Please fill all the required fields"});
    }
    try{
        const newmessage = new Message.create({
            FirstName,
            LastName,
            email,
            phone,
            message
        });
        res.status(201).json({FirstName : newmessage.FirstName,LastName : newmessage.LastName, email : newmessage.email, phone : newmessage.phone, message : newmessage.message});
    }catch(error){
        console.error("Error in sending message", error);
        res.status(500).json({error : "Failed to send message"});
    }
}

