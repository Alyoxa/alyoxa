import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateFooter(root: HTMLElement) {
  // The contact page uses the compact footer, without a second enquiry CTA.
  if (!root.querySelector(".studio-footer__cta")) { root.removeAttribute("data-motion-pending"); return () => {}; }
  const media = gsap.matchMedia();
  media.add({
    motion: "(prefers-reduced-motion: no-preference)",
    pointer: "(hover: hover) and (pointer: fine)",
  }, (context) => {
    if (!context.conditions?.motion) return;
    const q = gsap.utils.selector(root);
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: q(".studio-footer__cta")[0], start: "top 83%", toggleActions: "play none none none" },
    });
    intro.from(q(".studio-footer__eyebrow"), { opacity: 0, y: 12, duration: .6 })
      .from(q(".studio-footer__eyebrow .section-eyebrow__rule"), { scaleX: 0, transformOrigin: "left", duration: .8 }, .05)
      .fromTo(q(".studio-footer__cta h2 > *"), {
        opacity: 0, yPercent: 70, rotation: 2,
        clipPath: "inset(0% -10% 100% -10%)",
      }, {
        opacity: 1, yPercent: 0, rotation: 0,
        clipPath: "inset(-25% -10% -30% -10%)", duration: 1.15, stagger: .18,
      }, .15)
      .from(q(".studio-footer__talk"), { opacity: 0, y: 35, scale: .75, duration: 1, ease: "back.out(1.25)" }, .7)
      .from(q(".studio-footer__talk > *"), { opacity: 0, duration: .6, stagger: .1 }, 1.05);

    // Clamp the ending at the page boundary so the logo always fully resolves.
    const logo = gsap.timeline({ scrollTrigger: {
      trigger: q(".studio-footer__wordmark")[0], start: "top 98%",
      end: "clamp(bottom 78%)", scrub: .7, invalidateOnRefresh: true,
    } });
    logo.fromTo(q(".studio-footer__wordmark > img"), {
      yPercent: 30, scale: .94, opacity: .2, clipPath: "inset(100% 0% 0% 0%)",
    }, {
      yPercent: 0, scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.out",
    });

    const bottom = gsap.timeline({ scrollTrigger: {
      trigger: q(".studio-footer__bottom")[0], start: "top 99%", toggleActions: "play none none none",
    } });
    bottom.from(q(".studio-footer__main-row > *"), { opacity: 0, y: 15, duration: .7, stagger: .07, ease: "power3.out" })
      .from(q(".studio-footer__legal-row > *"), { opacity: 0, y: 10, duration: .6, stagger: .06 }, .2);

    const showFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(".studio-footer__cta")) intro.progress(1);
      if (event.target.closest(".studio-footer__wordmark")) {
        logo.scrollTrigger?.disable(false);
        logo.scrollTrigger?.getTween()?.pause();
        logo.progress(1);
      }
      if (event.target.closest(".studio-footer__bottom")) bottom.progress(1);
    };
    root.addEventListener("focusin", showFocused);
    let removePointer = () => {};
    if (context.conditions?.pointer) {
      const button = root.querySelector<HTMLAnchorElement>(".studio-footer__talk");
      if (button) {
        const x = gsap.quickTo(button, "--footer-magnet-x", { duration: .65, ease: "power3.out" });
        const y = gsap.quickTo(button, "--footer-magnet-y", { duration: .65, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch" || intro.progress() < 1) return;
          const bounds = button.getBoundingClientRect();
          x(gsap.utils.clamp(-14, 14, (event.clientX - bounds.left - bounds.width / 2) * .2));
          y(gsap.utils.clamp(-14, 14, (event.clientY - bounds.top - bounds.height / 2) * .2));
        };
        const reset = () => { x(0); y(0); };
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", reset);
        button.addEventListener("pointercancel", reset);
        button.addEventListener("blur", reset);
        removePointer = () => {
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", reset);
          button.removeEventListener("pointercancel", reset);
          button.removeEventListener("blur", reset);
        };
      }
    }
    return () => { root.removeEventListener("focusin", showFocused); removePointer(); };
  });
  root.removeAttribute("data-motion-pending");
  return () => media.revert();
}
