// A middleware to check if  the user is authenticated and a session exists
import {Request,Response,NextFunction}  from "express";
import {get}  from "lodash";


// function to authenticate the user if available 
export default function isAuth(req: Request, res: Response , next: NextFunction){

    const user = get(req,"user");

    if(!user){
      return  res.status(403).send("user not authenticated");
    }

   return  next();

}