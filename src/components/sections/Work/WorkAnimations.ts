import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** CSS retains the card skew; motion uses independent custom properties. */
export function animateWork(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add({
    motion: "(prefers-reduced-motion: no-preference)",
    pointer: "(hover: hover) and (pointer: fine) and (min-width: 701px)",
  }, (context) => {
    if (!context.conditions?.motion) return;
    const q = gsap.utils.selector(root);
    const cards = q(".work__project:not(.card-dialog__ghost)") as HTMLElement[];
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none none" },
    });
    intro.from(q(".work__eyebrow"), { autoAlpha: 0, y: 15, duration: .6 })
      .from(q(".work__heading > .section-heading__line"), {
        autoAlpha: 0, yPercent: 70, rotation: 3,
        clipPath: "inset(0% -20% 100% -20%)",
        duration: 1.1, stagger: .12,
      }, .1)
      .from(q(".work__description"), { autoAlpha: 0, x: 28, duration: .9 }, .45)
      .from(q(".work__intro-cross"), { autoAlpha: 0, rotation: -90, scale: .3, duration: 1 }, .6);

    const orbit = root.querySelector<SVGPathElement>(".work__orbit path");
    const stage = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: q(".work__stage")[0], start: "top 88%", toggleActions: "play none none none" },
    });
    if (orbit) {
      const length = orbit.getTotalLength();
      stage.fromTo(orbit, { strokeDasharray: length, strokeDashoffset: length }, {
        strokeDashoffset: 0, duration: 2.1, ease: "power2.inOut",
      }, 0);
    }
    // Centre first; the smaller cards follow to assemble the composition.
    [cards[1], cards[0], cards[2]].filter(Boolean).forEach((card, index) => {
      stage.fromTo(card, {
        "--work-enter-opacity": 0, "--work-enter-y": "100px",
        "--work-enter-turn": `${index === 1 ? -6 : 6}deg`, "--work-enter-scale": .88,
      }, {
        "--work-enter-opacity": 1, "--work-enter-y": "0px", "--work-enter-turn": "0deg",
        "--work-enter-scale": 1, duration: 1.35,
      }, .15 + index * .17);
      stage.from(card.querySelector(".work__project-content"), {
        opacity: 0, y: 16, duration: .65,
      }, .8 + index * .17);
    });
    stage.from(q(".work__glass"), { autoAlpha: 0, y: 36, duration: 1.2, stagger: .14 }, .8)
      .from(q(".work__cross"), { autoAlpha: 0, rotation: -90, scale: .3, duration: 1, stagger: .12 }, .7)
      .from(q(".work__sphere"), { autoAlpha: 0, y: -35, scale: .4, duration: 1.2, ease: "bounce.out" }, 1);

    const footer = gsap.timeline({
      scrollTrigger: { trigger: q(".work__footer")[0], start: "top 97%", toggleActions: "play none none none" },
    });
    footer.from(q(".work__filter"), { autoAlpha: 0, y: 14, duration: .55, stagger: .055, ease: "power3.out" })
      .from(q(".work__footer-rule"), { scaleX: 0, transformOrigin: "left", duration: .8 }, .15)
      .from(q(".work__footer-actions"), { autoAlpha: 0, y: 15, duration: .7 }, .2);

    // Keyboard navigation never waits for a reveal to finish.
    const revealFocusedContent = () => { intro.progress(1); stage.progress(1); footer.progress(1); };
    root.addEventListener("focusin", revealFocusedContent);
    const removeListeners: (() => void)[] = [];
    if (context.conditions.pointer) {
      cards.forEach((card) => {
        const x = gsap.quickTo(card, "--work-hover-x", { duration: .65, ease: "power3.out" });
        const y = gsap.quickTo(card, "--work-hover-y", { duration: .65, ease: "power3.out" });
        const turn = gsap.quickTo(card, "--work-hover-turn", { duration: .65, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch" || !stage.progress() || card.inert) return;
          const bounds = card.getBoundingClientRect();
          const horizontal = (event.clientX - bounds.left) / bounds.width - .5;
          const vertical = (event.clientY - bounds.top) / bounds.height - .5;
          x(horizontal * 12); y(vertical * 10 - 6); turn(horizontal * 1.5);
        };
        const reset = () => { x(0); y(0); turn(0); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", reset);
        card.addEventListener("pointercancel", reset);
        removeListeners.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", reset);
          card.removeEventListener("pointercancel", reset);
        });
      });
    }
    return () => {
      root.removeEventListener("focusin", revealFocusedContent);
      removeListeners.forEach((remove) => remove());
    };
  });
  root.removeAttribute("data-motion-pending");
  return () => media.revert();
}

export function animateWorkFilter(root: HTMLElement, visibleIds: string[]) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>(".work__project:not(.card-dialog__ghost)"));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const timeline = gsap.timeline();
  cards.forEach((card) => {
    const visible = visibleIds.includes(card.dataset.project ?? "");
    gsap.killTweensOf(card, "--work-filter-opacity,--work-filter-y,--work-filter-scale");
    timeline.to(card, {
      "--work-filter-opacity": visible ? 1 : 0,
      "--work-filter-y": visible ? "0px" : "20px",
      "--work-filter-scale": visible ? 1 : .94,
      duration: reduced ? 0 : .45,
      ease: "power3.out", overwrite: "auto",
    }, 0);
  });
  return () => { timeline.kill(); };
}
