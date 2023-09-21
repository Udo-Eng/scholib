// Create the user Login session model
import { model, Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

let SessionSchema = new Schema<SessionDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Session = model<SessionDocument>("Session", SessionSchema);

export default Session;
