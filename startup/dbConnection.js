
import mongoose from "mongoose";
import config from "../config/index.js";



export async function dbConnection() {
    try {
        await mongoose.connect(config.database.url) ;
        console.log("Connected to MongoDB Database Successfully");
    }
    catch(error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
}
