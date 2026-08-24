import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initDigitalExperienceAnimation(container: HTMLElement): () => void {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 768;

  const ctx = gsap.context(() => {
    // Left Side Elements
    const meta = container.querySelector<HTMLElement>('[data-de="meta"]');
    const headlineLines = container.querySelectorAll<HTMLElement>('[data-de="headline-line"]');
    const divider = container.querySelector<HTMLElement>('[data-de="divider"]');
    const description = container.querySelector<HTMLElement>('[data-de="description"]');
    const capabilitiesTitle = container.querySelector<HTMLElement>('[data-de="capabilities-title"]');
    const capabilitiesList = container.querySelectorAll<HTMLElement>('[data-de="capability-item"]');
    const footer = container.querySelector<HTMLElement>('[data-de="footer"]');

    // Right Visual Layers
    const canvas = container.querySelector<HTMLElement>('[data-de="canvas"]');
    const layer1Grid = container.querySelector<HTMLElement>('[data-layer="01"]');
    const layer2Desktop = container.querySelector<HTMLElement>('[data-layer="02"]');
    const layer2HeaderDots = container.querySelectorAll<HTMLElement>('[data-de="header-dot"]');
    const layer2HeaderTitle = container.querySelector<HTMLElement>('[data-de="header-title"]');
    const layer2HeaderGrid = container.querySelector<HTMLElement>('[data-de="header-grid"]');
    
    // Layer 02 Internal UI Content
    const uiModuleLabel = container.querySelector<HTMLElement>('[data-de="ui-module-label"]');
    const uiHeadline = container.querySelector<HTMLElement>('[data-de="ui-headline"]');
    const uiDescription = container.querySelector<HTMLElement>('[data-de="ui-desc"]');
    const uiButtons = container.querySelectorAll<HTMLElement>('[data-de="ui-btn"]');
    
    // Layer 02 Metric Node
    const metricNode = container.querySelector<HTMLElement>('[data-de="metric-node"]');
    const metricBar = container.querySelector<HTMLElement>('[data-de="metric-bar"]');

    // Layer 03 Mobile, Layer 04 Token, Layer 05 Annotations
    const layer3Mobile = container.querySelector<HTMLElement>('[data-layer="03"]');
    const mobileInnerItems = container.querySelectorAll<HTMLElement>('[data-de="mobile-inner"]');
    const layer4Token = container.querySelector<HTMLElement>('[data-layer="04"]');
    const layer5Annotations = container.querySelectorAll<HTMLElement>('[data-de="annotation"]');

    if (isReducedMotion) return;

    // 1. Perspective Setup for 3D Layering
    if (canvas) {
      gsap.set(canvas, { perspective: 1200, transformStyle: "preserve-3d" });
    }

    // 2. High-Impact Initial 3D States
    gsap.set(meta, { opacity: 0, y: 20, filter: "blur(4px)" });
    gsap.set(headlineLines, { opacity: 0, y: isMobile ? 35 : 70, rotateX: -15, transformOrigin: "top left" });
    gsap.set(divider, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(description, { opacity: 0, y: 35, filter: "blur(4px)" });
    gsap.set(capabilitiesTitle, { opacity: 0, y: 20 });
    gsap.set(capabilitiesList, { opacity: 0, x: -15 });
    gsap.set(footer, { opacity: 0, y: 20 });

    gsap.set(canvas, { opacity: 0, scale: 0.9, rotateX: 8, rotateY: -12 });
    gsap.set(layer1Grid, { opacity: 0, scale: 1.1, z: -50 });
    gsap.set(layer2Desktop, { opacity: 0, scale: 0.9, y: 50, z: 20, rotateX: 6 });
    gsap.set([layer2HeaderDots, layer2HeaderTitle, layer2HeaderGrid], { opacity: 0, y: 12 });
    gsap.set([uiModuleLabel, uiHeadline, uiDescription, uiButtons], { opacity: 0, y: 25, filter: "blur(4px)" });
    gsap.set(metricNode, { opacity: 0, scale: 0.7, y: 20, z: 60 });
    gsap.set(metricBar, { scaleX: 0, transformOrigin: "left center" });

    gsap.set(layer3Mobile, { opacity: 0, x: isMobile ? 30 : 90, y: isMobile ? 30 : 60, scale: 0.85, z: 100, rotateY: -15 });
    gsap.set(mobileInnerItems, { opacity: 0, y: 15 });
    gsap.set(layer4Token, { opacity: 0, y: -40, scale: 0.7, z: 140, rotateZ: -12 });
    gsap.set(layer5Annotations, { opacity: 0, scale: 0.8, y: 15 });

    // 3. Pinned Master Scroll Sequence
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

    // Step A: Canvas & Grid Initialization
    tl.to(canvas, { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.5, ease: "power3.out" }, 0)
      .to(layer1Grid, { opacity: 0.3, scale: 1, z: 0, duration: 1.2 }, 0.2);

    // Step B: Left Editorial Cascade with Blurs
    tl.to(meta, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.4)
      .to(headlineLines, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, stagger: 0.18, ease: "power4.out" }, 0.6)
      .to(divider, { opacity: 1, scaleX: 1, duration: 0.9, ease: "expo.out" }, 1.1)
      .to(description, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 }, 1.3)
      .to(capabilitiesTitle, { opacity: 1, y: 0, duration: 0.6 }, 1.6)
      .to(capabilitiesList, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power2.out" }, 1.8)
      .to(footer, { opacity: 1, y: 0, duration: 0.7 }, 2.2);

    // Step C: 3D Desktop UI Assembly
    tl.to(layer2Desktop, { opacity: 1, scale: 1, y: 0, z: 0, rotateX: 0, duration: 1.8, ease: "power3.out" }, 0.5)
      .to(layer2HeaderDots, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6 }, 1.0)
      .to([layer2HeaderTitle, layer2HeaderGrid], { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 1.2)
      .to(uiModuleLabel, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, 1.4)
      .to(uiHeadline, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 1.6)
      .to(uiDescription, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 }, 1.8)
      .to(uiButtons, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 2.0);

    // Step D: Floating 3D Node & Metric Fill
    tl.to(metricNode, { opacity: 1, scale: 1, y: 0, z: 40, duration: 1.0, ease: "back.out(1.7)" }, 2.1)
      .to(metricBar, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 2.4);

    // Step E: Overlapping Floating Mobile Frame
    tl.to(layer3Mobile, { opacity: 1, x: 0, y: 0, scale: 1, z: 60, rotateY: 0, duration: 1.8, ease: "power3.out" }, 2.6)
      .to(mobileInnerItems, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 }, 3.1);

    // Step F: Floating Design Token & Technical Annotations
    tl.to(layer4Token, { opacity: 1, y: 0, scale: 1, z: 90, rotateZ: 0, duration: 1.1, ease: "back.out(1.5)" }, 3.2)
      .to(layer5Annotations, { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.8 }, 3.5);

    // Step G: Micro Levitation Settle
    tl.to(
      [layer2Desktop, layer3Mobile, layer4Token],
      {
        y: (i) => (i === 1 ? -6 : i === 2 ? 8 : -2),
        duration: 0.8,
        ease: "sine.inOut",
      },
      4.0
    );

    // 4. Smooth Desktop Interactive Tilt
    if (!isMobile && canvas) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        gsap.to(canvas, {
          rotateX: (-mouseY / (rect.height / 2)) * 3,
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