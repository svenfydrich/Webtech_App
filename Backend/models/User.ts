import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
