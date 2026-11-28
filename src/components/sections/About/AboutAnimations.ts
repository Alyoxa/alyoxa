import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateAbout(root: HTMLElement) {
  const media = gsap.matchMedia();
  media.add({
    motion: "(prefers-reduced-motion: no-preference)",
    desktop: "(min-width: 1101px)",
  }, (context) => {
    if (!context.conditions?.motion) return;
    const desktop = Boolean(context.conditions.desktop);
    const q = gsap.utils.selector(root);
    const reveals: gsap.core.Timeline[] = [];
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: q(".about__intro")[0], start: "top 86%", toggleActions: "play none none none" },
    });
    intro.from(q(".about__eyebrow"), { opacity: 0, y: 14, duration: .6 })
      .fromTo(q(".about__heading > *"), {
        opacity: 0, yPercent: 65, rotation: 2.5, clipPath: "inset(0% -20% 100% -20%)",
      }, {
        opacity: 1, yPercent: 0, rotation: 0, clipPath: "inset(-30% -20% -30% -20%)",
        duration: 1.1, stagger: .12,
      }, .1)
      .from(q(".about__description"), { opacity: 0, x: 30, duration: 1 }, .4)
      .from(q(".about__intro-cross"), { opacity: 0, rotation: -90, scale: .3, duration: 1 }, .55);
    reveals.push(intro);

    const artwork = q(".about__artwork")[0];
    const scene = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: q(".about__stage")[0], start: "top 92%", end: desktop ? "top 28%" : "top 42%",
        scrub: .8, invalidateOnRefresh: true,
      },
    });
    scene.fromTo(artwork, {
      opacity: 0, "--about-enter-y": "70px", "--about-enter-turn": "5deg",
      clipPath: "inset(0% 0% 100% 0% round 16px)",
    }, {
      opacity: 1, "--about-enter-y": "0px", "--about-enter-turn": "0deg",
      clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.5,
    }, 0)
      .from(q(".about__artwork-signature"), { opacity: 0, y: 18, duration: .8 }, .75)
      .from(q(".about__cross"), { opacity: 0, rotation: -90, scale: .4, duration: 1, stagger: .15 }, .4)
      .from(q(".about__sphere"), { opacity: 0, y: -30, scale: .3, duration: 1, ease: "back.out(1.6)" }, .65);
    reveals.push(scene);

    // A separate light pass and travelling sphere keep the composition moving
    // after its entrance without taking over the visitor's scrolling.
    gsap.fromTo(q(".about__artwork-light"), {
      "--about-light-x": "-130%", opacity: .2,
    }, {
      "--about-light-x": "130%", opacity: .85, ease: "none",
      scrollTrigger: { trigger: artwork, start: "top 80%", end: "bottom 20%", scrub: 1, invalidateOnRefresh: true },
    });
    gsap.fromTo(q(".about__sphere"), {
      "--about-sphere-x": desktop ? "-60px" : "-16px", "--about-sphere-y": "12px",
    }, {
      "--about-sphere-x": desktop ? "65px" : "16px", "--about-sphere-y": "-16px", ease: "none",
      scrollTrigger: { trigger: q(".about__stage")[0], start: "top 85%", end: "bottom 25%", scrub: 1.2, invalidateOnRefresh: true },
    });

    // The image owns scroll depth; the frame keeps its responsive CSS skew.
    gsap.fromTo(q(".about__artwork-image"), { yPercent: -3, scale: 1.12 }, {
      yPercent: 3, scale: 1.04, ease: "none",
      scrollTrigger: { trigger: artwork, start: "top bottom", end: "bottom top", scrub: desktop ? 1 : .5, invalidateOnRefresh: true },
    });
    (q(".about__principle") as HTMLElement[]).forEach((principle) => {
      const reveal = gsap.timeline({ scrollTrigger: { trigger: principle, start: "top 90%", toggleActions: "play none none none" } });
      reveal.from(principle.firstElementChild, { opacity: 0, rotation: -45, scale: .6, duration: .9, ease: "power3.out" })
        .from(principle.querySelectorAll("h3, p"), { opacity: 0, y: 18, duration: .75, stagger: .1, ease: "power3.out" }, .1);
      reveals.push(reveal);
    });
    const stats = gsap.timeline({ scrollTrigger: { trigger: q(".about__stats")[0], start: "top 94%", toggleActions: "play none none none" } });
    stats.from(q(".about__stat dd"), { opacity: 0, yPercent: 65, duration: 1, stagger: .13, ease: "power3.out" })
      .from(q(".about__stat dt"), { opacity: 0, y: 12, duration: .65, stagger: .13 }, .25);
    reveals.push(stats);
    const footer = gsap.timeline({ scrollTrigger: { trigger: q(".about__footer")[0], start: "top 97%", toggleActions: "play none none none" } });
    footer.from(q(".about__footer > p"), { opacity: 0, y: 14, duration: .7, ease: "power3.out" })
      .from(q(".about__footer-rule"), { scaleX: 0, transformOrigin: "left", duration: .9, ease: "power2.inOut" }, .1)
      .from(q(".about__footer > a"), { opacity: 0, y: 18, duration: .8, ease: "power3.out" }, .3);
    reveals.push(footer);
    const showFocused = () => reveals.forEach((reveal) => reveal.progress(1));
    root.addEventListener("focusin", showFocused);
    return () => root.removeEventListener("focusin", showFocused);
  });
  root.removeAttribute("data-motion-pending");
  return () => media.revert();
}
