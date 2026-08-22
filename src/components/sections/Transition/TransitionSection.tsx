// components/animations/transition/TransitionSection.tsx
"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { initTransitionAnimation } from "@/components/animations/TransitionSection/Transition";

export default function TransitionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const cleanup = initTransitionAnimation(containerRef.current);
      return () => {
        if (cleanup) cleanup();
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative">
      {/* SVG Grain Overlay for Subtle Depth */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.035] mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div
        data-transition="sticky"
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-6 sm:px-12 md:px-20"
      >
        {/* Section 01 */}
        <div
          data-transition="block"
          className="absolute flex max-w-full flex-col items-start justify-center gap-3 sm:gap-5 md:gap-8"
        >
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            NOT EVERY
          </h2>
          <h2
            data-transition="line"
            data-masked="true"
            className="masked-text w-full py-1 text-start text-[clamp(3.2rem,8.5vw,9.5rem)] font-black italic tracking-tight text-zinc-600 leading-[1.02]"
          >
            WEBSITE
          </h2>
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            DESERVES TO
          </h2>
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            EXIST.
          </h2>
        </div>

        {/* Section 02 */}
        <div
          data-transition="block"
          className="absolute flex max-w-full flex-col items-start justify-center gap-3 opacity-0 pointer-events-none sm:gap-5 md:gap-8"
        >
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            THE BEST
          </h2>
          <h2
            data-transition="line"
            data-masked="true"
            className="masked-text w-full py-1 text-start text-[clamp(3.2rem,8.5vw,9.5rem)] font-black italic tracking-tight text-zinc-600 leading-[1.02]"
          >
            BRANDS
          </h2>
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            INVEST IN
          </h2>
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            EXPERIENCE.
          </h2>
        </div>

        {/* Section 03 */}
        <div
          data-transition="block"
          className="absolute flex max-w-full flex-col items-start justify-center gap-3 opacity-0 pointer-events-none sm:gap-5 md:gap-8"
        >
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            WE BUILD
          </h2>
          <h2
            data-transition="line"
            data-masked="true"
            className="masked-text w-full py-1 text-start text-[clamp(3.2rem,8.5vw,9.5rem)] font-black italic tracking-tight text-zinc-600 leading-[1.02]"
          >
            DIGITAL
          </h2>
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            EXPERIENCES
          </h2>
          <h2
            data-transition="line"
            className="text-start text-[clamp(2.8rem,7.5vw,8.5rem)] font-bold tracking-tight text-zinc-800 leading-[1.02]"
          >
            TOGETHER.
          </h2>
        </div>
      </div>
    </section>
  );
}