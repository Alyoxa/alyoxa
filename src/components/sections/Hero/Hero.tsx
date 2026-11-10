
"use client";

import Image from "next/image";
import { AlyoxaTrademarkButton } from "@/components/ui/Button";
import { initializeHero } from "@/components/animations/hero/hero";
import { initializeHeroScroll } from "@/components/animations/hero/heroScroll";
import { useGSAP } from "@gsap/react";

interface HeroBannerProps {
  isPreloading: boolean;
}

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
      className="
        relative
        w-full
        min-h-[100svh]
        md:h-screen
        overflow-hidden
        flex
        items-center
        justify-center
        bg-[#fcf7f1]
        px-4
        md:px-6
        max-md:h-auto
        max-md:px-5
        max-md:pt-28
        max-md:pb-14
      "
    >
      {/* Architectural Sculpture */}
      <div
        data-hero="visual"
        className="
          absolute inset-0
          w-full h-full
          pointer-events-none
          opacity-[0.12]
          md:opacity-40
          transition-opacity duration-500
        "
      >
        <div
          data-hero="sculpture"
          className="
            relative h-full w-full
            scale-[0.82]
            md:scale-80
            origin-center
            will-change-transform
            max-md:scale-[0.96]
            max-md:opacity-30
          "
        >
          <Image
            src="/images/alyoxa-hero-sculpture.png"
            alt=""
            fill
            sizes="(max-width: 767px) 96vw, 80vw"
            priority
            className="object-contain object-center select-none"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div
        className="
          relative z-10
          w-full
          flex flex-col
          justify-center items-center
          pointer-events-none
          [perspective:1000px]
          pt-0
          md:pt-0
        "
      >
        <div
          className="
            flex w-full max-w-[1400px]
            flex-col items-center justify-center
            px-0
            md:px-6
            lg:px-10
            max-md:px-0
          "
        >
          {/* Badge */}
          <div
            data-hero="badge"
            className="
              pointer-events-auto relative overflow-hidden
              rounded-lg border border-zinc-800
              bg-zinc-900
              px-3.5 py-1.5
              text-[10px] font-medium uppercase
              text-white shadow-2xl
              md:px-7 md:py-1.5 md:text-sm
              max-md:px-3.5 max-md:py-1.5 max-md:text-[10px]
            "
          >
            <div
              data-hero="badge-flare"
              className="
                absolute inset-0 -translate-x-full
                bg-gradient-to-r
                from-transparent via-white/25 to-transparent
                pointer-events-none
              "
            />

            <span
              data-hero="badge-text"
              className="relative z-10 block select-none tracking-wider"
            >
              PREMIUM DIGITAL STUDIO
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="
              mt-6
              md:mt-6
              w-full max-w-[1400px]
              text-center font-bold
              text-zinc-800
              text-[clamp(2.15rem,9.4vw,3.5rem)]
              leading-[1.03]
              tracking-[-0.055em]
              md:text-[clamp(3rem,8vw,7.5rem)]
              md:leading-[0.9]
              md:tracking-[-0.045em]
              max-md:mt-5
              max-md:text-[clamp(2.125rem,10.8vw,4.5rem)]
              max-md:leading-[1.02]
              max-md:tracking-[-0.045em]
              select-none
            "
          >
            <span data-hero="heading-main">
              <span className="block md:inline max-md:block">WE DESIGN </span>
            </span>

            <span
              data-hero="heading-highlight"
              className="block md:inline-block max-md:block text-zinc-600 italic"
            >
              WEBSITES
            </span>

            <span data-hero="heading-main">
              <span className="block md:inline max-md:block"> THAT PEOPLE</span>
              <span className="block md:inline max-md:block"> REMEMBER.</span>
            </span>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div
          data-hero="actions"
          className="
            mt-9
            md:mt-8
            flex w-full flex-col
            items-center justify-center
            gap-3
            pointer-events-auto
            scale-100
            md:flex-row
            md:gap-5
            lg:gap-8
            max-md:mt-7
            max-md:flex-col
            max-md:gap-3
            max-md:[&>div]:w-full
            max-md:[&>div]:max-w-64
            max-md:[&_a]:w-full
          "
        >
          <AlyoxaTrademarkButton
            href="/contact"
            text="START A PROJECT"
            variant="light"
          />
          <AlyoxaTrademarkButton
            href="/about"
            text="WHO WE ARE"
            variant="dark"
          />
        </div>
      </div>
    </section>
  );
}
