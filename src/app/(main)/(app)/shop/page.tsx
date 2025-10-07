"use client";
import React, { JSX, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie"
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Card {
  title: string;
  description: string;
  img: string;
  content?: () => JSX.Element;
}

const Page = () => {
  const [datas, setdatas] = useState<Card[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/shop");
        console.log(response.data.data);
        setdatas(response.data.data);
      } catch (error) {
        console.log("error in the calling the api ");
      }
    };
    fetchData();
  }, []);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsLoggedIn(false); 
      return;
    }
  }, []);

  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null), ["#checkout-btn"]);

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Please login to view the shop
        </h1>
        <button
          onClick={() => router.push("/Login")}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg"
        >
          Go to Login
        </button>
      </div>
    );
  }
  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full ml-8 mr-8 max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.img}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-3">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    onClick={() => setOpen(true)}
                    className="px-4 py-3 text-sm/6 rounded-full font-bold bg-green-500 text-white"
                  >
                    Book Appoiment Now
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-full mt-20 mx-auto w-full grid grid-cols-1 md:grid-cols-4 items-start gap-4">
        {datas.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.img}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {active && typeof active === "object"
                ? active.title
                : "No Card Selected"}
            </SheetTitle>
            <SheetDescription>
              {active && typeof active === "object"
                ? active.description
                : "Select a card to see details"}
            </SheetDescription>
          </SheetHeader>

          {active && typeof active === "object" && (
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label>Image</Label>
                <img
                  src={active.img}
                  alt={active.title}
                  className="h-64 w-full object-cover rounded-lg"
                />
              </div>

              <div className="gap-3 flex justify-center ">
                <Label className="text-2xl text-green-600">Price </Label>
                <h3 className="text-2xl">{active.price}</h3>
              </div>
            </div>
          )}

          <SheetFooter>
            {/* Checkout will not close the sheet anymore */}
            <motion.button
              className="bg-green-400 p-4 rounded-full"
              id="checkout-btn"
              type="button"
              onClick={() => {
                if (active && typeof active === "object") {
                  const url = `/cart?data=${encodeURIComponent(JSON.stringify(active))}`;
                  console.log("Navigating to cart with:", active);
                  router.replace(url); // navigate programmatically
                }
              }}
            >
              ADD TO CART
            </motion.button>

            {/* Only this button will close the sheet */}
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default Page;

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// https://ui.shadcn.com/docs/components/sheet
