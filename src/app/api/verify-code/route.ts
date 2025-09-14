import dbConnect from "@/app/lib/dbConnect";
import userModel from "@/app/model/userModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, code } = await request.json();
    const decodedEmail = decodeURIComponent(email);

    const user = await userModel.findOne({ email: decodedEmail });

    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    const isCodeValid = String(user.verifyCode) === String(code);
    const isCodeNotExpired =
      user.verifyCodeExpiry && new Date(user.verifyCodeExpiry) > new Date();

    console.log(
      "DB code:",
      user.verifyCode,
      "Entered code:",
      code,
      "Expired:",
      !isCodeNotExpired
    );

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return NextResponse.json(
        { success: true, message: "User verified successfully" },
        { status: 200 }
      );
    }

    if (!isCodeValid)
      return NextResponse.json(
        { success: false, message: "Code is not valid" },
        { status: 400 }
      );

    return NextResponse.json(
      { success: false, message: "OTP expired, signup again" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { success: false, message: "Server error while verifying user" },
      { status: 500 }
    );
  }
}
