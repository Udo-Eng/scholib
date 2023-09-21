// Here describes all the database interactions and requests using the user Model
import User, { UserDocument } from "../models/user.model";
import { FilterQuery } from "mongoose";

export async function createUser(userData: UserDocument) {
  try {
    return await User.create(userData);
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function getUsers() {
  try {
    return await User.find({}, "name email").lean();
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function findUser(query: FilterQuery<UserDocument>,options: any) {
  try {
    return await User.find(query,options);
  } catch (err: any) {
    throw new Error(err);
  }

}

interface ValidateUserInput {
  email: UserDocument["email"];
  password: string;
}

export async function validateUser({ email, password } : ValidateUserInput ) {

    //  check if email exists 

    let user = await  User.findOne({email});


    if(!user) return false;

    // check if password is correct 

    let passwordIsValid  =   await  user.comparePassword(password);

    if(!passwordIsValid) return false;


    // if above parameters are true respond with the plain user 
    return user;

  
}
