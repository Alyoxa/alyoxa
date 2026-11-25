"use client";
import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { testimonials } from "./testimonialsData";
import "./Testimonials.css";
gsap.registerPlugin(useGSAP,ScrollTrigger);
export default function Testimonials() {
 const root = useRef<HTMLElement>(null);
 useGSAP(()=>{
  const media=gsap.matchMedia();
  media.add({motion:"(prefers-reduced-motion: no-preference)",desktop:"(min-width:1101px)"},context=>{
   if(!context.conditions?.motion)return;
   const q=gsap.utils.selector(root.current);
   const intro=gsap.from(q(".testimonials__intro > *"),{y:22,opacity:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:q(".testimonials__intro")[0],start:"top 92%",toggleActions:"play none none none"}});
   const cards=q(".testimonial") as HTMLElement[];
   cards.forEach((card,index)=>{
    const surface=card.querySelector(".testimonial__surface");
    gsap.fromTo(surface,{"--quote-y":"38px","--quote-turn":index%2?"2deg":"-2deg"},{"--quote-y":"0px","--quote-turn":"0deg",ease:"none",scrollTrigger:{trigger:card,start:"top 98%",end:"top 48%",scrub:.7,invalidateOnRefresh:true}});
    if(context.conditions?.desktop&&cards[index+1])gsap.fromTo(surface,{"--quote-scale":1},{"--quote-scale":.95,ease:"none",scrollTrigger:{trigger:cards[index+1],start:"top 75%",end:()=>`top ${parseFloat(getComputedStyle(root.current!).getPropertyValue("--quote-stack-top"))+10*(index+1)}px`,scrub:.8,invalidateOnRefresh:true}});
   });
   const focus=()=>intro.progress(1);
   const element=root.current;
   element?.addEventListener("focusin",focus);
   return()=>element?.removeEventListener("focusin",focus);
  });
  root.current?.removeAttribute("data-motion-pending");
  return()=>media.revert();
 },{scope:root});
 return <section data-motion-pending ref={root} className="testimonials" id="testimonials" aria-labelledby="testimonials-heading"><div className="testimonials__container"><header className="testimonials__intro"><SectionEyebrow index="06" category="Perspectives" className="testimonials__eyebrow">Words behind the work</SectionEyebrow><SectionHeading id="testimonials-heading" className="testimonials__heading" lines={["Good work.","Better", "relationships."]}/><p className="testimonials__description">The thinking matters. The craft matters.<br />So does the experience of working together.</p><BrandButton href="/work" variant="text" label="Explore the work" /></header><div className="testimonials__stack">{testimonials.map((item,index)=><figure className={`testimonial testimonial--${index+1}`} key={item.id} style={{"--quote-index":index,zIndex:index+1} as CSSProperties}><div className="testimonial__surface"><div className="testimonial__meta"><span>0{index+1} / CLIENT STORY</span><span>{item.country}</span></div><span className="testimonial__mark" aria-hidden="true">&#8220;</span><div className="testimonial__project"><span>{item.focus}</span><h3>{item.project}</h3></div><blockquote><p>{item.quote}</p></blockquote><figcaption><span className="testimonial__avatar" aria-hidden="true">{item.name.split(" ").map(part=>part[0]).slice(0,3).join("")}</span><span className="testimonial__person"><span>{item.name}</span><span>{item.role}</span></span>{item.projectUrl&&<a href={item.projectUrl}>View project <span aria-hidden="true">&#8599;</span></a>}</figcaption></div></figure>)}</div></div></section>;
}
