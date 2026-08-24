import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initInteractionAnimation(container: HTMLElement): () => void {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    // Left Side Elements
    const meta = container.querySelector<HTMLElement>('[data-si="meta"]');
    const headline = container.querySelector<HTMLElement>('[data-si="headline"]');
    const divider = container.querySelector<HTMLElement>('[data-si="divider"]');
    const description = container.querySelector<HTMLElement>('[data-si="description"]');
    const capabilitiesTitle = container.querySelector<HTMLElement>('[data-si="capabilities-title"]');
    const capabilitiesList = container.querySelectorAll<HTMLElement>('[data-si="capability-item"]');
    const footer = container.querySelector<HTMLElement>('[data-si="footer"]');

    // Right Canvas & Grid
    const canvas = container.querySelector<HTMLElement>('[data-si="canvas"]');
    const grid = container.querySelector<HTMLElement>('[data-si="grid"]');
    const radii1 = container.querySelector<HTMLElement>('[data-si="radii-1"]');
    const radii2 = container.querySelector<HTMLElement>('[data-si="radii-2"]');

    // Vectors & Anchors
    const path1 = container.querySelector<SVGPathElement>('[data-si="path-1"]');
    const path2 = container.querySelector<SVGPathElement>('[data-si="path-2"]');
    const anchorDots = container.querySelectorAll<SVGCircleElement>('[data-si="anchor-dot"]');

    // Reactive Objects & Cursor
    const coreCard = container.querySelector<HTMLElement>('[data-si="core-card"]');
    const ghostCard = container.querySelector<HTMLElement>('[data-si="ghost-card"]');
    const cursorTarget = container.querySelector<HTMLElement>('[data-si="cursor-target"]');
    const cardProgress = container.querySelector<HTMLElement>('[data-si="card-progress"]');
    const stateBar = container.querySelector<HTMLElement>('[data-si="state-bar"]');

    // Annotations
    const controlPanel = container.querySelector<HTMLElement>('[data-si="control-panel"]');
    const tagTop = container.querySelector<HTMLElement>('[data-si="tag-top"]');
    const badgeFps = container.querySelector<HTMLElement>('[data-si="badge-fps"]');
    const tagBottom = container.querySelector<HTMLElement>('[data-si="tag-bottom"]');

    if (isReducedMotion) return;

    // 1. Perspective Setup
    if (canvas) {
      gsap.set(canvas, { perspective: 1200, transformStyle: "preserve-3d" });
    }

    // Prepare SVG Path stroke dash offset
    [path1, path2].forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      }
    });

    // 2. Initial States
    gsap.set(meta, { opacity: 0, y: 20, filter: "blur(4px)" });
    gsap.set(headline, { opacity: 0, y: isMobile ? 35 : 70, rotateX: -15 });
    gsap.set(divider, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(description, { opacity: 0, y: 35, filter: "blur(4px)" });
    gsap.set(capabilitiesTitle, { opacity: 0, y: 20 });
    gsap.set(capabilitiesList, { opacity: 0, x: -20 });
    gsap.set(footer, { opacity: 0, y: 20 });

    // Canvas & Geometry
    gsap.set(canvas, { opacity: 0, scale: 0.88, rotateX: -10, rotateY: -8 });
    gsap.set(grid, { opacity: 0, scale: 1.2 });
    gsap.set([radii1, radii2], { opacity: 0, scale: 0.4, rotate: 120 });
    gsap.set(anchorDots, { opacity: 0, scale: 0 });

    // Objects & Motion Controls
    gsap.set(coreCard, { opacity: 0, scale: 0.7, z: 60, rotateZ: -12, filter: "blur(8px)" });
    gsap.set(ghostCard, { opacity: 0, scale: 0.5, x: 80, y: 60, rotateZ: 18 });
    gsap.set(cursorTarget, { opacity: 0, x: 100, y: -80, scale: 0.5 });
    gsap.set(controlPanel, { opacity: 0, y: 30, z: 40 });
    gsap.set(cardProgress, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(stateBar, { scaleX: 0, transformOrigin: "left center" });

    // Badges
    gsap.set([tagTop, badgeFps, tagBottom], { opacity: 0, y: 15 });

    // 3. Pinned Scroll Timeline
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

    // Step A: Canvas Frame Entry
    tl.to(canvas, { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.5, ease: "power3.out" }, 0)
      .to(grid, { opacity: 0.25, scale: 1, duration: 1.2 }, 0.2)
      .to([radii1, radii2], { opacity: 1, scale: 1, rotate: 0, stagger: 0.15, duration: 1.2, ease: "power2.out" }, 0.3);

    // Step B: Left Narrative Reveal
    tl.to(meta, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.4)
      .to(headline, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, ease: "power4.out" }, 0.6)
      .to(divider, { opacity: 1, scaleX: 1, duration: 0.8 }, 1.0)
      .to(description, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 1.2)
      .to(capabilitiesTitle, { opacity: 1, y: 0, duration: 0.6 }, 1.4)
      .to(capabilitiesList, { opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 1.6)
      .to(footer, { opacity: 1, y: 0, duration: 0.6 }, 2.0);

    // Step C: Physics Vector Path Trace
    tl.to([path1, path2], { strokeDashoffset: 0, duration: 1.4, stagger: 0.3, ease: "power2.inOut" }, 1.0)
      .to(anchorDots, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(2)" }, 1.6);

    // Step D: Core Reactive Card & Cursor Fly-In
    tl.to(coreCard, { opacity: 1, scale: 1, z: 0, rotateZ: -3, filter: "blur(0px)", duration: 1.2, ease: "back.out(1.5)" }, 1.8)
      .to(ghostCard, { opacity: 1, scale: 1, x: 48, y: 32, rotateZ: 6, duration: 1.2, ease: "power3.out" }, 2.0)
      .to(cursorTarget, { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.0, ease: "power3.out" }, 2.2);

    // Step E: Progress Fill & Control Panel Activation
    tl.to(cardProgress, { scaleX: 1, duration: 0.8, ease: "power2.out" }, 2.4)
      .to(controlPanel, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 2.5)
      .to(stateBar, { scaleX: 1, duration: 0.8, ease: "power2.out" }, 2.7)
      .to([tagTop, badgeFps, tagBottom], { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 2.9);

    // Step F: Floating Continuous Sway
    tl.to(
      coreCard,
      {
        rotateZ: 0,
        y: -8,
        duration: 0.8,
        ease: "sine.inOut",
      },
      3.2
    );

    // Interactive Mouse Tilt
    if (!isMobile && canvas) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        gsap.to(canvas, {
          rotateX: (-mouseY / (rect.height / 2)) * 4,
          rotateY: (mouseX / (rect.width / 2)) * 4,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(canvas, {
          rotateX: 0,
          rotateY: 0,
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