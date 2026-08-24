"use client";

import { useEffect, useRef } from "react";
import Steps from "./Steps";
import { initApproachHeaderAnimation } from "@/components/animations/approach/approach";


export default function Approach() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initApproachHeaderAnimation(containerRef.current);
    return () => cleanup();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Pinned Wrapper */}
      <div
        data-animate="header-wrapper"
        className="min-h-screen flex flex-col items-center justify-center max-w-8xl gap-2 px-4 text-center mx-auto"
      >
        <span
          data-animate="badge"
          className="bg-zinc-900 border border-zinc-700/60 rounded-lg text-white text-3xl sm:text-4xl px-10 py-1 shadow-2xl backdrop-blur-md"
        >
          OUR APPROACH
        </span>

        <h2 data-animate="heading" className="text-[5vw] font-bold uppercase leading-tight text-zinc-900">
          From{" "}
          <span
            data-animate="highlight"
            className="group relative inline-block text-[6vw] font-black text-white bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 px-4 py-0.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-zinc-600/50 overflow-hidden"
          >
            {/* 3D Glass / Metallic Light Sweep Overlay */}
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="relative z-10">strategy</span>
          </span>{" "}
          to execution,
        </h2>

        <h2 data-animate="heading" className="text-[5vw] font-bold uppercase leading-tight text-zinc-900">
          every{" "}
          <span
            data-animate="highlight"
            className="group relative inline-block text-[6vw] font-black text-white bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 px-4 py-0.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-zinc-600/50 overflow-hidden"
          >
            {/* 3D Glass / Metallic Light Sweep Overlay */}
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <span className="relative z-10">decision</span>
          </span>{" "}
          has purpose.
        </h2>

        <p data-animate="text" className="max-w-3xl text-2xl sm:text-4xl pt-8 text-center text-zinc-700 font-medium">
          Every project is approached with clarity, intention, and attention to detail.
          Our process is designed to transform ideas into digital experiences that are
          thoughtful, memorable, and built to perform.
        </p>
      </div>
    </section>
  );
}