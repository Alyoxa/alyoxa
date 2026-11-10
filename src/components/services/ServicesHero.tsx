
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
      ) {
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Entrance
      tl.from("[data-services-badge]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
      })
        .from(
          "[data-services-line]",
          {
            yPercent: 105,
            autoAlpha: 0,
            duration: 0.95,
            stagger: 0.13,
          },
          "-=0.3"
        )
        .from(
          "[data-services-divider]",
          {
            scaleX: 0,
            scaleY: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .from(
          "[data-services-copy]",
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
        gsap.to("[data-services-heading]", {
          y: -45,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to("[data-services-description]", {
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
          data-services-badge
          className="
            relative inline-flex overflow-hidden
            rounded-lg border border-zinc-800
            bg-zinc-900 px-3.5 py-1.5
            text-[10px] font-medium uppercase
            text-white shadow-2xl
            sm:px-7 sm:py-1.5 sm:text-sm
          "
        >
          <span className="select-none tracking-wider">
            WHAT WE DO
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
            data-services-heading
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
              <span
                data-services-line
                className="block"
              >
                CREATIVE
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                data-services-line
                className="block"
              >
                TECHNOLOGY
              </span>
            </span>

            <span className="block overflow-hidden">
              <span
                data-services-line
                className="block italic text-zinc-600"
              >
                SERVICES.
              </span>
            </span>
          </h1>

          {/* Description */}
          <div
            data-services-description
            className="
              relative pt-7
              lg:py-2 lg:pl-14
            "
          >
            {/* Animated Divider */}
            <div
              data-services-divider
              className="
                pointer-events-none absolute
                left-0 top-0 h-px w-full
                bg-zinc-400
                origin-left
                lg:h-full lg:w-px
                lg:origin-top
              "
            />

            <p
              data-services-copy
              className="
                max-w-[560px] font-medium
                text-[clamp(1.15rem,4.5vw,1.5rem)]
                leading-[1.4]
                tracking-[-0.025em]
                text-zinc-800
                sm:text-2xl
              "
            >
              From expressive websites to powerful
              digital platforms, we combine creative
              thinking with engineering to build
              experiences that stand apart.
            </p>

            <p
              data-services-copy
              className="
                mt-5 max-w-[540px]
                text-base leading-[1.6]
                text-zinc-500
                sm:mt-6 sm:text-xl
              "
            >
              Creative web development, e-commerce,
              software, SaaS, and AI-powered
              solutions — thoughtfully designed,
              expertly built.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
