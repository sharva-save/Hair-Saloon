
// src/app/(main)/(app)/payment/PaymentForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/stateful-button";
import { useSearchParams } from "next/navigation";

const PaymentForm = () => {
  const [cardData, setCardData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const dataString = searchParams.get("data");
    if (dataString) setCardData(JSON.parse(dataString));
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
        name: "Hello Company Name",
        description: "test",
        order_id: data.orderId,
        handler: (response: any) => console.log("Payment successful:", response),
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "789654123",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl text-center">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Payment Page</h1>

      {cardData && (
        <>
          <h2 className="text-xl font-extrabold mb-6 text-gray-900">Payment for {cardData.title}</h2>
          <p className="font-normal mb-6 text-gray-900">Amount to be paid {cardData.price}₹</p>
        </>
      )}

      <Button onClick={handlePayment} disabled={isProcessing} color="primary">
        {Amount}₹ {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
};

export default PaymentForm;
