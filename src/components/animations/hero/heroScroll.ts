import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function initializeHeroScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  const ctx = gsap.context(() => {
    const section = document.querySelector('[data-hero="section"]');
    const visual = document.querySelector('[data-hero="visual"]');
    const heading = document.querySelector('[data-hero="heading-highlight"]')?.closest("h1");
    const badge = document.querySelector('[data-hero="badge"]');
    const actions = document.querySelector('[data-hero="actions"]');

    if (!section || !visual) return;

    // Master Scroll Trigger
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth physics lag on scroll
      },
    });

    // 01. Push 3D Spline Canvas deeper into Z-space
    scrollTl.to(
      visual,
      {
        scale: 0.7,
        y: 150,
        opacity: 0.1,
        ease: "none",
      },
      0
    );

    // 02. Parallax headline lift + blur out
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

    // 03. Collapse Badge & CTA Buttons
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

  // Force ScrollTrigger to calculate layout after initial render
  ScrollTrigger.refresh();

  return () => ctx.revert();
}