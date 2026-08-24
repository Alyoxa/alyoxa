import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initTestimonialsAnimation(container: HTMLElement): () => void {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    const stage = container.querySelector<HTMLElement>('[data-tt="stage"]');
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-testimonial-card]'));
    const indexCounter = container.querySelector<HTMLElement>('[data-tt="counter"]');
    const leftColElements = container.querySelectorAll<HTMLElement>('[data-tt-reveal]');

    if (!stage || cards.length === 0) return;

    if (isReducedMotion) {
      cards.forEach((card) => {
        gsap.set(card, { position: "relative", opacity: 1, y: 0, scale: 1 });
      });
      return;
    }

    gsap.set(stage, { perspective: 1200, transformStyle: "preserve-3d" });

    // Set stage height precisely to card height plus tab overhead
    const cardHeight = cards[0].offsetHeight || 500;
    gsap.set(stage, { height: `${cardHeight + 40}px` });

    // Initial positioning for all cards
    cards.forEach((card, i) => {
      gsap.set(card, {
        position: "absolute",
        top: 40,
        left: 0,
        width: "100%",
        zIndex: cards.length - i,
        transformOrigin: "center bottom",
      });

      if (i === 0) {
        // Entry state for Card 01: starts slightly lower and faded
        gsap.set(card, { scale: 0.9, y: 100, opacity: 0, rotateZ: 0 });
      } else {
        gsap.set(card, {
          scale: 0.94,
          y: isMobile ? 160 : 280,
          opacity: 0,
          rotateZ: i % 2 === 0 ? 0.8 : -0.8,
        });
      }
    });

    // Set initial state for left column reveal elements if present
    if (leftColElements.length > 0) {
      gsap.set(leftColElements, { opacity: 0, y: 30 });
    }

    // Pinned ScrollTrigger Timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${(cards.length + 1) * 80}%`, // Added extra range for smooth entrance/exit transitions
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // ----------------------------------------------------
    // PHASE 1: SECTION ENTRANCE ANIMATION (SCROLLING IN)
    // ----------------------------------------------------
    masterTl.addLabel("entry");

    if (leftColElements.length > 0) {
      masterTl.to(
        leftColElements,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "entry"
      );
    }

    // Card 01 reveals into focus
    masterTl.to(
      cards[0],
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "entry"
    );

    // ----------------------------------------------------
    // PHASE 2: CARD STACKING INTERACTION
    // ----------------------------------------------------
    cards.forEach((card, index) => {
      if (index === 0) return;

      const prevCard = cards[index - 1];
      const olderCards = cards.slice(0, index - 1);
      const cardLabel = `card-${index}`;

      masterTl.addLabel(cardLabel);

      if (indexCounter) {
        masterTl.to(
          indexCounter,
          {
            textContent: `${index + 1}`,
            snap: { textContent: 1 },
            duration: 0.2,
          },
          cardLabel
        );
      }

      // Incoming card slides into position
      masterTl.to(
        card,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateZ: 0,
          zIndex: 10 + index,
          duration: 1.2,
          ease: "power2.out",
        },
        cardLabel
      );

      // Previous card recedes upward to display top tab
      masterTl.to(
        prevCard,
        {
          scale: 0.98,
          y: isMobile ? -16 : -24,
          opacity: 0.8,
          rotateZ: index % 2 === 0 ? -0.4 : 0.4,
          duration: 1.2,
          ease: "power2.out",
        },
        cardLabel
      );

      // Shift older cards deeper up
      olderCards.forEach((oldCard, oIdx) => {
        const depth = index - oIdx;
        masterTl.to(
          oldCard,
          {
            scale: Math.max(0.92, 0.98 - depth * 0.02),
            y: isMobile ? -depth * 12 : -depth * 20,
            opacity: Math.max(0.3, 0.8 - depth * 0.15),
            duration: 1.2,
            ease: "power2.out",
          },
          cardLabel
        );
      });
    });

    // ----------------------------------------------------
    // PHASE 3: SECTION EXIT ANIMATION (LEAVING SECTION)
    // ----------------------------------------------------
    masterTl.addLabel("exit");

    masterTl.to(
      stage,
      {
        scale: 0.92,
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      "exit"
    );

    if (leftColElements.length > 0) {
      masterTl.to(
        leftColElements,
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.inOut",
        },
        "exit"
      );
    }
  }, container);

  return () => ctx.revert();
}