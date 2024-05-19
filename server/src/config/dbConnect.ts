import mongoose from "mongoose";
import { config } from "./config";


const connectToDB =async()=>{
    try {

        mongoose.connection.on("connected",()=>{
            console.log("Database connected successfully.")
        });
        mongoose.connection.on("error",(err:any)=>{
            console.log("Error in  connection to database.",err)
        });
    

    await mongoose.connect(config.databaseUri as string);
   
        
    } catch (err) {
        console.log("Database connection failed.",err);
        process.exit(1);
        
    }

}

export default connectToDB;