import mongoose, { Schema, Document } from "mongoose";
import { Interface } from "readline";

import { string } from "zod";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
const UserSchema = new Schema({
  name: {
    type: string,
    required: [true, "username is required"],
    trim: true,
  },
  email: {
    type: string,
    required: [true, "email is required"],
  },
  password: {
    type: string,
    required: [true, "password is required"],
  },
});

const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default userModel