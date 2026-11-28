"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCaseStudy from "@/components/sections/Work/ProjectCaseStudy";
import type { Project } from "@/components/sections/Work/Work";
import { workProjects } from "./projects";
import AlyoxaMark from "@/components/ui/AlyoxaMark/AlyoxaMark";
gsap.registerPlugin(useGSAP, ScrollTrigger);
const categories = ["All work", "Branding", "Digital", "Product", "Web"] as const;
type Filter = typeof categories[number];
export default function WorkGallery() {
 const root = useRef<HTMLDivElement>(null);
 const [filter,setFilter] = useState<Filter>("All work");
 const [selected,setSelected] = useState<Project|null>(null);
 const [source,setSource] = useState<HTMLElement|null>(null);
 const projects = workProjects.filter(project => filter === "All work" || project.categories.some(category => category === filter));
 useGSAP(() => {
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
   const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card:not(.card-dialog__ghost)", root.current);
   const tweens = cards.map(card => {
    const timeline=gsap.timeline({scrollTrigger:{trigger:card,start:"top 97%",toggleActions:"play none none none"}});
    timeline.fromTo(card.querySelector(".portfolio-card__visual"),{clipPath:"inset(0% 0% 100% 0% round 10px)"},{clipPath:"inset(0% 0% 0% 0% round 10px)",duration:1.15,ease:"power3.inOut"})
      .from(card.querySelectorAll(".portfolio-card__meta > *"),{y:20,opacity:0,duration:.7,stagger:.08,ease:"power3.out"},.6);
    const image=card.querySelector(".portfolio-card__visual > img");
    gsap.fromTo(image,{"--portfolio-image-y":"-12px"},{"--portfolio-image-y":"12px",ease:"none",scrollTrigger:{trigger:card,start:"top bottom",end:"bottom top",scrub:.9,invalidateOnRefresh:true}});
    return timeline;
   });
   const focus = () => tweens.forEach(tween => tween.progress(1));
   root.current?.addEventListener("focusin",focus);
   const element = root.current;
   return () => element?.removeEventListener("focusin",focus);
  });
  ScrollTrigger.refresh();
  return () => media.revert();
 },{scope:root,dependencies:[filter],revertOnUpdate:true});
 return <div ref={root} className="work-page__gallery work-page__wrap"><div className="work-page__toolbar"><div className="work-page__filters" role="group" aria-label="Filter projects">{categories.map(category => <button key={category} type="button" aria-pressed={filter===category} onClick={()=>setFilter(category)}>{category}<span>{category === "All work" ? workProjects.length : workProjects.filter(p=>p.categories.some(c=>c===category)).length}</span></button>)}</div><p role="status" aria-live="polite">{String(projects.length).padStart(2,"0")} EXPLORATIONS</p></div><p className="work-page__concept-note"><span /> CONCEPT PORTFOLIO / Illustrative projects, created to explore what&apos;s possible.</p><div className="work-page__grid">{projects.map((project,index)=><button id={`concept-${project.id}`} key={project.id} type="button" className={`portfolio-card portfolio-card--${project.id}${index===0&&filter==="All work"?" portfolio-card--featured":""}`} aria-haspopup="dialog" aria-label={`Explore ${project.name}, concept project`} onClick={event=>{setSource(event.currentTarget);setSelected(project);}}><div className="portfolio-card__visual"><Image src={project.image} alt={`${project.name} concept art direction`} width={1600} height={1000} sizes={index===0&&filter==="All work"?"92vw":"(max-width:700px) 92vw, 45vw"} priority={index===0} /><AlyoxaMark className="brand-seal" /><span className="portfolio-card__edition">CONCEPT / 0{workProjects.indexOf(project)+1}</span><span className="portfolio-card__open" aria-hidden="true"><ArrowUpRight size={26} strokeWidth={1.2} /></span>{index===0&&filter==="All work"&&<span className="portfolio-card__feature-title" aria-hidden="true">A different<br /><em>kind of presence.</em></span>}</div><div className="portfolio-card__meta"><h2>{project.name}</h2><span>{project.type}</span></div></button>)}</div>{selected&&<ProjectCaseStudy project={selected} source={source} nextProject={workProjects[(workProjects.findIndex(p=>p.id===selected.id)+1)%workProjects.length]} onClose={()=>setSelected(null)} onNext={setSelected}/>}</div>;
}
