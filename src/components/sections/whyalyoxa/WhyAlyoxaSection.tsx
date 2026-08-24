"use client";

import { useEffect, useRef } from "react";
import { whyAlyoxaData } from "@/data/WhyAlyoxaData";
import WhyCard from "./WhyCard";
import { initializeWhyAlyoxaAnimation } from "@/components/animations/whyalyoxa/whyAlyoxa";

export default function WhyAlyoxaSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initializeWhyAlyoxaAnimation(containerRef.current);
    return () => cleanup();
  }, []);

  return (
    <section 
      ref={containerRef} 
      data-why="section"
      className="relative flex flex-col justify-center min-h-screen overflow-hidden py-12 md:py-0"
    >
      {/* LEFT CARDS */}
      <div 
        data-why="left-cards" 
        className="static md:absolute md:left-[8%] md:top-1/2 md:-translate-y-1/2 flex flex-col gap-8 md:gap-16 z-20 my-8 md:my-0 px-4 md:px-0"
      >
        <WhyCard card={whyAlyoxaData[0]} />
        <WhyCard card={whyAlyoxaData[1]} />
      </div>

      {/* CENTER */}
      <div className="flex items-center justify-center z-10 my-4 md:my-0">
        <h2 data-why="title" className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight">
          WHY ALYOXA
        </h2>
      </div>  

      {/* RIGHT CARDS */}
      <div 
        data-why="right-cards" 
        className="static md:absolute md:right-[8%] md:top-1/2 md:-translate-y-1/2 flex flex-col gap-8 md:gap-16 z-20 my-8 md:my-0 px-4 md:px-0"
      >
        <WhyCard card={whyAlyoxaData[2]} />
        <WhyCard card={whyAlyoxaData[3]} />
      </div>
    </section>
  );
}