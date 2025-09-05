"use client";
import Navbar from "@/components/Navbar";
import Grid from "@/components/Grid";
import Timelinee from "@/components/Timelinee";
import Comparee from "@/components/Compare";
import Slider from "@/components/Slider";
import InfiniteMovingCard from "@/components/InfiniteMovingCard";
import FocusCards from "@/components/FocusCards";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import axios from "axios";



export default function Home() {
  const [projects, setProjects] = useState();
  const [slider, setSlider] = useState();
  const [testimonials, setTestimonials] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/home");
        // console.log("Response", response.data.data);

        console.log("Response11", response.data.data);
        setProjects(response.data.data.projects);
        setSlider(response.data.data.slider);
        setTestimonials(response.data.data.testimonials);

        if (!response) {
          console.log("no data found or data is empty");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Slider slider={slider} />
      <Card projects={projects} />
      <Grid />
      <Comparee />
      <FocusCards />
      <InfiniteMovingCard testimonials={testimonials} />
      
    </>
  );
}
