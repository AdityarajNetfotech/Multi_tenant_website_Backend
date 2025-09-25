import Databaseconnection from './config/Databaseconnection';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const PORT = process.env.PORT || 8000;

Databaseconnection().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error)=>{
    console.error("Failed to start server", error);
    process.exit(1);
})