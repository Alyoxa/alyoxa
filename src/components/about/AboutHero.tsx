
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) return;

      // Cinematic entrance
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from("[data-about-badge]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
      })
        .from(
          "[data-about-line]",
          {
            yPercent: 105,
            autoAlpha: 0,
            duration: 0.95,
            stagger: 0.13,
          },
          "-=0.3"
        )
        .from(
          "[data-about-divider]",
          {
            scaleX: 0,
            scaleY: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          "[data-about-copy]",
          {
            autoAlpha: 0,
            y: 22,
            duration: 0.8,
            stagger: 0.16,
          },
          "-=0.45"
        );

      // Desktop-only parallax
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to("[data-about-heading]", {
          y: -45,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to("[data-about-description]", {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative flex min-h-[100svh] w-full
        items-center overflow-hidden
        bg-[#fcf7f1]
        px-5 pt-24 pb-14
        sm:px-6 sm:pt-28 sm:pb-20
        lg:px-6 lg:py-24
      "
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* ALYOXA Trademark Capsule */}
        <div
          data-about-badge
          className="
            relative inline-flex overflow-hidden
            rounded-lg border border-zinc-800
            bg-zinc-900
            px-3.5 py-1.5
            text-[10px] font-medium uppercase
            text-white shadow-2xl
            sm:px-7 sm:py-1.5 sm:text-sm
          "
        >
          <span className="select-none tracking-wider">
            ABOUT ALYOXA
          </span>
        </div>

        {/* Hero Content */}
        <div
          className="
            mt-7 grid items-center
            gap-10
            sm:mt-12 sm:gap-12
            lg:mt-14
            lg:grid-cols-[1.15fr_1fr]
            lg:gap-16
          "
        >
          {/* Heading */}
          <h1
            data-about-heading
            className="
              w-full font-bold text-zinc-800
              text-[clamp(3rem,11.8vw,4.5rem)]
              leading-[0.96]
              tracking-[-0.055em]
              sm:text-[clamp(3rem,8vw,7.5rem)]
              sm:leading-[0.9]
              sm:tracking-[-0.045em]
            "
          >
            <span className="block overflow-hidden">
              <span data-about-line className="block">
                THE STORY
              </span>
            </span>

            <span className="block overflow-hidden">
              <span data-about-line className="block">
                BEHIND
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                data-about-line
                className="block italic text-zinc-600"
              >
                ALYOXA.
              </span>
            </span>
          </h1>

          {/* Description */}
          <div
            data-about-description
            className="
              relative
              border-t border-zinc-300
              pt-7
              lg:border-t-0
              lg:border-l
              lg:border-zinc-400
              lg:py-2 lg:pl-14
            "
          >
            {/* Animated divider */}
            <div
              data-about-divider
              className="
                pointer-events-none absolute
                left-0 top-0 h-px w-full
                bg-zinc-400
                lg:h-full lg:w-px
              "
            />

            <p
              data-about-copy
              className="
                max-w-[560px] font-medium
                text-[clamp(1.15rem,4.5vw,1.5rem)]
                leading-[1.4]
                tracking-[-0.025em]
                text-zinc-800
                sm:text-2xl
              "
            >
              An independent creative technology
              brand building digital experiences
              for people and businesses around
              the world.
            </p>

            <p
              data-about-copy
              className="
                mt-5 max-w-[540px]
                text-base leading-[1.6]
                text-zinc-500
                sm:mt-6 sm:text-xl
              "
            >
              A closer look at ALYOXA — its vision,
              values, and the purpose behind
              what we create.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
