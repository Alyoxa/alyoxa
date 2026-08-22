import gsap from "gsap";

export function initializeHero(
  { play = true }: { play?: boolean } = {}
): () => void {

  if (typeof window === "undefined") return () => {};

  const ctx = gsap.context(() => {
    const badge = document.querySelector('[data-hero="badge"]');
    const badgeText = document.querySelector('[data-hero="badge-text"]');
    const badgeFlare = document.querySelector('[data-hero="badge-flare"]');
    const headingMain = document.querySelectorAll('[data-hero="heading-main"]');
    const headingHighlight = document.querySelector<HTMLElement>('[data-hero="heading-highlight"]');
    const visual = document.querySelector('[data-hero="visual"]');
    const actions = document.querySelectorAll('[data-hero="actions"] > *');

    if (!headingHighlight) return;

    // Dynamically split "WEBSITES" text into individual 3D letter spans
    const textContent = headingHighlight.innerText;
    headingHighlight.innerHTML = "";
    
    const letterSpans = textContent.split("").map((char) => {
      const span = document.createElement("span");
      span.innerText = char;
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity, filter";
      headingHighlight.appendChild(span);
      return span;
    });

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      delay: 0.1,
    });

    // ------------------------------------------------------------------
    // INITIAL STATES (Deep Architectural Setup)
    // ------------------------------------------------------------------
    
    // Badge: Micro scale-up from depth
    gsap.set(badge, {
        opacity: 0,
        y: 30,
        scaleX: 0.2, // Starts narrow horizontally
        transformOrigin: "center center",
      });
      
      gsap.set(badgeText, {
        opacity: 0,
        letterSpacing: "0.35em", // Ultra-wide typography starting state
      });
      
      if (badgeFlare) {
        gsap.set(badgeFlare, { xPercent: -100 });
      }

    // Main typography context
    gsap.set(headingMain, { 
      opacity: 0, 
      y: 70, 
      rotateX: -15,
      filter: "blur(12px)",
      transformOrigin: "50% 100%"
    });

    // "WEBSITES" letters initial explosion state
    gsap.set(letterSpans, { 
      opacity: 0, 
      y: 110, 
      scale: 2.2, 
      rotateY: 45,
      rotateZ: 10,
      filter: "blur(20px)",
      transformOrigin: "50% 50% -100px"
    });

    // Spline canvas initial deep perspective state
    gsap.set(visual, { 
      opacity: 0, 
      scale: 1.15, 
      y: 60,
      rotateX: 8,
      transformOrigin: "center center"
    });

    // Action CTA buttons initial state
    gsap.set(actions, { 
      opacity: 0, 
      y: 40,
      scale: 0.92 
    });

    if (!play) {
      return;
    }


    // ------------------------------------------------------------------
    // MASTER CHOREOGRAPHY SEQUENCE
    // ------------------------------------------------------------------

    tl
      // 01. Badge snaps into position with tracking compression
      .to(badge, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.85,
        ease: "expo.out",
      })
    
      // 02. Text slams in with compressed tracking snap
      .to(
        badgeText,
        {
          opacity: 1,
          letterSpacing: "0.08em",
          duration: 0.95,
          ease: "back.out(2.0)", // Mechanical click-in effect
        },
        "-=0.6"
      )
    
      // 03. Gloss flare sweeps across the capsule
      .to(
        badgeFlare,
        {
          xPercent: 200,
          duration: 0.75,
          ease: "power2.inOut",
        },
        "-=0.4"
      )
      // 02. Surrounding headline emerges cleanly
      .to(
        headingMain,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.75"
      )

      // 03. "WEBSITES" — Dynamic character explosion & magnetic locking
      .to(
        letterSpans,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          rotateZ: 0,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: {
            each: 0.04,
            from: "center", // Ripple outward from center character
          },
          ease: "back.out(2.2)", // Mechanical kinetic snap
        },
        "-=1.15"
      )

      // 04. 3D Spline Canvas settles from hyper-depth into scale-1 focus
      .to(
        visual,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          duration: 2.4,
          ease: "power3.out",
        },
        "-=1.6"
      )

      // 05. Action buttons lock into place
      .to(
        actions,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
        },
        "-=1.5"
      );
  });

  return () => ctx.revert();
}