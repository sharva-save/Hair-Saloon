"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Input from "@mui/material/Input";

import { AddProduct } from "@/app/schemas/AddProduct.Schema"; // ✅ your schema

function Page() {
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  // ✅ initialize form
  const form = useForm<z.infer<typeof AddProduct>>({
    resolver: zodResolver(AddProduct),
    defaultValues: {
      Title: "",
      Description: "",
      Price: ""
    },
  });

  const links = [
    {
      label: "Dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActivePage("Dashboard"),
    },
    {
      label: "Product",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => setActivePage("Product"),
    },
    {
      label: "Logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      onClick: () => alert("Logging out..."),
    },
  ];

  return (
    <div
      className={cn(
        "flex w-full min-h-screen flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[60vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick}>
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Conditional rendering */}
      {activePage === "Dashboard" && <Dashboard />}
      {activePage === "Product" && <Product form={form} />}
    </div>
  );
}

export const Logo = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded bg-black dark:bg-white" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white"
    >
      Acet Labs
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a
    href="#"
    className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
  >
    <div className="h-5 w-6 shrink-0 rounded bg-black dark:bg-white" />
  </a>
);

const Dashboard = () => (
  <div className="flex flex-1">
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Dashboard
      </h1>
    </div>
  </div>
);

// ✅ Product page with form
const Product = ({ form }: { form: ReturnType<typeof useForm> }) => (
  <div className="flex flex-1">
    <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-tl-2xl border border-neutral-200 bg-white p-4 md:p-10 dark:border-neutral-700 dark:bg-neutral-600">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => console.log(values))}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="Price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </Form>
    </div>
  </div>
);

export default Page;
