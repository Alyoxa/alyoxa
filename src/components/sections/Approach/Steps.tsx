"use client";

import { useEffect, useRef } from "react";
import { approachData } from "@/data/approachData";
import { initStepsAnimation } from "@/components/animations/approach/steps";

export default function Steps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initStepsAnimation(containerRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-hidden lg:overflow-x-visible">
      {approachData.map((approach, index) => (
        <div
          key={index}
          data-step-card
          className="min-h-screen relative px-6 py-12 flex flex-col justify-between lg:grid lg:grid-cols-12 lg:py-4"
        >
          {/* Header Block: Step Number & Title */}
          <div className="flex flex-col items-start justify-start gap-3 py-4 lg:col-span-4 lg:py-8">
            <div>
              <span data-animate-num className="text-2xl font-bold lg:text-4xl">
                {approach.number}
              </span>
            </div>

            <div className="pt-4 lg:pt-12">
              <h2
                data-animate-title
                className="text-5xl font-black text-zinc-800 tracking-tight sm:text-6xl lg:text-7xl"
              >
                {approach.title}
              </h2>
            </div>
          </div>

          {/* Big Number Image Mask */}
          <div className="my-6 flex flex-col items-center justify-center lg:col-span-4 lg:my-0 lg:items-start">
            <h2
              data-animate-bg
              className="text-[18rem] leading-none font-black text-transparent bg-cover bg-center bg-clip-text relative sm:text-[22rem] lg:text-[30rem] lg:-left-43"
              style={{
                backgroundImage: `url(${approach.image.src})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1.5px #d6d6d6",
              }}
            >
              {approach.number}
            </h2>
          </div>

          {/* Content Block: Description & Deliverables */}
          <div className="flex flex-col items-start justify-end pb-5 lg:col-span-4">
            <div className="flex flex-col gap-6">
              <p data-animate-desc className="max-w-3xl text-lg text-neutral-700 leading-relaxed sm:text-xl lg:text-2xl">
                {approach.description}
              </p>

              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
                {approach.Deliverables.map((deliver, dIndex) => (
                  <h3 key={dIndex} data-animate-item className="text-lg font-bold text-zinc-900 sm:text-xl lg:text-2xl">
                    {deliver} /
                  </h3>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}