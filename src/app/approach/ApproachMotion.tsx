"use client";
import gsap from "gsap";
import { animateInnerPage } from "@/components/motion/InnerPageMotion/InnerPageMotion";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function ApproachMotion() {
 useGSAP(() => {
  const journey = document.querySelector<HTMLElement>(".process-journey");
  const stages = gsap.utils.toArray<HTMLElement>(".process-stage");
  const links = journey?.querySelectorAll<HTMLAnchorElement>(".process-journey__nav a");
  const update = () => {
   if (!journey) return;
   let current = stages[0]?.id;
   stages.forEach(stage => { if (stage.getBoundingClientRect().top <= innerHeight * .42) current = stage.id; });
   journey.dataset.activeStage = current;
   links?.forEach(link => { if(link.hash === `#${current}`) link.setAttribute("aria-current","step"); else link.removeAttribute("aria-current"); });
  };
  const progress = ScrollTrigger.create({trigger:journey,start:"top bottom",end:"bottom top",onUpdate:update,onRefresh:update});
  update();
  const editorial=animateInnerPage(".approach-page");
  let mounted=true;
  void document.fonts.ready.then(()=>{if(mounted) ScrollTrigger.refresh();});
  return ()=>{mounted=false;editorial();progress.kill();};
 });
 return null;
}
