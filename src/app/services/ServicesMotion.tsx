"use client";
import gsap from "gsap";
import { animateInnerPage } from "@/components/motion/InnerPageMotion/InnerPageMotion";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateServiceStudies } from "./serviceStudyMotion";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function ServicesMotion() {
 useGSAP(() => {
  const editorial = animateInnerPage(".services-page");
  const studies = animateServiceStudies(document.querySelector<HTMLElement>(".services-page")!);
  let mounted = true;
  void document.fonts.ready.then(() => { if (mounted) ScrollTrigger.refresh(); });
  return () => { mounted = false; studies(); editorial(); };
 });
 return null;
}
