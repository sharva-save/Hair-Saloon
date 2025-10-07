"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useSearchParams, useRouter } from "next/navigation";

import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CartPage = () => {
  const steps = ["Login", "Order Summary"];
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState<any>(null);

  useEffect(() => {
    const dataString = searchParams.get("data");
    if (dataString) {
      try {
        const parsedData = JSON.parse(dataString);
        setCardData(parsedData);
      } catch (err) {
        console.error("Invalid card data in query params:", err);
      }
    }
  }, [searchParams]);

  if (!cardData) return <div className="mt-28 text-center text-xl">You don't have any item in the cart</div>;

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
          <h2 className="text-2xl font-bold">{cardData.title}</h2>
          <p>{cardData.description}</p>
          {cardData.img && (
            <img
              src={cardData.img}
              alt={cardData.title}
              className="h-64 w-full object-cover rounded-lg my-4"
            />
          )}
          <h3 className="text-xl text-green-600">Price: {cardData.price}</h3>

          <Button
            onClick={() => {
              const query = new URLSearchParams({
                data: JSON.stringify(cardData),
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
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
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

export default CartPage;
