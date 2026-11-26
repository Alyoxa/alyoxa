import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createApproachScrollStory } from "./ApproachScrollStory";

gsap.registerPlugin(ScrollTrigger);

/** The original brand mark draws on as the process enters; copy stays independent. */
export function animateApproach(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add({
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 1101px)",
    cinematic: "(hover: hover) and (pointer: fine) and (min-width: 1101px) and (min-height: 760px)",
  }, (context) => {
    if (!context.conditions?.motion) return;
    const desktop = Boolean(context.conditions.desktop);
    const q = gsap.utils.selector(root);
    const timedReveals: gsap.core.Timeline[] = [];
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: q(".approach__intro")[0], start: "top 85%", toggleActions: "play none none none" },
    });
    intro.from(q(".approach__eyebrow"), { opacity: 0, y: 16, duration: .65 })
      .fromTo(q(".approach__heading > *"), {
        opacity: 0, yPercent: 65, rotation: 2, clipPath: "inset(0% -20% 100% -20%)",
      }, {
        opacity: 1, yPercent: 0, rotation: 0, clipPath: "inset(-30% -20% -30% -20%)",
        duration: 1.1, stagger: .15,
      }, .1)
      .from(q(".approach__description"), { opacity: 0, x: 30, duration: 1 }, .4)
      .from(q(".approach__intro-cross"), { opacity: 0, rotation: -90, scale: .3, duration: 1 }, .5);
    timedReveals.push(intro);

    const sculpture = q(".approach__sculpture")[0];
    const stage = q(".approach__stage")[0];
    // Timed drawing stays legible even when the visitor stops scrolling.
    const assembly = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: sculpture, start: "top 78%", toggleActions: "play none none none",
      },
    });
    const paths = Array.from(root.querySelectorAll<SVGPathElement>(".approach__brand-path"));
    paths.forEach(path => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, fillOpacity: 0 });
    });
    assembly.to(paths, { strokeDashoffset: 0, duration: 1.45, stagger: .1, ease: "power2.inOut" }, .05)
      .fromTo(q(".approach__brand-half--left"), { x: -9, y: 5, rotation: -7, svgOrigin: "40.49 29.5" }, { x: 0, y: 0, rotation: 0, duration: 1.6, ease: "power3.inOut" }, .15)
      .fromTo(q(".approach__brand-half--right"), { x: 9, y: 5, rotation: 7, svgOrigin: "40.49 29.5" }, { x: 0, y: 0, rotation: 0, duration: 1.6, ease: "power3.inOut" }, .25)
      .to(paths, { fillOpacity: 1, strokeOpacity: 0, duration: .8, stagger: .05 }, 1.05)
      .fromTo(q(".approach__brand-shine"), { x: 0, opacity: 0 }, { x: 140, opacity: 1, duration: 1.7, ease: "power2.inOut" }, 1.8)
      .to(q(".approach__brand-shine"), { opacity: 0, duration: .3 }, 3.25)
      .from(q(".approach__brand-shadow"), { scaleX: .6, opacity: 0, svgOrigin: "400 491", duration: 1.2 }, .65)
      .from(q(".approach__centre-caption > *"), { opacity: 0, y: 10, duration: .7, stagger: .1 }, 1.25);
    const linePaths = Array.from(root.querySelectorAll<SVGPathElement>(".approach__connectors path"));
    linePaths.forEach(path => {
      const length = path.getTotalLength();
      assembly.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, .7);
    });
    assembly.from(q(".approach__connectors circle"), { opacity: 0, duration: 1 }, 1.3);
    gsap.fromTo(q(".approach__ribbon--one"), { yPercent: 3 }, { yPercent: -5, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 1.2 } });
    gsap.fromTo(q(".approach__ribbon--two"), { yPercent: -3 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 1.2 } });
    timedReveals.push(assembly);

    // After assembly, the whole sculpture drifts subtly as the section leaves.
    // The wrapper owns this parallax, so it cannot overwrite the sheet transforms.
    gsap.fromTo(sculpture, { y: 0 }, {
      y: desktop ? -24 : -10, ease: "none",
      scrollTrigger: {
        trigger: desktop ? stage : sculpture,
        start: desktop ? "top 18%" : "bottom 65%", end: "bottom top",
        scrub: .8, invalidateOnRefresh: true,
      },
    });

    (q(".approach__step") as HTMLElement[]).forEach((step) => {
      const reveal = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: step, start: "top 88%", toggleActions: "play none none none" },
      });
      reveal.fromTo(step, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .85 })
        .from(step.querySelector(".approach__node"), { scale: 0, duration: .5, ease: "back.out(1.8)" }, .15)
        .from(step.querySelector(".approach__number"), { opacity: 0, y: 20, duration: .7 }, .05)
        .from(step.querySelectorAll("h3, .approach__step-details > p, .approach__deliverable"), { opacity: 0, y: 18, duration: .75, stagger: .1 }, .12);
      timedReveals.push(reveal);
      // Each node receives a quiet copper accent as its stage crosses the reading line.
      if (!context.conditions?.cinematic) gsap.fromTo(step.querySelector(".approach__node"), {
        backgroundColor: "#ffffff", borderColor: "#111111",
      }, {
        backgroundColor: "#d5a47c", borderColor: "#a36e45", duration: .3,
        scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse", onEnter: () => root.setAttribute("data-process-step", step.dataset.process ?? "discovery"), onEnterBack: () => root.setAttribute("data-process-step", step.dataset.process ?? "discovery") },
      });
    });

    if (context.conditions?.cinematic) createApproachScrollStory(root, stage);

    const footer = gsap.timeline({
      scrollTrigger: { trigger: q(".approach__footer")[0], start: "top 97%", toggleActions: "play none none none" },
    });
    footer.from(q(".approach__footer > p"), { opacity: 0, y: 15, duration: .7, ease: "power3.out" })
      .from(q(".approach__rule"), { scaleX: 0, transformOrigin: "left", duration: .9, ease: "power2.inOut" }, .1)
      .from(q(".approach__footer > a"), { opacity: 0, y: 15, duration: .7, stagger: .1 }, .25);
    timedReveals.push(footer);
    const showFocused = () => timedReveals.forEach((timeline) => timeline.progress(1));
    root.addEventListener("focusin", showFocused);
    return () => { root.removeAttribute("data-process-step"); root.removeEventListener("focusin", showFocused); };
  });
  root.removeAttribute("data-motion-pending");
  return () => media.revert();
}
