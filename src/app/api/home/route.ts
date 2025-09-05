import dbConnect from "@/app/lib/dbConnect";
import Grooming from "@/app/model/home";
import mongoose from "mongoose";
import { success } from "zod";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const homeItems = await Grooming.findOne().lean();

    if (!homeItems) {
      return Response.json(
        {
          success: true,
          message: "there is no items in the database",
        },
        {
          status: 200,
        }
      );
    }

    return Response.json({
               success:true,
               message:'data found',
               data:homeItems
    },
{
               status:200
})
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "the error int he catch block",
      },
      {
        status: 400,
      }
    );
  }
}
