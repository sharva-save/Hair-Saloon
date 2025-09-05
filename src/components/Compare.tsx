import React from 'react'
import { Compare } from "@/components/ui/compare";


const Comparee = () => {
  return (
    <div>
      <h2 className= "p-5 text-5xl text-center align-middle">Compare Before and After Haircut</h2>
    <div className=" flex gap-1  items-center justify-center p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
      
      <Compare
        firstImage='/1Of2.jpg'
        secondImage="/1Of1.jpg"
        firstImageClassName="object-cover object-center-top"
        secondImageClassname="object-cover object-center-top"
        className="h-[250px] w-[250px] md:h-[500px] md:w-[500px] "
        slideMode="hover"
      />
      <Compare
        firstImage="/before1.jpg"
        secondImage="/after1.jpg"
        firstImageClassName="object-cover object-center-top"
        secondImageClassname="object-cover object-center-top"
        className="h-[250px] w-[250px] md:h-[500px] md:w-[500px]"
        slideMode="hover"
      />
      <Compare
        firstImage="/before22.jpg"
        secondImage="/after11.jpg"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="hidden md:block h-[250px] w-[250px]  md:h-[500px] md:w-[500px]"
        slideMode="hover"
      />
    </div>
    </div>
  )
}

export default Comparee
