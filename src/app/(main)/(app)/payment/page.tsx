"use client"; // <-- important!

import React, { Suspense } from "react";
import Script from "next/script";
import PaymentForm from "./PaymentForm";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Suspense fallback={<div>Loading payment form...</div>}>
        <PaymentForm />
      </Suspense>
    </div>
  );
};

export default Page;
