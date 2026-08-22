"use client";


interface HeroBannerProps {
  isPreloading: boolean;
}

import Button from "@/components/ui/Button";
import { initializeHero } from "@/components/animations/hero/hero";
import { initializeHeroScroll } from "@/components/animations/hero/heroScroll";
import { useGSAP } from "@gsap/react";



export default function HeroBanner({isPreloading, }:HeroBannerProps) {


// for gsap
useGSAP(() => {
  // Always prepare the Hero
  const cleanupHero = initializeHero({
    play: !isPreloading,
  });

  if (isPreloading) {
    return cleanupHero;
  }

  const cleanupScroll = initializeHeroScroll();

  return () => {
    cleanupHero();
    cleanupScroll();
  };
}, {
  dependencies: [isPreloading],
  revertOnUpdate: true,
});

  return (
    <section data-hero="section" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#fcf7f1]">
      {/* 3D Spline Canvas Layer */}
      <div 
        data-hero="visual" 
        className="absolute inset-0 w-full h-full pointer-events-auto"
      >
        <iframe
          src="https://my.spline.design/untitled-qLFBL7CC6qHsK8C4FhFOd8rx/"
          width="100%"
          height="100%"
          title="Spline 3D Scene"
          className="w-full h-full border-0 pointer-events-auto bg-transparent"
          loading="lazy"
        />
        <div className="absolute bottom-0 -right-2 w-50 h-15 bg-[#fcf7f1] z-20 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="w-full flex flex-col justify-center items-center z-5 pointer-events-none [perspective:1000px]">
        <div className="flex w-full max-w-[1400px] flex-col items-center justify-center px-4 sm:px-6 lg:px-10">
          
 {/* Badge Layer */}
<div
  data-hero="badge"
  className="
    pointer-events-auto
    relative
    overflow-hidden
    rounded-lg
    border
    border-zinc-800
    bg-zinc-900
    px-5
    py-1.5
    text-xs
    font-medium
    uppercase
    text-white
    shadow-2xl
    sm:px-7
    sm:text-sm
  "
>
  {/* Light Flare Sweep */}
  <div
    data-hero="badge-flare"
    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
  />

  {/* Inner Text */}
  <span data-hero="badge-text" className="relative z-10 block select-none">
    PREMIUM DIGITAL STUDIO
  </span>
</div>

          {/* Main Headline */}
<h1 className="mt-6 max-w-[1400px] text-center font-bold leading-[0.9] tracking-[-0.045em] text-zinc-800 text-[clamp(3rem,8vw,7.5rem)] select-none">
  <span data-hero="heading-main">WE DESIGN </span>
  <span data-hero="heading-highlight" className="inline-block text-zinc-600 italic">
    WEBSITES
  </span>
  <span data-hero="heading-main"> THAT PEOPLE REMEMBER.</span>
</h1>
        </div>

        {/* Call to Action Buttons */}
        <div
          data-hero="actions"
          className="
            mt-8
            flex
            w-full
            flex-col
            items-center
            justify-center
            gap-3
            pointer-events-auto
            sm:flex-row
            sm:gap-5
            lg:gap-8
          "
        >
          <Button label="START A PROJECT" variant="light" />
          <Button label="VIEW OUR WORK" variant="dark" />
        </div>
      </div>
    </section>
  );
}