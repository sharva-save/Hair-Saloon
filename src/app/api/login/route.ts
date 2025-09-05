import dbConnect from "@/app/lib/dbConnect";
import userModel from "@/app/model/userModel";
import { success } from "zod";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    const user = await userModel.findOne({ email });
    if (!user) {
      return Response.json(
        { success: false, message: " user not found " },
        {
          status: 200,
        }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { success: false, message: "Wrong Password" },
        {
          status: 403,
        }
      );
    }

    return Response.json(
      { success: true, message: "Login SuccessfullyAA" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("failed to get the user");
    return Response.json(
      {
        success: false,
        message: "error in the login api",
      },
      {
        status: 400,
      }
    );
  }
}
