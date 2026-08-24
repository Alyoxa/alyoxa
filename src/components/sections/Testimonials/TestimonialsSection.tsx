"use client";

import { useEffect, useRef } from "react";
import { testimonialsData } from "@/data/TestimonialsData";
import TestimonialsTransition from "./TestimonialsTransition";
import TestimonialCard from "./TestimonialCard";
import { initTestimonialsAnimation } from "@/components/animations/testimonials/testimonialsection";


export default function TestimonialsSection() {
  const stackWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stackWrapperRef.current) return;
    const cleanup = initTestimonialsAnimation(stackWrapperRef.current);
    return () => cleanup();
  }, []);

  return (
    <section className="relative w-full ">
      {/* 1. Intro Transition Section */}
      <TestimonialsTransition />

      {/* 2. Pinned Cards Stack Section */}
      <div ref={stackWrapperRef} className="w-full min-h-screen flex items-start pt-16 pb-24">
        <div className="mx-auto flex flex-col md:flex-row w-full max-w-[1600px] px-6 sm:px-12 lg:px-16 items-start justify-between gap-12">
          
          {/* LEFT — Editorial Sticky Information Column (POSITIONED AT TOP) */}
          <div className="w-full md:w-[35%] z-20 self-start pt-4">
            <div className="flex flex-col justify-start items-start">
              
              {/* Badge & Counter Row */}
              <div data-tt-reveal className="flex items-center gap-3 mb-8">
                <span className="rounded-lg bg-[#111111] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                  CLIENT STORIES
                </span>
                <span
                  data-tt="counter"
                  className="text-sm font-semibold text-black/60"
                >
                  1
                </span>
              </div>

              {/* Title Header */}
              <h2 data-tt-reveal className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.92] tracking-tight text-black">
                WHAT THEY
                <br />
                SAY.
              </h2>

              {/* Description Paragraph */}
              <p data-tt-reveal className="mt-8 max-w-sm text-base leading-relaxed text-black/60 sm:text-md ">
                Real words from the people and businesses we've had the opportunity to build with.
              </p>

            </div>
          </div>

          {/* RIGHT — Architectural Pinned Card Stack Stage */}
          <div className="w-full md:w-[62%] relative self-start">
            <div
              data-tt="stage"
              className="relative w-full flex items-start justify-center"
            >
              {testimonialsData.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}