import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initBrandSystemsAnimation(container: HTMLElement): () => void {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    // Left Side Elements
    const meta = container.querySelector<HTMLElement>('[data-bs="meta"]');
    const headline = container.querySelector<HTMLElement>('[data-bs="headline"]');
    const divider = container.querySelector<HTMLElement>('[data-bs="divider"]');
    const description = container.querySelector<HTMLElement>('[data-bs="description"]');
    const capabilitiesTitle = container.querySelector<HTMLElement>('[data-bs="capabilities-title"]');
    const capabilitiesList = container.querySelectorAll<HTMLElement>('[data-bs="capability-item"]');
    const footer = container.querySelector<HTMLElement>('[data-bs="footer"]');

    // Right Side Board & Layers
    const board = container.querySelector<HTMLElement>('[data-bs="board"]');
    const grid = container.querySelector<HTMLElement>('[data-bs="grid"]');
    const radial1 = container.querySelector<HTMLElement>('[data-bs="radial-1"]');
    const radial2 = container.querySelector<HTMLElement>('[data-bs="radial-2"]');
    
    // Monogram & Circles
    const monogram = container.querySelector<HTMLElement>('[data-bs="monogram"]');
    const circle1 = container.querySelector<HTMLElement>('[data-bs="circle-1"]');
    const circle2 = container.querySelector<HTMLElement>('[data-bs="circle-2"]');
    
    // Axis Lines & Anchors
    const rayH = container.querySelector<HTMLElement>('[data-bs="ray-h"]');
    const rayV = container.querySelector<HTMLElement>('[data-bs="ray-v"]');
    const anchors = container.querySelectorAll<HTMLElement>('[data-bs="anchor"]');

    // Floating Specimen & Tokens
    const specimen = container.querySelector<HTMLElement>('[data-bs="specimen"]');
    const headerTag = container.querySelector<HTMLElement>('[data-bs="header-tag"]');
    const tokenMatrix = container.querySelector<HTMLElement>('[data-bs="token-matrix"]');
    const logicTag = container.querySelector<HTMLElement>('[data-bs="logic-tag"]');

    if (isReducedMotion) return;

    // 1. Perspective Setup for Blueprint Drafting Effect
    if (board) {
      gsap.set(board, { perspective: 1200, transformStyle: "preserve-3d" });
    }

    // 2. Initial States
    gsap.set(meta, { opacity: 0, y: 20, filter: "blur(4px)" });
    gsap.set(headline, { opacity: 0, y: isMobile ? 35 : 70, rotateX: -15 });
    gsap.set(divider, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(description, { opacity: 0, y: 35, filter: "blur(4px)" });
    gsap.set(capabilitiesTitle, { opacity: 0, y: 20 });
    gsap.set(capabilitiesList, { opacity: 0, x: -20 });
    gsap.set(footer, { opacity: 0, y: 20 });

    // Visual Board Initial States
    gsap.set(board, { opacity: 0, scale: 0.88, rotateX: 10, rotateY: 8 });
    gsap.set(grid, { opacity: 0, scale: 1.15 });
    gsap.set([radial1, radial2], { opacity: 0, scale: 0.5, rotate: -90 });
    
    gsap.set(monogram, { opacity: 0, scale: 0.6, z: -40, filter: "blur(10px)" });
    gsap.set([circle1, circle2], { opacity: 0, scale: 0.3, rotate: -60 });
    
    gsap.set(rayH, { scaleX: 0, transformOrigin: "center center" });
    gsap.set(rayV, { scaleY: 0, transformOrigin: "center center" });
    gsap.set(anchors, { opacity: 0, scale: 0 });

    gsap.set(specimen, { opacity: 0, x: -60, y: -30, z: 80, rotateZ: -8 });
    gsap.set([headerTag, logicTag], { opacity: 0, y: 15 });
    gsap.set(tokenMatrix, { opacity: 0, x: 50, y: 30, z: 90 });

    // 3. Pinned Scroll Sequence
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

    // Step A: Drafting Board Reveal
    tl.to(board, { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.5, ease: "power3.out" }, 0)
      .to(grid, { opacity: 0.25, scale: 1, duration: 1.2 }, 0.2)
      .to([radial1, radial2], { opacity: 1, scale: 1, rotate: 0, stagger: 0.15, duration: 1.2, ease: "power2.out" }, 0.3);

    // Step B: Left Editorial Narrative
    tl.to(meta, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.4)
      .to(headline, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, ease: "power4.out" }, 0.6)
      .to(divider, { opacity: 1, scaleX: 1, duration: 0.8 }, 1.0)
      .to(description, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 1.2)
      .to(capabilitiesTitle, { opacity: 1, y: 0, duration: 0.6 }, 1.4)
      .to(capabilitiesList, { opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }, 1.6)
      .to(footer, { opacity: 1, y: 0, duration: 0.6 }, 2.0);

    // Step C: Construction Geometry & Axis Lines
    tl.to(rayH, { scaleX: 1, duration: 0.8, ease: "expo.inOut" }, 0.9)
      .to(rayV, { scaleY: 1, duration: 0.8, ease: "expo.inOut" }, 1.1)
      .to(anchors, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(2)" }, 1.4)
      .to([circle1, circle2], { opacity: 1, scale: 1, rotate: 0, stagger: 0.2, duration: 1.2, ease: "power3.out" }, 1.5);

    // Step D: Monogram Construct
    tl.to(monogram, { opacity: 0.85, scale: 1, z: 0, filter: "blur(0px)", duration: 1.4, ease: "back.out(1.4)" }, 1.7);

    // Step E: Floating Specimen & Token Matrix Assembly
    tl.to(specimen, { opacity: 1, x: 0, y: 0, z: 40, rotateZ: 0, duration: 1.2, ease: "power3.out" }, 2.2)
      .to(tokenMatrix, { opacity: 1, x: 0, y: 0, z: 50, duration: 1.2, ease: "power3.out" }, 2.5)
      .to([headerTag, logicTag], { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 2.8);

    // Step F: Micro Levitation Settle
    tl.to(
      [specimen, tokenMatrix],
      {
        y: (i) => (i === 0 ? -6 : 6),
        duration: 0.8,
        ease: "sine.inOut",
      },
      3.2
    );

    // Mouse Tilt Micro-Interaction
    if (!isMobile && board) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = board.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        gsap.to(board, {
          rotateX: (-mouseY / (rect.height / 2)) * 3,
          rotateY: (mouseX / (rect.width / 2)) * 4,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(board, {
          rotateX: 0,
          rotateY: 0,
          duration: 1.0,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      board.addEventListener("mousemove", handleMouseMove);
      board.addEventListener("mouseleave", handleMouseLeave);
    }
  }, container);

  return () => ctx.revert();
}