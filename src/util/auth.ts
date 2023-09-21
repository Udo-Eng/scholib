// Implement the authenticationutil functions 
import {genSalt,hash,compare}  from  "bcrypt";

export async function hashPassword(password : string){

    let saltRounds : number = parseInt(process.env.saltWorkFactor as string) || 10;

    let salt : string = await  genSalt(saltRounds);

    return  hash(password,salt);
}


export  async function comparePassword(plainText : string , hash : string){
    return compare(plainText,hash);
}



