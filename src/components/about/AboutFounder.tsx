
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const story = `Great ideas don't need a famous postcode. Mine started in Karachi, with a screen, an endless curiosity, and a belief that the web could be so much more. I'm Maddy — a developer who sees websites as experiences, not just pages. I wanted to build things that make people pause, explore, and feel something. That obsession became ALYOXA — an independent creative technology brand built without borders, creating distinctive digital experiences for ambitious people around the world.`;

export default function AboutFounder() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(
        "[data-founder-word]"
      );

      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        gsap.set(words, { color: "#27272a" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 30%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      words.forEach((word, i) => {
        const position = i * 0.12;

        tl.to(
          word,
          {
            color: "#18181b",
            duration: 1,
            ease: "none",
          },
          position
        ).to(
          word,
          {
            color: "#a1a1aa",
            duration: 1,
            ease: "none",
          },
          position + 0.9
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="
        flex min-h-[140svh] w-full
        items-center justify-center
        bg-[#fcf7f1]
        px-5 py-32
        sm:px-8 lg:px-12
      "
    >
      <p
        className="
          mx-auto max-w-[1100px]
          text-center font-medium
          text-[clamp(1.5rem,3.3vw,3.4rem)]
          leading-[1.4]
          tracking-[-0.035em]
          text-zinc-400
        "
      >
        {story.split(/\s+/).map((word, i) => (
          <span key={i}>
            <span
              data-founder-word
              className="text-zinc-400"
            >
              {word}
            </span>
            {" "}
          </span>
        ))}
      </p>
    </section>
  );
}
