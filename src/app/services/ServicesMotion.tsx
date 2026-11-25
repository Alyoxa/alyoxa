"use client";
import gsap from "gsap";
import { animateInnerPage } from "@/components/motion/InnerPageMotion/InnerPageMotion";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function ServicesMotion() {
 useGSAP(() => {
  const editorial = animateInnerPage(".services-page");
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
   gsap.utils.toArray<HTMLElement>(".service-chapter").forEach(chapter => {
    gsap.fromTo(chapter.querySelector(".service-chapter__art"), { "--service-image-y": "-30px" }, { "--service-image-y": "30px", ease: "none", scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: .9, invalidateOnRefresh: true } });
   });
  });
  let mounted = true;
  void document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh(); });
  return () => { mounted = false; media.revert(); editorial(); };
 });
 return null;
}
