import dbConnect from "@/app/lib/dbConnect";
import userModel from "@/app/model/userModel";
import { success } from "zod";
import bcrypt from "bcrypt";
import { resend } from "@/app/lib/resend";
import VerificationEmail from "../../../../email/VerificationEmail";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { name, email, password,isAdmin } = await request.json();
    const exsitingByEmail = await userModel.findOne({ email });
    console.log(name, email, password,isAdmin);

    if (exsitingByEmail) {
      return Response.json(
        {
          success: false,
          message: "user with this email id already exist please login",
        },
        {
          status: 200,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = new userModel({
      name,
      email,
      isAdmin: Boolean(isAdmin),
      password: hashedPassword,
      verifyCode: code,
      verifyCodeExpiry: expiry,
      isVerified: false, 
    });

    const savedUser = await newUser.save();
console.log("Saved in DB:", savedUser.toObject());
    console.log("Saved user:", newUser);
    console.log("Generated OTP:", code);

    // Send email
    await resend.emails.send({
      from: "Sharva App <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Account",
      react: VerificationEmail({ username: name, otp: code.toString() }),
    });

    console.log("Resend new user:", newUser);

    return Response.json(
      {
        success: true,
        message: "user created Successfully",
        data:newUser
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to signin the user");
    return Response.json(
      {
        success: false,
        message: "error createing the user",
      },
      {
        status: 400,
      }
    );
  }
}
