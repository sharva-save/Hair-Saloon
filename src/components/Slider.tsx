"use client";
import { motion } from "motion/react";
import React, { useEffect } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Link from "next/link";


interface SliderItem {

  title: string;
  image: string;
}

const Slider = ({slider =[]} :{slider?: SliderItem[]}) => {
  const images = [
    "https://www.swagmee.com/media/wysiwyg/mens-hair-care-at-home-banner.jpg",
    "https://t4.ftcdn.net/jpg/06/33/49/61/360_F_633496108_MIw6cNitWmeQ5yquQ8MT5eUOfkIHn80n.jpg",
    "https://media.istockphoto.com/id/872361244/photo/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612&w=0&k=20&c=_IjZcrY0Gp-2z6AWTQederZCA9BLdl-iqWkH0hGMTgg=",
  ];

useEffect(() => {
  console.log("slider", slider);
}, [slider]);
  
  return (

    <ImagesSlider  className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Redefining Men’s Grooming
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link href={'/Login'}>Join now →</Link>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>)
};

export default Slider;

