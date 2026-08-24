import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initializeWhyAlyoxaAnimation(container: HTMLElement): () => void {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    const title = container.querySelector('[data-why="title"]');
    const cards = container.querySelectorAll<HTMLElement>('[data-why="card"]');

    if (!title || cards.length < 4) return;

    if (isReducedMotion) {
      gsap.set([title, ...Array.from(cards)], { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // Set perspective on section container for true 3D space depth
    gsap.set(container, { perspective: 1200, transformStyle: "preserve-3d" });

    // --- MOBILE DIRECT STREAMLINED ANIMATION ---
    if (isMobile) {
      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 0.5,
        },
      });

      mobileTl.fromTo(title, { opacity: 0, scale: 1.4, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 });

      cards.forEach((card) => {
        mobileTl.fromTo(card, { opacity: 0, y: 40, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.8 }, "-=0.4");
      });

      return;
    }

    // --- DESKTOP CRAZY CINEMATIC PINNED SYSTEM TIMELINE ---
    const [card1, card2, card3, card4] = Array.from(cards);

    // Initial Setup: HUGE, wide, blurry Title
    gsap.set(title, { 
      opacity: 0, 
      scale: 2.2, 
      y: 40, 
      letterSpacing: "0.2em",
      filter: "blur(20px)",
      transformOrigin: "center center"
    });

    // Initial Setup: 3D Holographic Spatial Offsets for Cards
    gsap.set(card1, { opacity: 0, scale: 0.4, x: -350, y: -250, z: -400, rotateX: 45, rotateY: -35, rotateZ: -15, transformOrigin: "center center" });
    gsap.set(card2, { opacity: 0, scale: 0.4, x: -350, y: 250, z: -400, rotateX: -45, rotateY: -35, rotateZ: 15, transformOrigin: "center center" });
    gsap.set(card3, { opacity: 0, scale: 0.4, x: 350, y: -250, z: -400, rotateX: 45, rotateY: 35, rotateZ: 15, transformOrigin: "center center" });
    gsap.set(card4, { opacity: 0, scale: 0.4, x: 350, y: 250, z: -400, rotateX: -45, rotateY: 35, rotateZ: -15, transformOrigin: "center center" });

    // Internal card structural elements initial zero state
    cards.forEach((card) => {
      const header = card.querySelector('[data-why="header"]');
      const grid = card.querySelector('[data-why="grid"]');
      const svgPath = card.querySelector('[data-why="svg-path"]');
      const svgLine = card.querySelector('[data-why="svg-line"]');
      const annotations = card.querySelectorAll('[data-why="annotation"]');
      const desc = card.querySelector('[data-why="description"]');
      const stmt = card.querySelector('[data-why="statement"]');
      const footer = card.querySelector('[data-why="footer"]');
      const dot = card.querySelector('[data-why="status-dot"]');

      gsap.set([header, grid, annotations, desc, stmt, footer], { opacity: 0 });
      gsap.set(dot, { opacity: 0, scale: 0.2 });
      gsap.set([desc, stmt, footer], { y: 15 });

      if (svgPath) {
        const pathLength = (svgPath as SVGPathElement).getTotalLength?.() || 300;
        gsap.set(svgPath, { strokeDasharray: pathLength, strokeDashoffset: pathLength, opacity: 0 });
      }
      if (svgLine) {
        const lineLength = (svgLine as SVGLineElement).getTotalLength?.() || 100;
        gsap.set(svgLine, { strokeDasharray: lineLength, strokeDashoffset: lineLength, opacity: 0 });
      }
    });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=280%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // PHASE 01: MASSIVE TITLE ENTRANCE (Zooms down slowly from screen height)
    mainTl.to(title, {
      opacity: 1,
      scale: 1,
      y: 0,
      letterSpacing: "-0.02em",
      filter: "blur(0px)",
      duration: 2.5,
      ease: "power4.out",
    });

    // PHASE 02: CRAZY 3D CARD UNFOLDING & ASSEMBLY
    const assembleCard3D = (card: HTMLElement, position: string) => {
      mainTl.to(
        card,
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          duration: 2,
          ease: "expo.out",
        },
        position
      );
    };

    // Staggered 3D spatial entry sequence
    assembleCard3D(card1, "-=1.2");
    assembleCard3D(card3, "-=1.6");
    assembleCard3D(card2, "-=1.6");
    assembleCard3D(card4, "-=1.6");

    // PHASE 03: BLUEPRINT INFRASTRUCTURE "POWER-ON"
    cards.forEach((card) => {
      const header = card.querySelector('[data-why="header"]');
      const grid = card.querySelector('[data-why="grid"]');
      const svgPath = card.querySelector('[data-why="svg-path"]');
      const svgLine = card.querySelector('[data-why="svg-line"]');
      const annotations = card.querySelectorAll('[data-why="annotation"]');
      const desc = card.querySelector('[data-why="description"]');
      const stmt = card.querySelector('[data-why="statement"]');
      const footer = card.querySelector('[data-why="footer"]');
      const dot = card.querySelector('[data-why="status-dot"]');

      mainTl
        .to(grid, { opacity: 0.25, duration: 0.5 }, "-=1.0")
        .to([svgPath, svgLine], { strokeDashoffset: 0, opacity: 1, duration: 1.2, ease: "power3.inOut" }, "-=0.8")
        .to(header, { opacity: 1, duration: 0.4 }, "-=0.8")
        .to(dot, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.6")
        .to(annotations, { opacity: 1, stagger: 0.08, duration: 0.4 }, "-=0.5")
        .to(desc, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to(stmt, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
        .to(footer, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
    });

    // PHASE 04: SCROLL TRANSFORMATION — TITLE SHRINKS & CARDS LOCK IN
    mainTl
      .to(
        title,
        {
          scale: 0.65,
          y: -15,
          opacity: 0.4,
          duration: 2,
          ease: "power2.inOut",
        },
        "+=0.4"
      )
      .to(
        [card1, card2, card3, card4],
        {
          scale: 1.05,
          duration: 2,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(card1, { x: 20, y: 15, duration: 2 }, "<")
      .to(card4, { x: -20, y: -15, duration: 2 }, "<")
      .to(card2, { x: -15, y: -15, duration: 2 }, "<")
      .to(card3, { x: 15, y: 15, duration: 2 }, "<");

    // Hold state before scrolling to next section smoothly
    mainTl.to({}, { duration: 1 });

    // --- HOVER INTERACTION WITH MAGNETIC 3D ROTATION ---
    const hoverCleanups: (() => void)[] = [];

    cards.forEach((card) => {
      const svg = card.querySelector('[data-why="svg"]');
      const grid = card.querySelector('[data-why="grid"]');

      const onMouseEnter = () => {
        gsap.to(card, {
          scale: 1.08,
          y: -6,
          rotateX: 4,
          rotateY: -4,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (svg) gsap.to(svg, { scale: 1.08, rotateZ: 3, duration: 0.4, overwrite: "auto" });
        if (grid) gsap.to(grid, { opacity: 0.45, duration: 0.3, overwrite: "auto" });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          scale: 1.05,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (svg) gsap.to(svg, { scale: 1, rotateZ: 0, duration: 0.5, overwrite: "auto" });
        if (grid) gsap.to(grid, { opacity: 0.2, duration: 0.4, overwrite: "auto" });
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      hoverCleanups.push(() => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      hoverCleanups.forEach((cb) => cb());
    };
  }, container);

  return () => ctx.revert();
}