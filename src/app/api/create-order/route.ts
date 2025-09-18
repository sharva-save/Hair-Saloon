import { NextRequest, NextResponse } from "next/server";

import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json(
        { error: "Amount is required" },
        { status: 400 }
      );
    }
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.log("erroe  createing teh order", error);
    return NextResponse.json(
      { error: "Error createing  order" },
      { status: 500 }
    );
  }
}
