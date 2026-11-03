import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function initializeHeroScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  const ctx = gsap.context(() => {
    const section = document.querySelector<HTMLElement>(
      '[data-hero="section"]'
    );

    if (!section) return;

    const visual = section.querySelector<HTMLElement>(
      '[data-hero="visual"]'
    );

    const heading = section
      .querySelector('[data-hero="heading-highlight"]')
      ?.closest("h1");

    const badge = section.querySelector<HTMLElement>(
      '[data-hero="badge"]'
    );

    const actions = section.querySelector<HTMLElement>(
      '[data-hero="actions"]'
    );

    if (!visual) return;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 01. Hero visual — transform-only parallax
    if (!reduceMotion) {
      scrollTl.to(
        visual,
        {
          scale: 0.7,
          y: 150,
          ease: "none",
        },
        0
      );
    }

    // 02. Headline
    if (heading) {
      scrollTl.to(
        heading,
        {
          y: -100,
          scale: 0.9,
          opacity: 0,
          filter: "blur(12px)",
          ease: "none",
        },
        0
      );
    }

    // 03. Badge
    if (badge) {
      scrollTl.to(
        badge,
        {
          y: -60,
          opacity: 0,
          ease: "none",
        },
        0
      );
    }

    // 04. CTA buttons
    if (actions) {
      scrollTl.to(
        actions,
        {
          y: -40,
          opacity: 0,
          ease: "none",
        },
        0
      );
    }
  });

  return () => ctx.revert();
}
