"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useRouter, useSearchParams } from "next/navigation";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Define type for cart data
interface CartData {
  title: string;
  description: string;
  price: number;
  img?: string;
}

interface CartPageProps {
  cartData: CartData | null;
}

const CartPageClient: React.FC<CartPageProps> = ({ cartData }) => {
  const steps = ["Login", "Order Summary"];
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  if (!cartData)
    return (
      <div className="mt-28 text-center text-xl">
        You don't have any item in the cart
      </div>
    );

  return (
    <div className="mt-28 px-4">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <p className="text-white">{label}</p>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div className="flex flex-col md:flex-row gap-8 justify-center p-4">
        {/* Card Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{cartData.title}</h2>
          <p>{cartData.description}</p>
          {cartData.img && (
            <img
              src={cartData.img}
              alt={cartData.title}
              className="h-64 w-full object-cover rounded-lg my-4"
            />
          )}
          <h3 className="text-xl text-green-600">Price: {cartData.price}</h3>

          <Button
            onClick={() => {
              // Redirect to payment with cart data as query
              const query = new URLSearchParams({
                data: JSON.stringify(cartData),
              });
              router.replace(`/payment?${query.toString()}`);
            }}
            className="mt-5 text-xl rounded-xl bg-green-600"
          >
            Place order
          </Button>
        </div>

        {/* Date & Time Picker */}
        <div className="flex-1">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1">
                Date
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(d) => {
                      setDate(d);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="time-picker" className="px-1">
                Time
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Page wrapper: extract cart data from search params **only on server**
const CartPage = () => {
  const searchParams = useSearchParams();
  const dataString = searchParams.get("data");

  let cartData: CartData | null = null;
  if (dataString) {
    try {
      cartData = JSON.parse(dataString);
    } catch (err) {
      console.error("Invalid cart data:", err);
    }
  }

  return <CartPageClient cartData={cartData} />;
};

export default CartPage;
