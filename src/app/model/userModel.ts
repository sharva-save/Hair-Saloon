import mongoose, { Schema, Document } from "mongoose";
import { Interface } from "readline";
import jwt from "jsonwebtoken";

import { string } from "zod";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  verifyCode: string;
  verifyCodeExpiry:Date;
  isVerified:boolean,
  isAdmin:boolean,
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}


const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "username is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  refreshToken:{
    type:String
  },
  verifyCode: { type: String },
  verifyCodeExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  isAdmin: {
  type: Boolean,
  default: false,  // ✅ ensures field always exists
  required: true   // optional, but enforces saving
}
});

UserSchema.methods.generateAccessToken = function() {
  //to get the id from database
  return jwt.sign(
    {
      _id:this._id,
      email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
} 

UserSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    {
      _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  ) 
} 



const userModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);



export default userModel