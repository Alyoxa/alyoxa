import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initializeTestimonialsTransition(container: HTMLElement): () => void {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    const stage = container.querySelector<HTMLElement>('[data-tt="stage"]');
    const line1 = container.querySelector<HTMLElement>('[data-tt="line-1"]');
    const line2 = container.querySelector<HTMLElement>('[data-tt="line-2"]');
    const line3 = container.querySelector<HTMLElement>('[data-tt="line-3"]');
    const line4 = container.querySelector<HTMLElement>('[data-tt="line-4"]');

    if (!stage || !line1 || !line2 || !line3 || !line4) return;

    const allLines = [line1, line2, line3, line4];

    if (isReducedMotion) {
      gsap.set(allLines, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(stage, { perspective: 1200, transformStyle: "preserve-3d" });

    // Initial entrance state
    gsap.set(line1, {
      opacity: 0,
      x: isMobile ? -30 : -80,
      y: isMobile ? -40 : -100,
      z: -150,
      rotateX: 25,
      rotateY: -10,
      filter: "blur(12px)",
      transformOrigin: "left center",
    });

    gsap.set(line2, {
      opacity: 0,
      scale: isMobile ? 1.2 : 1.6,
      z: 200,
      letterSpacing: "0.15em",
      backgroundPosition: "0% 50%",
      filter: "blur(16px)",
      transformOrigin: "left center",
    });

    gsap.set(line3, {
      opacity: 0,
      x: isMobile ? 30 : 80,
      y: isMobile ? 40 : 100,
      z: -100,
      rotateX: -20,
      rotateY: 10,
      filter: "blur(12px)",
      transformOrigin: "left center",
    });

    gsap.set(line4, {
      opacity: 0,
      y: isMobile ? 60 : 120,
      z: -200,
      filter: "blur(16px)",
      transformOrigin: "left center",
    });

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: isMobile ? 0.8 : 1.2,
        anticipatePin: 1,
        // Ensures smooth re-triggering when scrolling up and down rapidly
        fastScrollEnd: true,
        preventOverlaps: true,
      },
    });

    // STEP 01 — HIGH-IMPACT ENTRANCE
    masterTl
      .addLabel("intro")
      .to(line1, {
        opacity: 1,
        x: 0,
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "power4.out",
      })
      .to(
        line2,
        {
          opacity: 1,
          scale: 1,
          z: 0,
          letterSpacing: "-0.02em",
          filter: "blur(0px)",
          duration: 1.8,
          ease: "expo.out",
        },
        "-=1.2"
      )
      .to(
        line3,
        {
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power4.out",
        },
        "-=1.4"
      )
      .to(
        line4,
        {
          opacity: 1,
          y: 0,
          z: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power4.out",
        },
        "-=1.4"
      );

    // STEP 02 — "OUR" FOCAL MOMENT & MASKED DRIFT
    const scaleOur = isMobile ? 1.05 : 1.12;
    masterTl
      .addLabel("our-focus")
      .to(line2, {
        scale: scaleOur,
        y: isMobile ? -2 : -5,
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(
        line2,
        {
          backgroundPosition: "100% 50%",
          duration: 2,
          ease: "none",
        },
        "<"
      )
      .to(
        line1,
        {
          scale: 0.96,
          y: isMobile ? -3 : -8,
          opacity: 0.85,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        [line3, line4],
        {
          y: isMobile ? 4 : 8,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      );

    // STEP 03 — SHIFT WEIGHT TO "WORK"
    const scaleWork = isMobile ? 1.05 : 1.12;
    masterTl
      .addLabel("work-focus")
      .to(line2, {
        scale: 1.02,
        y: 0,
        opacity: 0.85,
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(
        line3,
        {
          scale: scaleWork,
          y: isMobile ? -3 : -6,
          opacity: 1,
          letterSpacing: "-0.01em",
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        line1,
        {
          y: isMobile ? -4 : -12,
          opacity: 0.7,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        line4,
        {
          y: isMobile ? 2 : 5,
          opacity: 0.7,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "<"
      );

    // STEP 04 — TYPOGRAPHIC COLLAPSE
    masterTl
      .addLabel("collapse")
      .to(line1, { y: isMobile ? 12 : 28, scale: 0.98, opacity: 0.9, duration: 1.2, ease: "power3.inOut" })
      .to(line2, { y: isMobile ? 4 : 10, scale: 1, opacity: 0.9, duration: 1.2, ease: "power3.inOut" }, "<")
      .to(line3, { y: isMobile ? -4 : -10, scale: 1, opacity: 0.9, duration: 1.2, ease: "power3.inOut" }, "<")
      .to(line4, { y: isMobile ? -12 : -28, scale: 0.98, opacity: 0.9, duration: 1.2, ease: "power3.inOut" }, "<");

    // STEP 05 — REASSEMBLY & LOCK
    masterTl
      .addLabel("resolve")
      .to(allLines, {
        y: 0,
        scale: 1,
        opacity: 1,
        letterSpacing: "0em",
        duration: 1.4,
        ease: "expo.out",
      });

    // Hold moment
    masterTl.to({}, { duration: 0.6 });

    // STEP 06 — CINEMATIC CONTINUATION EXIT (SCROLL OUT DISSOLVE)
    // As you continue scrolling into Testimonials, this dissolves upward into depth & blur
    masterTl
      .addLabel("exit")
      .to(allLines, {
        y: isMobile ? -60 : -120,
        z: -250,
        opacity: 0,
        filter: "blur(20px)",
        stagger: 0.08,
        duration: 1.5,
        ease: "power3.in",
      })
      .to(
        stage,
        {
          scale: 0.94,
          opacity: 0,
          duration: 1.5,
          ease: "power3.in",
        },
        "<"
      );

  }, container);

  return () => ctx.revert();
}