import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createApproachScrollStory } from "./ApproachScrollStory";

gsap.registerPlugin(ScrollTrigger);

/** Scroll controls the sculpture; text reveals independently to stay readable. */
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
    // The assembly happens before the desktop reading hold.
    // Small screens retain natural scrolling above the text timeline.
    const assembly = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: desktop ? stage : sculpture,
        start: "top 95%", end: desktop ? "top 18%" : "bottom 65%",
        scrub: desktop ? .85 : .45,
        invalidateOnRefresh: true,
      },
    });
    const layers = [
      { selector: ".approach__layer--back", x: 75, y: 65, turn: 8 },
      { selector: ".approach__layer--base", x: -45, y: 90, turn: -6 },
      { selector: ".approach__layer--middle", x: 45, y: -45, turn: 5 },
      { selector: ".approach__layer--front", x: -65, y: -75, turn: -7 },
    ];
    layers.forEach((layer, index) => {
      assembly.fromTo(q(layer.selector), {
        x: layer.x * (desktop ? 1 : .55), y: layer.y * (desktop ? 1 : .55),
        rotation: layer.turn, scale: .94, opacity: .15, svgOrigin: "400 305",
      }, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: .65 }, index * .09);
    });
    assembly.from(q(".approach__sphere"), { opacity: 0, y: -32, scale: .3, svgOrigin: "541 529", duration: .35, ease: "back.out(1.5)" }, .65)
      .from(q(".approach__cross"), { opacity: 0, rotation: -90, scale: .5, duration: .45, stagger: .1 }, .25);

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
      reveal.from(step.querySelector(".approach__node"), { scale: 0, duration: .5, ease: "back.out(1.8)" })
        .from(step.querySelector(".approach__number"), { opacity: 0, y: 20, duration: .7 }, .05)
        .from(step.querySelectorAll("h3, .approach__step-copy > p, .approach__deliverable"), { opacity: 0, y: 18, duration: .75, stagger: .1 }, .12);
      timedReveals.push(reveal);
      // Each node receives a quiet copper accent as its stage crosses the reading line.
      if (!context.conditions?.cinematic) gsap.fromTo(step.querySelector(".approach__node"), {
        backgroundColor: "#ffffff", borderColor: "#111111",
      }, {
        backgroundColor: "#d5a47c", borderColor: "#a36e45", duration: .3,
        scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse" },
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
