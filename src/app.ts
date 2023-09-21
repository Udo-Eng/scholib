// Entry point of my application SCHOLIB a book sharing application
import express, { NextFunction,Response,Request,Errback } from 'express';
import connect from "./db/db";
import logger   from "./logger/logger";
import healthCheckRouter from  "./routes/health";
import UserRouter from "./routes/user.route";
import SessionRouter from "./routes/session.route";
import deserializeUser from './middleware/DeserializeUser';
import * as dotenv from 'dotenv';
dotenv.config();


const app =  express();


const PORT =  process.env.PORT || 5000;

const host = process.env.host || "localhost";

// add this middleware to parse the req body into an object 
app.use(express.json());

app.use(express.urlencoded({extended : false}));


// connecting to the database 
connect();


// middleware to deserialize the user from the accesstoken
app.use(deserializeUser);


// Basic route to handle root request
app.use("/healthcheck",healthCheckRouter);


// route to handle the user route
app.use("/api/users",UserRouter);


// set up route to handle user login sessions 
app.use("/api/sessions",SessionRouter);



app.use((err : Error,req : Request,res : Response,next : NextFunction) => {
    if(err) return res.status(500).send("Server error occurred");

    return res.status(404).send("The resource was not found ");
})


// Set the server up to listen on port set by the environment variable PORT
app.listen(PORT,()=>{
    // tslint:disable-next-line:no-console
     logger.info(`Server listening at http://${host}:${PORT}`);
});






