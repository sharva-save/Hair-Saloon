"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/stateful-button";
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
import { SignInSchems } from "@/app/schemas/SignIn.schems";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchems>>({
    resolver: zodResolver(SignInSchems),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignInSchems>) => {

    try {
      const response: any = await axios.post("/api/SignIn", data);
      console.log("asaaa",response);
      
      toast(response.data.message);
      router.replace('/Login')
    } catch (error) {
      console.error("Error in signup of user", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen text-black bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl md-6">
            Welcome Create Your Account
          </h1>
          <p className=" mt-4 mb-4">Sign in to your Account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Already have an Account  ?
              <Link className="text-blue-500 hover:text-blue-800" href={"/Login"}>
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
