// Create  the handler functions for incoming requests to the session service
import {Request, Response}  from "express";
import {get}  from "lodash";
import config from "config";
import {sign}  from "../util/jwt.util";
import {
    validateUser 
}  from "../services/user.service";
import {
    createSession,
    createAccessToken,
    updateUserSession,
}  from "../services/session.service";


export async function createSessionHandler(req : Request,res : Response){

// validate if  user email and password is correct an exists

const user = await validateUser(req.body);

if(!user){
    return res.status(401).send("Invalid email or password");
}
  
// Obtain  user agent from the req   
const userAgent  = req.get("user-agent");

// create a session with the user id and agent
const session  = await createSession(user._id, userAgent || "");

// create  AccessToken 
const accessToken = await createAccessToken({
  user: user,
  session : session,
});

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"), // 1 year
  });

// response with  accessToken and RefreshToken 
 return res.send({refreshToken,accessToken});

}


export async function invalidateUserSessionHandler(req : Request, res : Response){

  const sessionId  = get(req,"user.session");


  await updateUserSession({_id : sessionId},{valid: false});

  return res.send(`Session with the id ${sessionId} has succesfully been deleted.`);
  
  
}



