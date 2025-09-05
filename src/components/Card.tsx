"use client"
import React, { useEffect } from "react";
import { HoverEffect } from "./ui/card-hover-effect";

interface projectsTS {
  title:string,
  description:string,
  link:string
}


const Card = ({ projects =[] }: { projects?: projectsTS[] }) => {
   const abc = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Google",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Meta",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Amazon",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Microsoft",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ];
  
  let data
  useEffect(() => {
          console.log("projects",projects);
  }, [projects])
  
  return (
    <div>
      <div className="max-w-5xl mx-auto px-8 ">
               <h2 className="p-5 text-5xl text-center align-middle">Services We Provide</h2>
        <HoverEffect items={projects || []} />
      </div>
    </div>
  );
};

export default Card;
