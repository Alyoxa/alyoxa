import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function initializeHeroScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  const media = gsap.matchMedia();
  media.add({ mobile: "(max-width: 767px)", desktop: "(min-width: 768px)" }, (context) => {
    const isMobile = Boolean(context.conditions?.mobile);
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
    // Keep mobile's sculpture in frame and avoid competing with its entrance
    // transform. The existing float still runs on the inner sculpture.
    if (!reduceMotion && !isMobile) {
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
          y: isMobile ? -32 : -100,
          scale: isMobile ? 1 : 0.9,
          opacity: 0,
          filter: isMobile ? "blur(0px)" : "blur(12px)",
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
          y: isMobile ? -20 : -60,
          opacity: 0,
          ease: "none",
        },
        0
      );
    }

    // 04. CTA buttons
    // Mobile CTAs stay readable and tappable while the hero leaves the viewport.
    if (actions && !isMobile) {
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

  return () => media.revert();
}
