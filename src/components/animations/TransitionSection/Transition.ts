// animations/transition.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Split only NON-masked lines to preserve background-clip: text mask visibility
function splitTextIntoChars(elements: NodeListOf<Element>) {
  elements.forEach((el) => {
    if (el.getAttribute("data-split") === "true" || el.getAttribute("data-masked") === "true") return;
    const text = el.textContent || "";
    el.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? `<span class="inline-block">&nbsp;</span>`
          : `<span class="char inline-block translate-z-0 transform-gpu">${char}</span>`
      )
      .join("");
    el.setAttribute("data-split", "true");
  });
}

export function initTransitionAnimation(container: HTMLElement): () => void {
  const ctx = gsap.context(() => {
    const sticky = container.querySelector('[data-transition="sticky"]');
    const blocks = container.querySelectorAll('[data-transition="block"]');

    if (!sticky || blocks.length < 3) return;

    splitTextIntoChars(container.querySelectorAll('[data-transition="line"]'));

    gsap.set([blocks[0], blocks[1], blocks[2]], { perspective: 1000 });

    gsap.set(blocks[0], { opacity: 1, pointerEvents: "auto" });
    gsap.set([blocks[1], blocks[2]], { opacity: 0, pointerEvents: "none" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: sticky,
        start: "top top",
        end: "+=1200%", // Expanded scroll distance to force slow playback
        scrub: 3,       // High inertia value (3s delay buffer) dampens fast scrolling
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const getTargets = (block: Element) => {
      const targets: Element[] = [];
      block.querySelectorAll('[data-transition="line"]').forEach((line) => {
        if (line.getAttribute("data-masked") === "true") {
          targets.push(line);
        } else {
          line.querySelectorAll(".char").forEach((char) => targets.push(char));
        }
      });
      return targets;
    };

    const targets1 = getTargets(blocks[0]);
    const targets2 = getTargets(blocks[1]);
    const targets3 = getTargets(blocks[2]);

    // =========================================================================
    // 01. ENTRANCE: SECTION 01
    // =========================================================================
    tl.fromTo(
      targets1,
      {
        rotateX: -55,
        rotateY: 12,
        z: -180,
        y: 100,
        scale: 1.08,
        opacity: 0,
        filter: "blur(14px)",
      },
      {
        rotateX: 0,
        rotateY: 0,
        z: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        stagger: {
          each: 0.045,
          from: "center",
        },
        duration: 5,
        ease: "power3.out",
      },
      0
    );

    // LONG HOLD SECTION 01
    tl.to(blocks[0], {
      scale: 1.012,
      y: -4,
      duration: 3,
      ease: "power1.inOut",
    });
    
    tl.to(blocks[0], {
      scale: 1,
      y: 0,
      duration: 3,
      ease: "power1.inOut",
    });

    // =========================================================================
    // 02. TRANSITION: SECTION 01 EXIT -> SECTION 02 ENTRANCE
    // =========================================================================
    tl.to(
      targets1,
      {
        rotateX: 65,
        z: -100,
        y: -100,
        opacity: 0,
        filter: "blur(12px)",
        stagger: 0.03,
        duration: 4,
        ease: "power2.in",
      },
      "trans1"
    )
      .set(blocks[0], { opacity: 0, pointerEvents: "none" }, "trans1+=3.5")

      // Section 02 Enters
      .set(blocks[1], { opacity: 1, pointerEvents: "auto" }, "trans1+=2.5")
      .fromTo(
        targets2,
        {
          rotateX: 35,
          rotateY: 25,
          z: -220,
          x: 80,
          y: -70,
          scale: 1.08,
          opacity: 0,
          filter: "blur(16px)",
        },
        {
          rotateX: 0,
          rotateY: 0,
          z: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          stagger: {
            each: 0.045,
            from: "start",
          },
          duration: 5,
          ease: "power3.out",
        },
        "trans1+=3.0"
      );

    // LONG HOLD SECTION 02
    tl.to({}, { duration: 6 });

    // =========================================================================
    // 03. TRANSITION: SECTION 02 EXIT -> SECTION 03 ENTRANCE
    // =========================================================================
    tl.to(
      targets2,
      {
        rotateX: 75,
        z: -120,
        y: -100,
        opacity: 0,
        filter: "blur(12px)",
        stagger: 0.03,
        duration: 4,
        ease: "power2.in",
      },
      "trans2"
    )
      .set(blocks[1], { opacity: 0, pointerEvents: "none" }, "trans2+=3.5")

      // Section 03 Enters
      .set(blocks[2], { opacity: 1, pointerEvents: "auto" }, "trans2+=2.5")
      .fromTo(
        targets3,
        {
          rotateX: -30,
          rotateY: -20,
          z: -260,
          y: 100,
          x: -70,
          scale: 1.1,
          opacity: 0,
          filter: "blur(18px)",
        },
        {
          rotateX: 0,
          rotateY: 0,
          z: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          stagger: {
            each: 0.05,
            from: "center",
          },
          duration: 5,
          ease: "power3.out",
        }
      );

    // LONG HOLD SECTION 03
    tl.to({}, { duration: 6 });

    // =========================================================================
    // 04. SECTION 03 REVERSE/EXIT (Clean Up)
    // =========================================================================
    tl.to(targets3, {
      rotateX: 60,
      y: -80,
      opacity: 0,
      filter: "blur(10px)",
      stagger: 0.03,
      duration: 4,
      ease: "power2.in",
    });
  }, container);

  return () => ctx.revert();
}