import gsap from "gsap";

/**
 * ALYOXA Preloader
 * Matches the actual markup: [data-preloader="container"] > [data-preloader="wordmark"]
 * containing 6 SVG <path> letters tagged [data-preloader-letter="..."].
 *
 * Sequence:
 * 1. Brief silence on ivory canvas
 * 2. Letters assemble from scattered offsets, staggered from center outward
 * 3. Unified impact settle (whole wordmark micro-bounces as one)
 * 4. Brand hold
 * 5. Wordmark fades + lifts slightly, container wipes away (clip-path) to reveal the page
 */
export function initializePreloader(onComplete?: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const ctx = gsap.context(() => {
    const container = document.querySelector<HTMLElement>('[data-preloader="container"]');
    const wordmark = document.querySelector<HTMLElement>('[data-preloader="wordmark"]');
    const letters = gsap.utils.toArray<SVGPathElement>("[data-preloader-letter]");

    if (!container || !wordmark || letters.length === 0) return;

    document.body.style.overflow = "hidden";
    const restoreScroll = () => {
      document.body.style.overflow = "";
    };

    const mm = gsap.matchMedia();

    // ------------------------------------------------------------------
    // REDUCED MOTION FALLBACK
    // ------------------------------------------------------------------
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap
        .timeline({ onComplete: () => { restoreScroll(); onComplete?.(); } })
        .set(letters, { opacity: 1 })
        .to(container, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    });

    // ------------------------------------------------------------------
    // FULL SEQUENCE
    // ------------------------------------------------------------------
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(container, { clipPath: "inset(0% 0% 0% 0%)" });

      // Scatter vectors generated per-letter from index, not hand-typed per letter.
      // Letters closer to center (Y, O) get smaller offsets; outer letters (A, A) get bigger ones —
      // reads more "assembled" than "random."
      gsap.set(letters, {
        opacity: 0,
        y: (i) => gsap.utils.mapRange(0, letters.length - 1, -50, 50, i) * 0.6,
        x: (i) => (i - (letters.length - 1) / 2) * -14,
        scale: 0.65,
        rotation: (i) => (i % 2 === 0 ? -10 : 10),
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        onComplete: () => {
          restoreScroll();
          onComplete?.();
        },
      });

      // PHASE 01 — silence
      tl.to({}, { duration: 0.3 });

      // PHASE 02 — assembly, staggered from center out (Y, O first — the middle of ALYOXA)
      tl.to(letters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.75,
        ease: "back.out(1.7)",
        stagger: { each: 0.07, from: "center" },
      });

      // PHASE 03 — unified impact settle
      tl.to(wordmark, { scale: 1.025, duration: 0.18, ease: "power2.out" })
        .to(wordmark, { scale: 1, duration: 0.32, ease: "power3.inOut" });

      // PHASE 04 — brand hold
      tl.to({}, { duration: 0.6 });

      // PHASE 05 — exit: letters BLAST outward in different directions, then container clears
      tl.to(letters, {
        opacity: 0,
        scale: 1.4,
        // Each letter flies toward its own quadrant — outer letters go further/faster,
        // center letters (Y, O) shoot mostly vertical so nothing collides mid-flight.
        x: (i) => (i - (letters.length - 1) / 2) * gsap.utils.random(90, 160),
        y: () => gsap.utils.random(-180, 180),
        rotation: () => gsap.utils.random(-120, 120),
        duration: 0.6,
        ease: "power3.in",
        stagger: { each: 0.035, from: "center" },
      }).to(
        container,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
        },
        "-=0.15"
      );
    });
  });

  return () => {
    ctx.revert();
    document.body.style.overflow = "";
  };
}