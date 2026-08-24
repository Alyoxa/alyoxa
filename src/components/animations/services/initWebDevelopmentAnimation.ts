import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initWebDevelopmentAnimation(container: HTMLElement): () => void {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    // Left Side Elements
    const meta = container.querySelector<HTMLElement>('[data-swd="meta"]');
    const headline = container.querySelector<HTMLElement>('[data-swd="headline"]');
    const divider = container.querySelector<HTMLElement>('[data-swd="divider"]');
    const description = container.querySelector<HTMLElement>('[data-swd="description"]');
    const capabilitiesTitle = container.querySelector<HTMLElement>('[data-swd="capabilities-title"]');
    const capabilitiesList = container.querySelectorAll<HTMLElement>('[data-swd="capability-item"]');
    const footer = container.querySelector<HTMLElement>('[data-swd="footer"]');

    // Right Canvas & Visual Layers
    const canvas = container.querySelector<HTMLElement>('[data-swd="canvas"]');
    const grid = container.querySelector<HTMLElement>('[data-swd="grid"]');
    const domCells = container.querySelectorAll<HTMLElement>('[data-swd="dom-cell"]');
    const desktopFrame = container.querySelector<HTMLElement>('[data-swd="desktop-frame"]');
    const heroBlock = container.querySelector<HTMLElement>('[data-swd="hero-block"]');
    const perfBlock = container.querySelector<HTMLElement>('[data-swd="perf-block"]');
    const gridCards = container.querySelectorAll<HTMLElement>('[data-swd="grid-card"]');
    const mobileFrame = container.querySelector<HTMLElement>('[data-swd="mobile-frame"]');
    const techBadge = container.querySelector<HTMLElement>('[data-swd="tech-badge"]');

    // Annotations
    const tagTop = container.querySelector<HTMLElement>('[data-swd="tag-top"]');
    const measurement = container.querySelector<HTMLElement>('[data-swd="measurement"]');
    const tagBottom = container.querySelector<HTMLElement>('[data-swd="tag-bottom"]');

    if (isReducedMotion) return;

    // 1. Setup Perspective & Initial Positions
    if (canvas) {
      gsap.set(canvas, { perspective: 1200, transformStyle: "preserve-3d" });
    }

    // Left Narrative Initial States
    gsap.set(meta, { opacity: 0, y: 20, filter: "blur(4px)" });
    gsap.set(headline, { opacity: 0, y: isMobile ? 35 : 70, rotateX: -15 });
    gsap.set(divider, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(description, { opacity: 0, y: 35, filter: "blur(4px)" });
    gsap.set(capabilitiesTitle, { opacity: 0, y: 20 });
    gsap.set(capabilitiesList, { opacity: 0, x: -20 });
    gsap.set(footer, { opacity: 0, y: 20 });

    // Right Visual Initial States
    gsap.set(canvas, { opacity: 0, scale: 0.88, rotateX: -8, rotateY: 8 });
    gsap.set(grid, { opacity: 0 });
    gsap.set(domCells, { opacity: 0, scale: 0.8 });
    gsap.set(desktopFrame, { opacity: 0, y: 50, scale: 0.9, rotateX: 6 });
    gsap.set(heroBlock, { opacity: 0, y: 20 });
    gsap.set(perfBlock, { opacity: 0, scale: 0.85 });
    gsap.set(gridCards, { opacity: 0, y: 20, scale: 0.9 });
    gsap.set(mobileFrame, { opacity: 0, x: 60, y: 40, rotateZ: 8, scale: 0.8 });
    gsap.set(techBadge, { opacity: 0, y: -20, scale: 0.8 });
    gsap.set([tagTop, measurement, tagBottom], { opacity: 0, y: 15 });

    // 2. Timeline with Pinned ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // Step A: Canvas & DOM Grid Matrix Entry
    tl.to(canvas, { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.5, ease: "power3.out" }, 0)
      .to(grid, { opacity: 0.2, duration: 1.0 }, 0.2)
      .to(domCells, { opacity: 1, scale: 1, duration: 0.8, stagger: { amount: 0.6, grid: [6, 12], from: "center" } }, 0.3);

    // Step B: Left Narrative Fade In & Slide
    tl.to(meta, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.4)
      .to(headline, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, ease: "power4.out" }, 0.6)
      .to(divider, { opacity: 1, scaleX: 1, duration: 0.8 }, 1.0)
      .to(description, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 1.2)
      .to(capabilitiesTitle, { opacity: 1, y: 0, duration: 0.6 }, 1.4)
      .to(capabilitiesList, { opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 1.6)
      .to(footer, { opacity: 1, y: 0, duration: 0.6 }, 2.0);

    // Step C: Desktop Frame & Inner Component Assembly
    tl.to(desktopFrame, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.4, ease: "power3.out" }, 1.0)
      .to(heroBlock, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.5)
      .to(perfBlock, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, 1.7)
      .to(gridCards, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }, 1.9);

    // Step D: Mobile Viewport Overlay & Badge Reveal
    tl.to(mobileFrame, { opacity: 1, x: 0, y: 0, rotateZ: 0, scale: 1, duration: 1.2, ease: "back.out(1.2)" }, 2.2)
      .to(techBadge, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 2.5)
      .to([tagTop, measurement, tagBottom], { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 2.8);

    // Step E: Subtle Float State
    tl.to(
      mobileFrame,
      {
        y: -6,
        duration: 0.8,
        ease: "sine.inOut",
      },
      3.2
    );

    // 3. Interactive Mouse Parallax Tilt
    if (!isMobile && canvas) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        gsap.to(canvas, {
          rotateX: (-mouseY / (rect.height / 2)) * 3.5,
          rotateY: (mouseX / (rect.width / 2)) * 3.5,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(mobileFrame, {
          x: (mouseX / (rect.width / 2)) * 6,
          y: (mouseY / (rect.height / 2)) * 6,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to([canvas, mobileFrame], {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }
  }, container);

  return () => ctx.revert();
}