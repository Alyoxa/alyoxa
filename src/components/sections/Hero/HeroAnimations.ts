import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTRO_DONE, INTRO_START } from "@/components/motion/Preloader/introState";

gsap.registerPlugin(ScrollTrigger);

/** Keep the white headline clipped to the actual transformed Lacuna frame. */
function syncHeadlineMask(root: HTMLElement) {
  const card = root.querySelector<HTMLElement>(".hero__project--lacuna");
  const mask = root.querySelector<HTMLElement>(".hero__headline-mask");
  if (!card || !mask) return () => {};
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
  return () => { observer.disconnect(); mask.style.clipPath = previousClip; };
}

export function animateHero(root: HTMLElement) {
  const removeMaskSync = syncHeadlineMask(root);
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
    const intro = gsap.timeline({ defaults: { ease: "power3.out" }, paused: waitingForIntro, delay: waitingForIntro ? 0 : .08 });
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
      const frame = index === 0 ? [card, mask].filter(Boolean) : [card];
      intro.from(frame, { opacity: 0, duration: 1.05 }, .35 + index * .16)
        .from(card.querySelector(".hero__project-media"), { scale: 1.22, duration: 1.8 }, .35 + index * .16)
        .from(card.querySelector(".hero__project-info"), { opacity: 0, y: 16, duration: .7 }, .9 + index * .16);
    });
    intro.from(q(".hero__glass"), { opacity: 0, scale: .75, duration: 1.1 }, 1)
      .from(q(".hero__copper"), { opacity: 0, scale: .3, duration: 1.1, ease: "back.out(1.6)" }, 1.1)
      .from(q(".hero__description"), { opacity: 0, y: 18, duration: .85 }, 1)
      .from(q(".hero__actions > *"), { opacity: 0, y: 16, duration: .75, stagger: .12 }, 1.2)
      .from(q(".hero__bottom > *"), { opacity: 0, y: 12, duration: .8, stagger: .08 }, 1.45);

    const startIntro = () => { if (intro.paused()) intro.play(0); };
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

    q(".hero__project-media > img").forEach((image: HTMLElement, index: number) => {
      gsap.fromTo(image, { yPercent: -2 }, {
        yPercent: index === 0 ? 4 : 7, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: .9 },
      });
    });
    gsap.to(q(".hero__glass"), { y: -24, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 } });
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
    };
  });
  root.removeAttribute("data-motion-pending");
  return () => { media.revert(); removeMaskSync(); };
}
