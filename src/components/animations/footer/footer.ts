import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initFooterAnimation(container: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    // PHASE 01 — Set Initial Hidden States using string selectors scoped to container
    gsap.set('[data-footer="bg-architecture"]', { opacity: 0, scale: 1.015 });
    gsap.set('[data-footer="navigation"]', { opacity: 0, y: 30 });
    gsap.set('[data-footer="navigation"] a', { opacity: 0, y: 10 });
    gsap.set('[data-footer="social"]', { opacity: 0, y: 30 });
    gsap.set('[data-footer="social"] li', { opacity: 0, y: 10 });
    gsap.set('[data-footer="email"]', { opacity: 0, x: 30 });
    gsap.set('[data-footer="wordmark"]', { opacity: 0, scale: 0.92, y: 60 });
    gsap.set('[data-footer="meta"]', { yPercent: 100 });
    gsap.set('[data-footer="meta"] div > div', { opacity: 0, y: 10 });

    // Build Master Reveal Timeline 
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl
      // PHASE 02 — Architectural Grid Wakes Up
      .to('[data-footer="bg-architecture"]', {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
      })

      // PHASE 03 — Information System Assembly
      // 1. Navigation Block & Links
      .to(
        '[data-footer="navigation"]',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.9"
      )
      .to(
        '[data-footer="navigation"] a',
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // 2. Social Block & Items
      .to(
        '[data-footer="social"]',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        '[data-footer="social"] li',
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // 3. Direct Inquiries / Email Block
      .to(
        '[data-footer="email"]',
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.6"
      )

      // PHASE 04 & 05 — Hero Wordmark Build + Architectural Response
      .to(
        '[data-footer="wordmark"]',
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.6,
          ease: "power4.out",
        },
        "-=0.5"
      )
      .to(
        '[data-footer="bg-architecture"]',
        {
          opacity: 1.2,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=1.2"
      )

      // PHASE 06 — Micro Brand Sync Lock
      .to(
        container,
        {
          scale: 1.002,
          duration: 0.2,
          ease: "power1.out",
          yoyo: true,
          repeat: 1,
        },
        "-=0.3"
      )

      // PHASE 07 — Bottom Meta Bar System Close
      .to('[data-footer="meta"]', {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(
        '[data-footer="meta"] div > div',
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      );

    // Subtle Scroll-Scrubbed Depth Parallax
    gsap.to('[data-footer="wordmark"]', {
      y: -12,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to('[data-footer="bg-architecture"]', {
      y: 6,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, container);

  return () => ctx.revert();
}