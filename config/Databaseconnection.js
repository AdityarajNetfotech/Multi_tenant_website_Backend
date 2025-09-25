import mongoose from "mongoose";
const Databaseconnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB is connected');
        console.log('✅ Connected to DB:', mongoose.connection.name);

    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

export default Databaseconnection