"use client";
import gsap from "gsap";
import { animateInnerPage } from "@/components/motion/InnerPageMotion/InnerPageMotion";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function StudioMotion() {
  useGSAP(() => {
    const editorial = animateInnerPage(".studio-page");
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      stack: "(min-width: 1001px) and (min-height: 760px)",
    }, context => {
      if (!context.conditions?.motion) return;
      const cards = gsap.utils.toArray<HTMLElement>(".studio-page .discipline-card");
      cards.forEach((card, index) => {
        const surface = card.querySelector(".discipline-card__surface");
        gsap.fromTo(surface, { "--card-enter-y": "48px", "--card-enter-turn": index % 2 ? "3deg" : "-3deg" }, {
          "--card-enter-y": "0px", "--card-enter-turn": "0deg", ease: "none",
          scrollTrigger: { trigger: card, start: "top 98%", end: "top 45%", scrub: .7, invalidateOnRefresh: true },
        });
        if (context.conditions?.stack && cards[index + 1]) {
          gsap.fromTo(surface, { "--card-stack-scale": 1 }, {
            "--card-stack-scale": .94, ease: "none",
            scrollTrigger: { trigger: cards[index + 1], start: "top 75%", end: `top ${160 + index * 12}px`, scrub: .8, invalidateOnRefresh: true },
          });
        }
      });
    });
    let active = true;
    void document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
    return () => { active = false; media.revert(); editorial(); };
  });
  return null;
}
