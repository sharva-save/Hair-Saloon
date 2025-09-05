import dbConnect from "@/app/lib/dbConnect";
import userModel from "@/app/model/userModel";
import { success } from "zod";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { name, email, password } = await request.json();
    const exsitingByEmail = await userModel.findOne({ email });
    console.log(name, email, password);

    if (exsitingByEmail) {
      return Response.json(
        {
          success: true,
          message: "user with this email id already exist please login"
        },
        {
          status: 200,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      // hashedPassword,
    });
    await newUser.save();

    return Response.json(
      {
        success: true,
        message: "user created Successfully",
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
