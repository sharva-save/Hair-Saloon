"use client"; // MUST be first line
import React, { Suspense } from "react";
import ClientCart from "./ClientCart";

export default function CartPage() {
  return (
    <Suspense fallback={<div className="mt-28 text-center text-xl">Loading...</div>}>
      <ClientCart />
    </Suspense>
  );
}
