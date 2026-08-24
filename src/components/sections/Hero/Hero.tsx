"use client";

interface HeroBannerProps {
  isPreloading: boolean;
}

import { AlyoxaTrademarkButton } from "@/components/ui/Button";
import { initializeHero } from "@/components/animations/hero/hero";
import { initializeHeroScroll } from "@/components/animations/hero/heroScroll";
import { useGSAP } from "@gsap/react";

export default function HeroBanner({ isPreloading }: HeroBannerProps) {
  useGSAP(
    () => {
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
    },
    {
      dependencies: [isPreloading],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      data-hero="section"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#fcf7f1] px-4 sm:px-6"
    >
      {/* 3D Spline Canvas Layer */}
      <div
        data-hero="visual"
        className="absolute inset-0 w-full h-full pointer-events-auto opacity-40 sm:opacity-100 transition-opacity duration-500"
      >
        <iframe
          src="https://my.spline.design/untitled-qLFBL7CC6qHsK8C4FhFOd8rx/"
          width="100%"
          height="100%"
          title="Spline 3D Scene"
          className="w-full h-full border-0 pointer-events-auto bg-transparent scale-125 sm:scale-100 origin-center"
          loading="lazy"
        />
        <div className="absolute bottom-0 -right-2 w-50 h-15 bg-[#fcf7f1] z-20 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="w-full flex flex-col justify-center items-center z-10 pointer-events-none [perspective:1000px] pt-12 sm:pt-0">
        <div className="flex w-full max-w-[1400px] flex-col items-center justify-center px-2 sm:px-6 lg:px-10">
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
              px-3.5
              py-1
              text-[10px]
              font-medium
              uppercase
              text-white
              shadow-2xl
              sm:px-7
              sm:py-1.5
              sm:text-sm
            "
          >
            {/* Light Flare Sweep */}
            <div
              data-hero="badge-flare"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
            />

            {/* Inner Text */}
            <span data-hero="badge-text" className="relative z-10 block select-none tracking-wider">
              PREMIUM DIGITAL STUDIO
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-4 sm:mt-6 max-w-[1400px] text-center font-bold leading-[1.05] sm:leading-[0.9] tracking-[-0.035em] sm:tracking-[-0.045em] text-zinc-800 text-[2.25rem] xs:text-[2.75rem] sm:text-[clamp(3rem,8vw,7.5rem)] select-none">
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
            mt-6
            sm:mt-8
            flex
            w-full
            flex-col
            items-center
            justify-center
            gap-2.5
            pointer-events-auto
            scale-90
            xs:scale-95
            sm:scale-100
            sm:flex-row
            sm:gap-5
            lg:gap-8
          "
        >
          <AlyoxaTrademarkButton text="START A PROJECT" variant="light" />
          <AlyoxaTrademarkButton text="VIEW OUR WORK" variant="dark" />
        </div>
      </div>
    </section>
  );
}