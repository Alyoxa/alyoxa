import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each composition assembles from its own directions; the final CSS pose is retained.
const entrances: Record<string, { x: number; y: number; turn: number; depth: number }[]> = {
  brand: [{ x: -65, y: 90, turn: -12, depth: -100 }, { x: 95, y: 60, turn: 17, depth: 90 }, { x: 30, y: -75, turn: -14, depth: 55 }, { x: -40, y: 45, turn: -5, depth: 0 }],
  digital: [{ x: -90, y: 65, turn: -11, depth: -100 }, { x: 100, y: 105, turn: 20, depth: 100 }, { x: -45, y: 45, turn: -5, depth: 0 }, { x: 60, y: -40, turn: 12, depth: 40 }],
  product: [{ x: -50, y: -25, turn: -5, depth: 0 }, { x: -65, y: 95, turn: -12, depth: -80 }, { x: 105, y: 30, turn: 18, depth: 90 }, { x: 35, y: 80, turn: 10, depth: 40 }],
  technology: [{ x: 0, y: 110, turn: -20, depth: -170 }, { x: -75, y: -30, turn: -12, depth: 0 }, { x: 85, y: -20, turn: 14, depth: 0 }, { x: -60, y: 65, turn: -10, depth: 25 }, { x: 60, y: 75, turn: 9, depth: 25 }],
};

function ambientMotion(visual: HTMLElement, id: string) {
  const timeline = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "sine.inOut" } });
  if (id === "brand") {
    timeline.to(visual.querySelectorAll(".scene-brand__palette i"), { y: -5, duration: 1.5, stagger: .13, repeat: 1, yoyo: true }, 0)
      .to(visual.querySelector(".scene-brand__type > div"), { y: -5, duration: 3.2, repeat: 1, yoyo: true }, 0);
  } else if (id === "digital") {
    timeline.to(visual.querySelector(".scene-digital__ribbon"), { rotation: -7, y: 10, duration: 4, repeat: 1, yoyo: true }, 0)
      .to(visual.querySelector(".scene-digital__cursor svg"), { x: 9, y: -10, duration: 2, repeat: 1, yoyo: true }, .4)
      .to(visual.querySelector(".scene-digital__phone-wave"), { x: -6, duration: 3.3, repeat: 1, yoyo: true }, .5);
  } else if (id === "product") {
    timeline.to(visual.querySelectorAll(".scene-product__flow i"), { x: 4, opacity: .4, duration: 1.2, stagger: .2, repeat: 1, yoyo: true }, 0)
      .to(visual.querySelector(".scene-product__play"), { scale: 1.12, duration: 2, repeat: 1, yoyo: true }, .3);
  } else {
    timeline.to(visual.querySelector(".scene-tech__sculpture"), { y: -8, rotation: 4, duration: 3.7, repeat: 1, yoyo: true }, 0)
      .fromTo(visual.querySelector(".scene-tech__signal"), { strokeDashoffset: 800, opacity: .25 }, { strokeDashoffset: 0, opacity: 1, duration: 2.8, ease: "power1.inOut" }, .3)
      .to(visual.querySelector(".scene-tech__signal"), { opacity: 0, duration: .7 }, 3.5)
      .to(visual.querySelector(".scene-tech__status"), { opacity: .4, scale: .7, duration: 1.7, repeat: 1, yoyo: true }, .5);
  }
  return timeline;
}

function addCapabilityResponse(timeline: gsap.core.Timeline, visual: HTMLElement, id: string, index: number) {
  const selectors: Record<string, string[]> = {
    brand: [".scene-brand__position p", ".scene-brand__word", ".scene-brand__type > div", ".scene-brand__palette i"],
    digital: [".scene-digital__headline", ".scene-digital__connection > span", ".scene-digital__cursor svg", ".scene-digital__phone-content > p"],
    product: [".scene-product__flow > span", ".scene-product__stats > div", ".scene-product__play", ".scene-product__components > div > *"],
    technology: [".scene-tech__node--one .scene-tech__node-icon", ".scene-tech__sculpture i", ".scene-tech__signal", ".scene-tech__node--three .scene-tech__node-icon"],
  };
  const targets = visual.querySelectorAll(selectors[id][index]);
  if (id === "technology" && index === 2) {
    timeline.fromTo(targets, { strokeDashoffset: 800, opacity: .3 }, { strokeDashoffset: 0, opacity: 1, duration: 1.1, ease: "power2.inOut" }, 0);
  } else if ((id === "brand" && index === 3) || (id === "product" && (index === 0 || index === 3))) {
    timeline.fromTo(targets, { y: 13, opacity: .35 }, { y: 0, opacity: 1, duration: .65, stagger: .07, ease: "power3.out" }, .08);
  } else {
    timeline.fromTo(targets, { scale: .92, opacity: .45 }, { scale: 1, opacity: 1, duration: .8, ease: "power3.out" }, .08);
  }
}

export function animateServiceStudies(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1001px) and (hover: hover) and (pointer: fine)" }, context => {
    if (!context.conditions?.motion) return;
    const desktop = Boolean(context.conditions.desktop);
    const cleanups: (() => void)[] = [];
    root.querySelectorAll<HTMLElement>(".service-study").forEach(chapter => {
      const visual = chapter.querySelector<HTMLElement>(".service-study__visual")!;
      const depth = visual.querySelector<HTMLElement>(".service-study__scene-depth")!;
      const pointer = visual.querySelector<HTMLElement>(".service-study__scene-pointer")!;
      const parts = Array.from(visual.querySelectorAll<HTMLElement>(".scene-entry"));
      const buttons = Array.from(chapter.querySelectorAll<HTMLButtonElement>(".service-study__capabilities button"));
      const note = chapter.querySelector(".service-study__note");
      const id = chapter.id;
      const amount = desktop ? 1 : .55;
      let entered = false;
      let active = false;
      let responding = false;
      let response: gsap.core.Timeline | undefined;
      const ambient = ambientMotion(visual, id);
      const syncAmbient = () => {
        const running = entered && active && !responding && !document.hidden;
        if (running) ambient.play(); else ambient.pause();
        visual.dataset.live = String(running);
      };

      const entry = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: chapter, start: "top 90%", toggleActions: "play none none none" },
        onComplete: () => { entered = true; syncAmbient(); },
      });
      entry.fromTo(chapter.querySelector(".service-study__top"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .8 }, 0);
      parts.forEach((part, index) => {
        const pose = entrances[id][index];
        const rotation = Number(gsap.getProperty(part, "rotation"));
        entry.fromTo(part, {
          x: pose.x * amount, y: pose.y * amount, z: pose.depth * amount,
          rotation: rotation + pose.turn * amount, rotationX: desktop ? 18 : 0,
          transformPerspective: 900, scale: .84, opacity: 0,
        }, { x: 0, y: 0, z: 0, rotation, rotationX: 0, scale: 1, opacity: 1, duration: 1.55 }, .12 + index * .12);
      });
      entry.fromTo(chapter.querySelectorAll(".service-study__kicker, .service-study__content h2, .service-study__phrase, .service-study__description"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, stagger: .1 }, .22)
        .fromTo(buttons, { x: desktop ? 28 : 14, opacity: 0 }, { x: 0, opacity: 1, duration: .8, stagger: .08 }, .55)
        .fromTo(chapter.querySelectorAll(".service-study__note, .service-study__outcome, .service-study__content > :last-child"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .08 }, .9);

      // Scroll, pointer, entry, and capability feedback each own a separate layer.
      // No pinning and no repeated layout reads during scrolling.
      gsap.timeline({ scrollTrigger: { trigger: visual, start: "top 95%", end: "bottom 5%", scrub: 1.15 } })
        .fromTo(depth, { yPercent: desktop ? 4 : 1.5, rotationX: desktop ? 3 : 0, rotationY: desktop ? -2 : 0, transformPerspective: 1100 }, { yPercent: desktop ? -4 : -1.5, rotationX: desktop ? -3 : 0, rotationY: desktop ? 2 : 0, duration: 1, ease: "none" }, 0)
        .fromTo(chapter.querySelector(".service-study__progress > span"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "none" }, 0);
      ScrollTrigger.create({ trigger: visual, start: "top bottom", end: "bottom top", onToggle: self => { active = self.isActive; syncAmbient(); } });

      const respond = context.add(`respond-${id}`, (index: number) => {
        entry.progress(1);
        response?.progress(1).kill();
        responding = true;
        syncAmbient();
        gsap.set(parts, { scale: 1, z: 0 });
        const target = visual.querySelector(`[data-study-part="${index}"]`);
        response = gsap.timeline({ onComplete: () => { responding = false; syncAmbient(); } });
        response.to(target, { scale: 1.045, z: desktop ? 20 : 0, duration: .4, ease: "power2.out" }, 0)
          .to(target, { scale: 1, z: 0, duration: .8, ease: "power3.out" }, .4)
          .fromTo(note, { opacity: 0, y: 9 }, { opacity: 1, y: 0, duration: .65, ease: "power3.out" }, .02);
        addCapabilityResponse(response, visual, id, index);
      });
      const click = (event: MouseEvent) => {
        if (!(event.target instanceof Element)) return;
        const button = event.target.closest("button");
        const index = buttons.indexOf(button as HTMLButtonElement);
        if (index !== -1) respond(index);
      };
      const revealFocus = () => entry.progress(1);
      chapter.addEventListener("click", click);
      chapter.addEventListener("focusin", revealFocus);
      document.addEventListener("visibilitychange", syncAmbient);
      cleanups.push(() => {
        response?.kill();
        chapter.removeEventListener("click", click);
        chapter.removeEventListener("focusin", revealFocus);
        document.removeEventListener("visibilitychange", syncAmbient);
        delete visual.dataset.live;
      });

      if (desktop) {
        const tiltX = gsap.quickTo(pointer, "rotationX", { duration: .95, ease: "power3.out" });
        const tiltY = gsap.quickTo(pointer, "rotationY", { duration: .95, ease: "power3.out" });
        gsap.set(pointer, { transformPerspective: 1000 });
        let bounds: DOMRect | undefined;
        const invalidate = () => { bounds = undefined; };
        const move = (event: PointerEvent) => {
          if (!bounds) bounds = visual.getBoundingClientRect();
          tiltY(((event.clientX - bounds.left) / bounds.width - .5) * 9);
          tiltX(-((event.clientY - bounds.top) / bounds.height - .5) * 7);
        };
        const leave = () => { tiltX(0); tiltY(0); bounds = undefined; };
        visual.addEventListener("pointermove", move, { passive: true });
        visual.addEventListener("pointerleave", leave);
        window.addEventListener("scroll", invalidate, { passive: true });
        window.addEventListener("resize", invalidate);
        cleanups.push(() => {
          visual.removeEventListener("pointermove", move);
          visual.removeEventListener("pointerleave", leave);
          window.removeEventListener("scroll", invalidate);
          window.removeEventListener("resize", invalidate);
        });
      }
    });
    return () => cleanups.forEach(cleanup => cleanup());
  });
  return () => media.revert();
}
