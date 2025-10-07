"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema } from "@/app/schemas/verifySchema";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

const OTPForm = () => {
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    if (!email) {
      toast.error("Email is missing.");
      return;
    }

    try {
      const response = await axios.post("/api/verify-code", {
        email,
        code: data.code,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/Login"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extralight tracking-tight lg:text-5xl mb-4">
            Verify Your Account
          </h1>
          <p className="mb-4">
            Enter verification code sent to your email:{" "}
            <span className="font-bold">{email}</span>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your OTP"
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-green-500 w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OTPForm;
