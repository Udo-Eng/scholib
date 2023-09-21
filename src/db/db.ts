// The database connection and implementation
import mongoose  from "mongoose";
import logger from "../logger/logger";

export default async function connect(){

    const dbUrl : string  = process.env.databaseUrl as string;
    
    // Connect to the database and log the error is found 
    mongoose.connect(dbUrl).then(() => {
            logger.info("Sucessfully connected to the Database");
    }).catch((err) =>{
            logger.error("Connection to the database was unsucessful");
            process.exit(1);
    });

}