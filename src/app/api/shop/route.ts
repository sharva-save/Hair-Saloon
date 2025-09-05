import dbConnect from "@/app/lib/dbConnect";
import Shop from "@/app/model/shop";
import mongoose from "mongoose";
import { success } from "zod";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const shopItems = await Shop.find();
    if (!shopItems) {
      return Response.json(
        {
          success: false,
          message: "no data found in the data base ",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "data found",
        data: shopItems,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error in the catch block");
    return Response.json(
      {
        success: false,
        message: "no data found in the data base ",
      },
      {
        status: 500,
      }
    );
  }
}
