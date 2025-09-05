"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

const Grid = () => {
  return (
    <div>
       <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
    </div>
  )

}
const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Creating Style that create nice look
      </p>
    </div>
  );
};
 
const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        “Invest in your hair, it’s the crown you never take off.”
      </p>
      
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        “Life is too short to have boring hair.”
      </p>
     
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
       Barber Shop
      </p>
      
    </div>
  );
};
 
const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://larastyles.com/wp-content/uploads/2022/09/Lara-Banner-06-copy.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://i.pinimg.com/236x/e2/e6/0d/e2e60de770f713ace207f2b1a066f1ce.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://bizimages.withfloats.com/tile/5e2985ddfcd5010001b7776e.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://m.media-amazon.com/images/I/81-trzmY0tL.jpg",
  },
];

export default Grid
