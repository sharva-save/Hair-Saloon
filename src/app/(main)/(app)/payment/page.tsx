"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import axios from "axios";
import { Button } from "@/components/ui/stateful-button";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const page = () => {
  const [cardData, setCardData] = useState<any>(null);
  const [isProccessing, setIsProcessing] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const dataString = searchParams.get("data");

    console.log("====================================");
    console.log(dataString);
    console.log("====================================");

    if (dataString) {
      setCardData(JSON.parse(dataString));
    }
  }, [searchParams]);
  
  const Amount = cardData ? parseInt(cardData.price) : 0;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-order", { method: "POST" });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Amount * 100,
        currency: "INR",
        name: "helloooo company name",
        description: "test",
        order_id: data.orderId,
        handler: function (response: any) {
          console.log("payment successfully done ", response);
        },
        prefill: {
          name: "john doe",
          email: "john@example",
          Contact: "789654123",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzo1 = new window.Razorpay(options);
      rzo1.open();
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900">
          Payment Page
        </h1>

        {cardData && (
          <h2 className="text-xl font-extrabold mb-6 text-gray-900">
            {" "}
            payment for {cardData.title}
          </h2>
        )}

        {cardData && (
          <p className=" font-normal mb-6 text-gray-900">
            {" "}
            Amount to be paid {cardData.price}
          </p>
        )}

        <Button
          onClick={handlePayment}
          disabled={isProccessing}
          color="primary"
        >
          {Amount}₹ {isProccessing ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </div>
  );
};

export default page;
