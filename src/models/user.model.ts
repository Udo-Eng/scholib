import { Document, model, Schema,Model} from "mongoose";
import { hashPassword,comparePassword} from "../util/auth";

export interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}


// creating a new Model for the user methods 
interface UserMethods {
  comparePassword(inputPassword: string): Promise<boolean>;
}

type  UserModel = Model<UserDocument,{},UserMethods> 

const UserSchema = new Schema<UserDocument,UserModel,UserMethods>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
//   set a timestamp value to set the values of createdAt and updateAt automatically  for each registered User
  { timestamps: true }
);


// Creating a Document middleware in Mongoose
UserSchema.pre<UserDocument>(
  "save",
  async function (next: (err?: Error) => void) {
    let user = this as UserDocument;

    if (!user.isModified("password")) return next();

    const  hash = await hashPassword(user.password);

    user.password = hash;

    // call the next function
    return next();
  }
);


UserSchema.methods.comparePassword = async function(this: UserDocument, passwordInput: string){ 
  
   let password = this.password;

   return  comparePassword(passwordInput,password).catch(e => false);

}

const User = model<UserDocument,UserModel>("User", UserSchema);

export default User;

