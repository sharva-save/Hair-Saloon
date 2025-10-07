"use client";

import React, { Suspense } from "react";
import OTPForm from "./OTPForm";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading OTP form...</div>}>
      <OTPForm />
    </Suspense>
  );
};

export default Page;
