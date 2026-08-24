import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initApproachHeaderAnimation(
  container: HTMLElement
): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const hoverCleanups: Array<() => void> = [];

  const ctx = gsap.context(() => {
    const headerWrapper = container.querySelector<HTMLElement>(
      '[data-animate="header-wrapper"]'
    );

    if (!headerWrapper) return;

    // ------------------------------------------------------------
    // INITIAL STATES & 3D PERSPECTIVE SETUP
    // ------------------------------------------------------------
    gsap.set(headerWrapper, { transformPerspective: 1200, transformStyle: "preserve-3d" });
    gsap.set('[data-animate="badge"]', {
      y: -30,
      scale: 0.85,
      opacity: 0,
      filter: "blur(6px)",
    });
    gsap.set('[data-animate="heading"]', {
      y: 60,
      rotateX: -15,
      opacity: 0,
      filter: "blur(10px)",
    });
    gsap.set('[data-animate="highlight"]', {
      opacity: 0,
      y: 30,
      scale: 0.88,
      rotateX: -25,
      rotateY: 10,
    });
    gsap.set('[data-animate="text"]', { y: 40, opacity: 0, filter: "blur(8px)" });

    // ------------------------------------------------------------
    // PHASE 01 — CINEMATIC REVEAL (Executes once cleanly)
    // ------------------------------------------------------------
    const enterTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerWrapper,
        start: "top 85%",
        once: true,
      },
    });

    enterTl
      .to('[data-animate="badge"]', {
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power3.out",
      })
      .to(
        '[data-animate="heading"]',
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=0.4"
      )
      .to(
        '[data-animate="highlight"]',
        {
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "back.out(1.5)",
        },
        "-=0.6"
      )
      .to(
        '[data-animate="text"]',
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5"
      )
      // Lock-In Snap Moment
      .to(
        '[data-animate="highlight"]',
        {
          scale: 1.02,
          duration: 0.25,
          stagger: 0.06,
          ease: "power1.out",
        },
        "+=0.05"
      )
      .to('[data-animate="highlight"]', {
        scale: 1,
        duration: 0.35,
        stagger: 0.06,
        ease: "power2.inOut",
        onComplete: () => {
          // Enable dynamic scrub depth after entrance finishes
          initScrubDepth();
        },
      });

    // ------------------------------------------------------------
    // PHASE 02 — CONTINUOUS SCROLL DEPTH & PARALLAX (Bug-Free)
    // ------------------------------------------------------------
    function initScrubDepth() {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerWrapper,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Smooth damping prevents jumpy frames
          invalidateOnRefresh: true,
        },
      });

      scrubTl
        .to('[data-animate="badge"]', { y: -50, opacity: 0.2, ease: "none" }, 0)
        .to('[data-animate="heading"]', { y: -80, rotateX: 10, ease: "none" }, 0)
        .to(
          '[data-animate="highlight"]',
          { y: -30, scale: 0.95, rotateX: 12, stagger: 0.05, ease: "none" },
          0
        )
        .to('[data-animate="text"]', { y: -40, opacity: 0.4, ease: "none" }, 0)
        .to(headerWrapper, { scale: 0.97, ease: "none" }, 0);
    }

    // ------------------------------------------------------------
    // PHASE 03 — INTERACTIVE 3D MAGNETIC HOVER
    // ------------------------------------------------------------
    const highlights = container.querySelectorAll<HTMLElement>(
      '[data-animate="highlight"]'
    );

    highlights.forEach((el) => {
      const onMouseMove = (event: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        gsap.to(el, {
          rotateY: x * 12,
          rotateX: -y * 12,
          z: 15,
          scale: 1.04,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      hoverCleanups.push(() => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    });
  }, container);

  return () => {
    hoverCleanups.forEach((cleanup) => cleanup());
    ctx.revert();
  };
}