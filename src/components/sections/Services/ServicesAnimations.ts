import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createServicesScrollStory } from "./ServicesScrollStory";

gsap.registerPlugin(ScrollTrigger);

export function animateServices(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add({
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(hover: hover) and (pointer: fine) and (min-width: 801px)",
    cinematic: "(hover: hover) and (pointer: fine) and (min-width: 1101px) and (min-height: 760px)",
  }, (context) => {
    if (!context.conditions?.motion) return;
    const q = gsap.utils.selector(root);
    const reveals: gsap.core.Timeline[] = [];
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: q(".services__intro")[0], start: "top 86%", toggleActions: "play none none none" },
    });
    intro.from(q(".services__eyebrow"), { opacity: 0, y: 14, duration: .65 })
      .fromTo(q(".services__heading > *"), {
        opacity: 0, yPercent: 65, rotation: 3, clipPath: "inset(0% -20% 100% -20%)",
      }, {
        opacity: 1, yPercent: 0, rotation: 0, clipPath: "inset(-30% -20% -30% -20%)",
        duration: 1.05, stagger: .13,
      }, .1)
      .from(q(".services__description"), { opacity: 0, x: 32, duration: 1 }, .45);
    reveals.push(intro);

    const orbit = root.querySelector<SVGPathElement>(".services__orbit path");
    const stage = gsap.timeline({
      scrollTrigger: { trigger: q(".services__stage")[0], start: "top 88%", toggleActions: "play none none none" },
    });
    if (orbit) {
      const length = orbit.getTotalLength();
      stage.fromTo(orbit, { strokeDasharray: length, strokeDashoffset: length }, {
        strokeDashoffset: 0, duration: 2.3, ease: "power2.inOut",
      }, 0);
    }
    stage.from(q(".services__cross"), { opacity: 0, rotation: -90, scale: .25, duration: 1, stagger: .2, ease: "power3.out" }, .5);
    reveals.push(stage);

    const cards = q(".services__card:not(.card-dialog__ghost)") as HTMLElement[];
    const removeListeners: (() => void)[] = [];
    cards.forEach((card, index) => {
      // Each card has its own trigger so the second row waits on mobile.
      const delay = context.conditions?.desktop ? [ .2, 0, .32, .46 ][index] : 0;
      const reveal = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: card, start: "top 94%", toggleActions: "play none none none" },
      });
      reveal.fromTo(card, { opacity: 0, "--service-enter-y": "80px", "--service-enter-turn": `${index % 2 ? 4 : -4}deg`, "--service-enter-scale": .92 }, {
        opacity: 1, "--service-enter-y": "0px", "--service-enter-turn": "0deg", "--service-enter-scale": 1, duration: 1.15,
      }, delay)
        .from(card.querySelectorAll(".services__number, h3, .services__card-bottom"), { opacity: 0, y: 20, duration: .65, stagger: .1 }, delay + .3)
        .fromTo(card.querySelector(".services__card-sheen"), { "--service-shine": "-150%" }, { "--service-shine": "150%", duration: 1.15, ease: "power2.inOut" }, delay + .35);
      const planes = card.querySelectorAll(".services-art__planes i");
      if (planes.length) reveal.from(planes, { y: 45, opacity: 0, duration: 1, stagger: .12 }, delay + .15);
      const planet = card.querySelector(".services-art__planet");
      if (planet) reveal.from(planet, { yPercent: 22, opacity: 0, duration: 1.4 }, delay + .1);
      reveals.push(reveal);

      if (context.conditions?.desktop) {
        const x = gsap.quickTo(card, "--service-hover-x", { duration: .7, ease: "power3.out" });
        const y = gsap.quickTo(card, "--service-hover-y", { duration: .7, ease: "power3.out" });
        const turn = gsap.quickTo(card, "--service-hover-turn", { duration: .7, ease: "power3.out" });
        const artwork = card.querySelector(".services-art");
        const artX = gsap.quickTo(artwork, "x", { duration: .8, ease: "power3.out" });
        const artY = gsap.quickTo(artwork, "y", { duration: .8, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch" || reveal.progress() < 1) return;
          const rect = card.getBoundingClientRect();
          const horizontal = gsap.utils.clamp(-.5, .5, (event.clientX - rect.left) / rect.width - .5);
          const vertical = gsap.utils.clamp(-.5, .5, (event.clientY - rect.top) / rect.height - .5);
          x(horizontal * 10); y(vertical * 8 - 7); turn(horizontal * 1.6);
          artX(-horizontal * 9); artY(-vertical * 9);
        };
        const reset = () => { x(0); y(0); turn(0); artX(0); artY(0); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", reset);
        card.addEventListener("pointercancel", reset);
        card.addEventListener("click", reset);
        removeListeners.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", reset);
          card.removeEventListener("pointercancel", reset);
          card.removeEventListener("click", reset);
        });
      }
    });

    if (context.conditions?.cinematic) createServicesScrollStory(root, cards);

    const footer = gsap.timeline({ scrollTrigger: { trigger: q(".services__footer")[0], start: "top 97%", toggleActions: "play none none none" } });
    footer.from(q(".services__footer p"), { opacity: 0, y: 15, duration: .7, ease: "power3.out" })
      .from(q(".services__footer-rule"), { scaleX: 0, transformOrigin: "left", duration: .85, ease: "power3.inOut" }, .1)
      .from(q(".services__footer > a"), { opacity: 0, y: 15, duration: .7 }, .2);
    reveals.push(footer);
    // A focused control must never be concealed by a pending reveal.
    const showFocused = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.closest(".service-detail")) return;
      reveals.forEach((reveal) => reveal.progress(1));
    };
    root.addEventListener("focusin", showFocused);
    return () => {
      root.removeAttribute("data-scroll-service");
      root.removeEventListener("focusin", showFocused);
      removeListeners.forEach((remove) => remove());
    };
  });
  root.removeAttribute("data-motion-pending");
  return () => media.revert();
}

export function animateServiceDetail(root: HTMLDialogElement) {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const q = gsap.utils.selector(root);
    const scroller = q(".service-detail__scroll")[0];
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.from(q(".service-detail__hero .services-art"), { opacity: 0, scale: 1.08, duration: 1.4 })
      .from(q(".service-detail__hero .services__label"), { opacity: 0, y: 12, duration: .6 }, .1)
      .from(q(".service-detail__hero h2"), { opacity: 0, y: 35, duration: .95 }, .2)
      .from(q(".service-detail__hero-content > p"), { opacity: 0, y: 15, duration: .75 }, .4);
    const reveals = [intro];
    [".service-detail__overview", ".service-detail__capabilities", ".service-detail__contact"].forEach((selector) => {
      const section = q(selector)[0];
      const reveal = gsap.timeline({ scrollTrigger: { trigger: section, scroller, start: "top 92%", toggleActions: "play none none none" } });
      reveal.from(section.children, { opacity: 0, y: 24, duration: .85, stagger: .12, ease: "power3.out" });
      reveals.push(reveal);
    });
    const showFocused = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.closest(".service-detail__bar")) return;
      reveals.forEach((reveal) => reveal.progress(1));
    };
    root.addEventListener("focusin", showFocused);
    // Modal opening changes the scroller from display:none to its actual size.
    const refreshFrame = requestAnimationFrame(() => {
      reveals.forEach((reveal) => reveal.scrollTrigger?.refresh());
    });
    return () => { cancelAnimationFrame(refreshFrame); root.removeEventListener("focusin", showFocused); };
  });
  return () => media.revert();
}
