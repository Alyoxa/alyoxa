import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTRO_DONE, INTRO_START } from "@/components/motion/Preloader/introState";

gsap.registerPlugin(ScrollTrigger);

/** Keep the white headline clipped to the actual transformed Lacuna frame. */
function syncHeadlineMask(root: HTMLElement) {
  const card = root.querySelector<HTMLElement>(".hero__project--lacuna");
  const mask = root.querySelector<HTMLElement>(".hero__headline-mask");
  if (!card || !mask) return { update: () => {}, cleanup: () => {} };
  const previousClip = mask.style.clipPath;
  const update = () => {
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const style = getComputedStyle(card);
    const matrix = new DOMMatrixReadOnly(style.transform === "none" ? undefined : style.transform);
    const [originX, originY] = style.transformOrigin.split(" ").map(Number.parseFloat);
    const points = [[width * .07, 0], [width, 0], [width * .93, height], [0, height]];
    mask.style.clipPath = `polygon(${points.map(([x, y]) => {
      const localX = x - originX;
      const localY = y - originY;
      return `${card.offsetLeft + originX + matrix.a * localX + matrix.c * localY + matrix.e}px ${card.offsetTop + originY + matrix.b * localX + matrix.d * localY + matrix.f}px`;
    }).join(",")})`;
  };
  update();
  const observer = new ResizeObserver(update);
  observer.observe(root);
  observer.observe(card);
  return { update, cleanup: () => { observer.disconnect(); mask.style.clipPath = previousClip; } };
}

export function animateHero(root: HTMLElement) {
  const maskSync = syncHeadlineMask(root);
  const media = gsap.matchMedia();
  media.add({
    motion: "(prefers-reduced-motion: no-preference)",
    pointer: "(hover: hover) and (pointer: fine) and (min-width: 701px)",
  }, (context) => {
    if (!context.conditions?.motion) return;
    const q = gsap.utils.selector(root);
    const blackLines = q(".hero__headline:not(.hero__headline--white) .hero__title-line");
    const whiteLines = q(".hero__headline--white .hero__title-line");
    const cards = q(".hero__project") as HTMLElement[];
    const mask = q(".hero__headline-mask")[0];
    const waitingForIntro = document.documentElement.dataset.alyoxaIntro === "pending";
    const intro = gsap.timeline({ defaults: { ease: "power3.out" }, paused: waitingForIntro, delay: waitingForIntro ? 0 : .08, onUpdate: maskSync.update, onComplete: maskSync.update });
    intro.from(q(".hero__eyebrow, .hero__studio-note"), { opacity: 0, y: 12, duration: .7 }, 0)
      .from(q(".hero__cross"), { opacity: 0, scale: .3, rotation: -90, duration: 1, stagger: .12 }, .15);
    // Both copies share each tween so the overlapping typography never separates.
    blackLines.forEach((line, index) => {
      intro.fromTo([line, whiteLines[index]].filter(Boolean), {
        opacity: 0, yPercent: 80, clipPath: "inset(0% -15% 100% -15%)",
      }, {
        opacity: 1, yPercent: 0, clipPath: "inset(-25% -15% -25% -15%)",
        duration: 1.1,
      }, .2 + index * .14);
    });
    cards.forEach((card, index) => {
      const finalRotation = Number(gsap.getProperty(card, "rotation"));
      const finalSkewX = Number(gsap.getProperty(card, "skewX"));
      const finalSkewY = Number(gsap.getProperty(card, "skewY"));
      const mobile = root.clientWidth <= 700;
      const deckWidth = () => Math.min(root.clientWidth * (mobile ? .64 : .27), 360);
      const deckHeight = () => deckWidth() * .7;
      const deckX = () => root.clientWidth * (mobile ? .53 : .59) - card.offsetLeft - card.offsetWidth / 2;
      const deckY = () => root.clientHeight * (mobile ? .48 : .43) - card.offsetTop - card.offsetHeight / 2;
      const turn = [-9, 3, 12][index];
      const direction = index % 2 === 0 ? -1 : 1;
      intro.fromTo(card, {
        x: () => deckX() + index * 8, y: () => deckY() + index * 7,
        scaleX: () => deckWidth() / card.offsetWidth,
        scaleY: () => deckHeight() / card.offsetHeight,
        rotation: turn, skewX: 0, skewY: 0, opacity: 0,
      }, { opacity: 1, duration: .35 }, .15 + index * .07)
        // A short two-beat shuffle, followed by a measured deal to each CSS frame.
        .to(card, { x: () => deckX() + direction * deckWidth() * .23, y: () => deckY() - 18 + index * 12, rotation: turn + direction * 9, duration: .38, ease: "power2.inOut" }, .5 + index * .045)
        .to(card, { x: () => deckX() - direction * 12, y: () => deckY() + index * 6, rotation: turn * .6, duration: .36, ease: "power2.inOut" }, .88 + index * .045)
        .to(card, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: finalRotation, skewX: finalSkewX, skewY: finalSkewY, duration: 1.35, ease: "power3.inOut" }, 1.22 + index * .12)
        .from(card.querySelector(".hero__project-media"), { scale: 1.12, duration: 2.3 }, .2)
        .from(card.querySelector(".hero__project-info"), { opacity: 0, y: 12, duration: .65 }, 1.75 + index * .12);
    });
    if (mask) intro.from(mask, { opacity: 0, duration: .5 }, 1.65);
    intro.from(q(".hero__copper"), { opacity: 0, scale: .3, duration: 1.1, ease: "back.out(1.6)" }, 1.1)
      .from(q(".hero__description"), { opacity: 0, y: 18, duration: .85 }, 1)
      .from(q(".hero__actions > *"), { opacity: 0, y: 16, duration: .75, stagger: .12 }, 1.2)
      .from(q(".hero__bottom > *"), { opacity: 0, y: 12, duration: .8, stagger: .08 }, 1.45);

    const startIntro = () => { if (intro.paused() && document.documentElement.dataset.alyoxaIntro === "ready") intro.play(0); };
    const introState = new MutationObserver(() => {
      if (document.documentElement.dataset.alyoxaIntro === "pending") intro.pause(0);
    });
    introState.observe(document.documentElement, { attributes: true, attributeFilter: ["data-alyoxa-intro"] });
    window.addEventListener(INTRO_START, startIntro);
    window.addEventListener(INTRO_DONE, startIntro);

    // Ambient motion pauses when the hero or tab is out of view.
    const trace = root.querySelector<SVGPathElement>(".hero__orbit-trace");
    const orbit = gsap.timeline({ repeat: -1, repeatDelay: 1.8, paused: true });
    if (trace) {
      const length = trace.getTotalLength();
      orbit.fromTo(trace, { strokeDasharray: `${length * .18} ${length}`, strokeDashoffset: length, opacity: 0 }, { strokeDashoffset: 0, opacity: .9, duration: 5.5, ease: "power1.inOut" })
        .to(trace, { opacity: 0, duration: .8 });
    }
    let inView = true;
    const updateAmbient = () => {
      if (inView && !document.hidden && document.documentElement.dataset.alyoxaIntro !== "pending") orbit.play();
      else orbit.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateAmbient(); });
    observer.observe(root);
    document.addEventListener("visibilitychange", updateAmbient);
    window.addEventListener(INTRO_START, updateAmbient);
    window.addEventListener(INTRO_DONE, updateAmbient);
    updateAmbient();

    // The copper sphere travels the orbit: behind the cards on the upper arc, in front on the lower arc.
    let removeSphere = () => {};
    const orbitPath = root.querySelector<SVGPathElement>(".hero__orbit-base");
    const orbitSvg = orbitPath?.ownerSVGElement;
    const copperOrbit = root.querySelector<HTMLElement>(".hero__copper-orbit");
    const copper = copperOrbit?.querySelector<HTMLElement>(".hero__copper");
    const composition = root.querySelector<HTMLElement>(".hero__composition");
    if (orbitPath && orbitSvg && copperOrbit && copper && composition) {
      const length = orbitPath.getTotalLength();
      const box = orbitPath.getBBox();
      // Start at the orbit's lowest point, close to where the sphere used to rest.
      let progress = 0, lowest = -Infinity;
      for (let i = 0; i < 48; i++) {
        const p = orbitPath.getPointAtLength((length * i) / 48);
        if (p.y > lowest) { lowest = p.y; progress = i / 48; }
      }
      const sphereMotion = { speed: 0 };
      intro.to(sphereMotion, { speed: 1, duration: 3, ease: "power1.in" }, 1.8);
      // The orbit SVG and the composition move together, so their mapping only changes on resize.
      const map = { ox: 0, oy: 0, sx: 1, sy: 1, half: 0 };
      const measure = () => {
        const s = orbitSvg.getBoundingClientRect(), c = composition.getBoundingClientRect(), vb = orbitSvg.viewBox.baseVal;
        map.ox = s.left - c.left - vb.x * (s.width / vb.width);
        map.oy = s.top - c.top - vb.y * (s.height / vb.height);
        map.sx = s.width / vb.width;
        map.sy = s.height / vb.height;
        map.half = copper.offsetWidth / 2;
        copper.style.margin = `${-map.half}px 0 0 ${-map.half}px`; // centre the sphere on the wrapper's origin
      };
      let front: boolean | null = null;
      const place = () => {
        const p = orbitPath.getPointAtLength(length * progress);
        const near = (p.y - box.y) / box.height; // 0 = far side (top), 1 = near side (bottom)
        copperOrbit.style.transform = `translate3d(${(map.ox + p.x * map.sx).toFixed(1)}px, ${(map.oy + p.y * map.sy).toFixed(1)}px, 0) scale(${(.72 + .38 * near).toFixed(3)})`;
        copperOrbit.style.setProperty("--shade", ((1 - near) * .4).toFixed(3));
        const isFront = near > .42;
        if (isFront !== front) { front = isFront; copperOrbit.style.zIndex = isFront ? "8" : "2"; }
      };
      copperOrbit.classList.add("is-orbiting");
      measure();
      place();
      const resize = new ResizeObserver(() => { measure(); place(); });
      resize.observe(composition);
      const tick = (_time: number, deltaMs: number) => {
        if (!inView || document.hidden || sphereMotion.speed === 0) return;
        progress = (progress + (Math.min(deltaMs / 1000, .05) * sphereMotion.speed) / 46) % 1; // one lap ≈ 46s
        place();
      };
      gsap.ticker.add(tick);
      removeSphere = () => {
        gsap.ticker.remove(tick);
        resize.disconnect();
        copperOrbit.classList.remove("is-orbiting");
        copperOrbit.style.transform = "";
        copperOrbit.style.zIndex = "";
        copperOrbit.style.removeProperty("--shade");
        copper.style.margin = "";
      };
    }

    q(".hero__project-media > img").forEach((image: HTMLElement, index: number) => {
      gsap.fromTo(image, { yPercent: -2 }, {
        yPercent: index === 0 ? 4 : 7, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: .9 },
      });
    });
    const removeListeners: (() => void)[] = [];
    if (context.conditions?.pointer) {
      cards.forEach((card) => {
        const artwork = card.querySelector(".hero__project-media");
        const x = gsap.quickTo(artwork, "--hero-art-x", { duration: .9, ease: "power3.out" });
        const y = gsap.quickTo(artwork, "--hero-art-y", { duration: .9, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const bounds = card.getBoundingClientRect();
          x(gsap.utils.clamp(-9, 9, (event.clientX - bounds.left - bounds.width / 2) * -.035));
          y(gsap.utils.clamp(-7, 7, (event.clientY - bounds.top - bounds.height / 2) * -.035));
        };
        const reset = () => { x(0); y(0); };
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
    const revealFocused = () => intro.progress(1);
    root.addEventListener("focusin", revealFocused);
    return () => {
      introState.disconnect();
      window.removeEventListener(INTRO_START, startIntro);
      window.removeEventListener(INTRO_DONE, startIntro);
      window.removeEventListener(INTRO_START, updateAmbient);
      window.removeEventListener(INTRO_DONE, updateAmbient);
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateAmbient);
      root.removeEventListener("focusin", revealFocused);
      removeListeners.forEach((remove) => remove());
      removeSphere();
    };
  });
  root.removeAttribute("data-motion-pending");
  return () => { media.revert(); maskSync.cleanup(); };
}
