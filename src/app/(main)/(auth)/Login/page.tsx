"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/stateful-button";
import Link from "next/link";
import { loginSchema } from "@/app/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { log } from "console";

const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const OnSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post("/api/login", data);
      console.log("respone",response)
      if (response.data.success) {
        toast.success("Login Successful");
        router.replace("/shop");
        
      } else {
        toast.error(response.data.message || "Login failed ❌");
      }

      console.log("response from the backend", response);
     
      console.log("form data", data);
    } catch (error: any) {
  if (axios.isAxiosError(error)) {
    console.log("Axios error:", error.response?.data);

    toast.error(error.response?.data?.message || "Login failed ❌");
  } else {
    console.log("Unexpected error:", error);
    toast.error("Something went wrong ❌");
  }
}
  };
  return (
    <div className="flex justify-center items-center min-h-screen text-black bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl md-6">
            Welcome
          </h1>
          <p className=" mt-4 mb-4">Login in to your Account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>

            <p className="text-center">
              Don't have an Account ?
              <Link
                className="text-blue-500 hover:text-blue-800"
                href={"/Sign-in"}
              >
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
