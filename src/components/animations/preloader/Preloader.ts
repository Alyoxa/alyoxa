import gsap from "gsap";

export function initializePreloader(onComplete?: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  let completed = false;

  const finish = () => {
    if (completed) return;
    completed = true;
    document.body.style.overflow = "";
    onComplete?.();
  };

  const ctx = gsap.context(() => {
    const container = document.querySelector<HTMLElement>(
      '[data-preloader="container"]'
    );
    const wordmark = document.querySelector<HTMLElement>(
      '[data-preloader="wordmark"]'
    );
    const letters = gsap.utils.toArray<SVGPathElement>(
      "[data-preloader-letter]"
    );

    if (!container || !wordmark || letters.length === 0) {
      finish();
      return;
    }

    document.body.style.overflow = "hidden";

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(letters, { opacity: 1 });

      gsap.to(container, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.out",
        onComplete: finish,
      });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(container, { clipPath: "inset(0% 0% 0% 0%)" });

      gsap.set(letters, {
        opacity: 0,
        y: (i) =>
          gsap.utils.mapRange(0, letters.length - 1, -30, 30, i),
        x: (i) => (i - (letters.length - 1) / 2) * -10,
        scale: 0.75,
        rotation: (i) => (i % 2 === 0 ? -8 : 8),
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({ onComplete: finish });

      // Assemble the wordmark.
      tl.to(letters, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
        stagger: { each: 0.055, from: "center" },
      });

      // Unified impact.
      tl.to(wordmark, {
        scale: 1.02,
        duration: 0.15,
        ease: "power2.out",
      }).to(wordmark, {
        scale: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });

      // Short brand hold and scattered-letter exit.
      tl.to({}, { duration: 0.25 });

      tl.to(
        letters,
        {
          opacity: 0,
          scale: 1.25,
          x: (i) =>
            (i - (letters.length - 1) / 2) *
            gsap.utils.random(70, 120),
          y: () => gsap.utils.random(-120, 120),
          rotation: () => gsap.utils.random(-90, 90),
          duration: 0.4,
          ease: "power2.in",
          stagger: { each: 0.025, from: "center" },
        },
        ">"
      );

      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        },
        "-=0.12"
      );
    });
  });

  return () => {
    ctx.revert();
    document.body.style.overflow = "";
  };
}
