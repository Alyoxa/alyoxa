"use client";
import { useEffect, useRef, useState } from "react";
type Section={id:string;title:string};
export default function LegalContents({sections}:{sections:Section[]}) {
 const [active,setActive]=useState(sections[0]?.id);
 const details=useRef<HTMLDetailsElement>(null);
 const progress=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;let current=sections[0]?.id;sections.forEach(section=>{const element=document.getElementById(section.id);if(element&&element.getBoundingClientRect().top<=innerHeight*.28)current=section.id;});if(scrollY+innerHeight>=document.documentElement.scrollHeight-4)current=sections.at(-1)?.id??current;setActive(current);const range=document.documentElement.scrollHeight-innerHeight;if(progress.current)progress.current.style.transform=`scaleX(${range>0?Math.min(1,Math.max(0,scrollY/range)):0})`;};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);};
 },[sections]);
 const links=sections.map((section,index)=><a href={`#${section.id}`} key={section.id} aria-current={active===section.id?"location":undefined} onClick={()=>{setActive(section.id);if(details.current)details.current.open=false;}}><span>{String(index+1).padStart(2,"0")}</span><span>{section.title.replace(/^\d+\.\s*/,"")}</span></a>);
 return <><div className="legal-reading-progress" aria-hidden="true"><span ref={progress}/></div><div className="legal-contents__desktop"><p className="legal-contents__label">IN THIS DOCUMENT <span>{String(sections.length).padStart(2,"0")}</span></p><nav aria-label="Document contents">{links}</nav></div><details className="legal-contents__mobile" ref={details}><summary>Explore this document <span>{String(sections.length).padStart(2,"0")} sections <i aria-hidden="true">+</i></span></summary><nav aria-label="Document contents">{links}</nav></details></>;
}
