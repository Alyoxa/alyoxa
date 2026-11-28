"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./InnerPageMotion.css";
gsap.registerPlugin(useGSAP,ScrollTrigger);

/** Shared editorial choreography. Section-specific depth and sticky scenes stay local. */
export function animateInnerPage(selector:string) {
 const root=document.querySelector<HTMLElement>(selector);
 if(!root)return ()=>{};
 const media=gsap.matchMedia();
 media.add({motion:"(prefers-reduced-motion: no-preference)",desktop:"(min-width:1001px) and (pointer:fine)"},context=>{
  if(!context.conditions?.motion)return;
  const desktop=Boolean(context.conditions.desktop);
  const hero=root.querySelector("main > header");
  const reveals:gsap.core.Animation[]=[];
  if(hero){
   const entry=gsap.timeline({defaults:{ease:"power3.out"}});
   entry.from(hero.querySelectorAll("[class$='__eyebrow'] > *, .studio-page__kicker > *"),{y:12,opacity:0,duration:.65,stagger:.08},0)
    .fromTo(hero.querySelectorAll(".inner-hero-ink"),{yPercent:90,rotation:2,opacity:0,clipPath:"inset(0% -15% 100% -15%)"},{yPercent:0,rotation:0,opacity:1,clipPath:"inset(-25% -15% -30% -15%)",duration:1.25,stagger:.16},.12)
    .from(hero.querySelectorAll("[class$='__hero-bottom'] > *"),{y:25,opacity:0,duration:.9,stagger:.12},.65);
   reveals.push(entry);
   const index=hero.querySelector(".services-page__index");
   if(index)entry.from(index.children,{y:15,opacity:0,duration:.7,stagger:.08},.9);
   if(desktop)gsap.fromTo(hero.querySelector("h1"),{"--inner-title-y":"0px"},{"--inner-title-y":"-35px",ease:"none",scrollTrigger:{trigger:hero,start:"top top",end:"bottom top",scrub:1,invalidateOnRefresh:true}});
  }
  const marked="[data-studio-reveal], [data-service-reveal], [data-process-reveal]";
  const elements=Array.from(root.querySelectorAll<HTMLElement>(marked)).filter(element=>!hero?.contains(element)&&!element.parentElement?.closest(marked));
  // Include the content that previously had no motion at all.
  const extra=".studio-page__expertise-intro > div, .services-page__work, .work-page__toolbar, .work-page__concept-note, .work-page__closing, .approach-page__questions details, .process-stage__top, .process-journey__guide > h2, .process-journey__nav, .process-journey__note";
  root.querySelectorAll<HTMLElement>(extra).forEach(element=>{if(!element.closest(marked)&&!elements.some(parent=>parent.contains(element)))elements.push(element);});
  elements.forEach(element=>{
   if(element.closest(".card-dialog__ghost"))return;
   const heading=element.matches("h2,h3");
   const group=element.matches("article,section,div")&&element.children.length>1;
   const targets=group?Array.from(element.children):element;
   const tween=gsap.fromTo(targets,{y:heading?42:24,opacity:0,...(heading?{clipPath:"inset(0% -10% 100% -10%)"}:{})},{y:0,opacity:1,...(heading?{clipPath:"inset(-20% -10% -30% -10%)"}:{}),duration:heading?1.05:.85,stagger:group?.1:0,ease:"power3.out",scrollTrigger:{trigger:element,start:"top 96%",toggleActions:"play none none none"}});
   reveals.push(tween);
  });
  root.querySelectorAll<HTMLElement>(".service-chapter__deliverables ul, .process-stage__activities ul, .services-page__collaboration ol").forEach(list=>{
   const tween=gsap.from(list.children,{x:desktop?22:10,opacity:0,duration:.7,stagger:.09,ease:"power3.out",scrollTrigger:{trigger:list,start:"top 96%",toggleActions:"play none none none"}});reveals.push(tween);
  });
  root.querySelectorAll<HTMLElement>(".studio-page__image, .service-chapter__art").forEach(art=>{
   const tween=gsap.fromTo(art,{clipPath:"inset(0% 0% 100% 0% round 14px)"},{clipPath:"inset(0% 0% 0% 0% round 14px)",duration:1.35,ease:"power3.inOut",scrollTrigger:{trigger:art,start:"top 96%",toggleActions:"play none none none"}});reveals.push(tween);
  });
  const studioImage=root.querySelector(".studio-page__image img");
  if(studioImage)gsap.fromTo(studioImage,{yPercent:-5,scale:1.12},{yPercent:5,scale:1.08,ease:"none",scrollTrigger:{trigger:studioImage.parentElement,start:"top bottom",end:"bottom top",scrub:1,invalidateOnRefresh:true}});
  const sculpture=root.querySelector(".process-journey__sculpture");
  if(sculpture){const tween=gsap.fromTo(sculpture.children,{"--sculpture-enter-y":"55px",opacity:0},{"--sculpture-enter-y":"0px",opacity:1,duration:1.1,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:sculpture,start:"top 96%",toggleActions:"play none none none"}});reveals.push(tween);}
  // Keyboard users can always reach fully visible content immediately.
  const focus=(event:FocusEvent)=>reveals.forEach(animation=>{
   const tweens=animation instanceof gsap.core.Tween?[animation]:(animation as gsap.core.Timeline).getChildren(true,true,false) as gsap.core.Tween[];
   const targets=tweens.flatMap(tween=>tween.targets());
   if(targets.some(target=>target instanceof Element&&event.target instanceof Node&&(target.contains(event.target)||target.closest("header")?.contains(event.target))))animation.progress(1);
  });
  root.addEventListener("focusin",focus);
  return()=>root.removeEventListener("focusin",focus);
 });
 root.querySelector("main[data-motion-pending]")?.removeAttribute("data-motion-pending");
 let mounted=true;
 void document.fonts.ready.then(()=>{if(mounted)ScrollTrigger.refresh();});
 return()=>{mounted=false;media.revert();};
}
export default function InnerPageMotion({selector}:{selector:string}) {
 useGSAP(()=>animateInnerPage(selector),{dependencies:[selector],revertOnUpdate:true});
 return null;
}
