"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP,ScrollTrigger);
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { iconPaths } from "@/components/motion/Preloader/iconPaths";
const services=["Brand systems","Digital experiences","Product design","Creative technology","Not sure yet"];
const stepNames=["The spark","The vision","The people","The beginning"];
const chapters=[{title:"Every great thing",accent:"starts somewhere.",note:"Choose a direction. Or bring a question. Curiosity is enough to begin."},{title:"Give the idea",accent:"a little shape.",note:"A thought, a challenge, a possibility. Tell us what a better future looks like."},{title:"Good work starts",accent:"with good people.",note:"This is where your perspective meets ours. Let us know who is behind the ambition."},{title:"A shared vision.",accent:"A new beginning.",note:"The first pieces are in place. Take a look, make it yours, and let the conversation begin."}];
const draftKey="alyoxa:contact-draft:v1";
type Brief={services:string[];description:string;budget:string;timing:string;name:string;email:string;company:string};
const empty:Brief={services:[],description:"",budget:"",timing:"Exploring options",name:"",email:"",company:""};
function readDraft(value:unknown):Brief {
 if(!value||typeof value!=="object")return empty;
 const data=value as Record<string,unknown>;
 const string=(key:string,max:number)=>typeof data[key]==="string"?(data[key] as string).slice(0,max):"";
 return {services:Array.isArray(data.services)?data.services.filter((s):s is string=>typeof s==="string"&&services.includes(s)):[],description:string("description",1200),budget:string("budget",100),timing:string("timing",80)||empty.timing,name:string("name",80),email:string("email",254),company:string("company",100)};
}
export default function ContactForm(){
 const [brief,setBrief]=useState<Brief>(empty);
 const [step,setStep]=useState(0);
 const [ready,setReady]=useState(false);
 const [error,setError]=useState("");
 const [prepared,setPrepared]=useState(false);
 const [sending,setSending]=useState(false);
 const submitting=useRef(false);
 const [copyStatus,setCopyStatus]=useState("");
 const stage=useRef<HTMLDivElement>(null);
 useGSAP(()=>{
  if(!ready||!stage.current)return;
  const media=gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)",()=>{
   const element=stage.current;
   if(!element)return;
   const entry=gsap.timeline({scrollTrigger:{trigger:element,start:"top 94%",toggleActions:"play none none none"}});
   entry.from(element.querySelectorAll(".enquiry__destination-top, .enquiry__destination-copy, .enquiry__destination-bottom"),{y:22,opacity:0,duration:.9,stagger:.1,ease:"power3.out"})
    .from(element.querySelector(".enquiry__sculpture"),{y:45,opacity:0,duration:1.3,ease:"power3.out"},.1)
    .from(element.querySelector(".enquiry__workspace"),{opacity:0,y:24,duration:.9,ease:"power3.out"},.25);
   const focus=()=>entry.progress(1);
   element.addEventListener("focusin",focus);
   return()=>element.removeEventListener("focusin",focus);
  });
  stage.current?.removeAttribute("data-motion-pending");
  ScrollTrigger.refresh();
  return()=>media.revert();
 },{scope:stage,dependencies:[ready],revertOnUpdate:true});
 const heading=useRef<HTMLHeadingElement>(null);
 const choices=useRef<HTMLFieldSetElement>(null);
 const moveFocus=useRef(false);
 useEffect(()=>{
  let active=true;
  // Restore the browser-owned draft after hydration, including Strict Mode replay.
  queueMicrotask(()=>{if(!active)return;try{const stored=sessionStorage.getItem(draftKey);if(stored)setBrief(readDraft(JSON.parse(stored)));}catch{/* Storage may be disabled. */}setReady(true);});
  return()=>{active=false;};
 },[]);
 useEffect(()=>{if(!ready||prepared)return;try{sessionStorage.setItem(draftKey,JSON.stringify(brief));}catch{/* Storage may be disabled. */}},[brief,ready,prepared]);
 useEffect(()=>{if(moveFocus.current){heading.current?.focus({preventScroll:true});heading.current?.scrollIntoView({block:"nearest",behavior:"instant"});moveFocus.current=false;}},[step,prepared]);
 const update=(key:Exclude<keyof Brief,"services">,value:string)=>setBrief(previous=>({...previous,[key]:value}));
 function go(next:number){setError("");moveFocus.current=true;setStep(next);}
 function toggle(service:string){setError("");setBrief(previous=>({...previous,services:service==="Not sure yet"?(previous.services.includes(service)?[]:[service]):previous.services.includes(service)?previous.services.filter(item=>item!==service):[...previous.services.filter(item=>item!=="Not sure yet"),service]}));}
 const body=`PROJECT ENQUIRY / ALYOXA

Services: ${brief.services.join(", ")}

The idea:
${brief.description.trim()}

Budget: ${brief.budget.trim()||"Let's discuss"}
Timing: ${brief.timing}

Name: ${brief.name.trim()}
Email: ${brief.email.trim()}
Company / website: ${brief.company.trim()||"Not provided"}`;
 const emailHref=`mailto:hello@alyoxa.com?subject=${encodeURIComponent("Project enquiry from "+brief.name.trim())}&body=${encodeURIComponent(body)}`;
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(submitting.current)return;
  if(step===0&&!brief.services.length){setError("Choose a service, or select Not sure yet.");choices.current?.focus();return;}
  if(step===1&&brief.description.trim().length<10){setError("Tell us a little more about your idea (at least 10 characters).");document.getElementById("project-description")?.focus();return;}
  if(step===2&&!brief.name.trim()){setError("Please add your name.");document.getElementById("contact-name")?.focus();return;}
  if(step===2&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email.trim())){setError("That email doesn't look right. Please check it.");document.getElementById("contact-email")?.focus();return;}
  if(step<3){go(step+1);return;}
  submitting.current=true;setSending(true);setError("");
  try{
   const response=await fetch("/api/project-inquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectType:brief.services,companyName:brief.company,clientName:brief.name,clientEmail:brief.email,projectIdea:brief.description,budgetRange:brief.budget,timing:brief.timing}),signal:AbortSignal.timeout(20000)});
   const result=await response.json();
   if(!response.ok||result.success!==true)throw new Error(typeof result.error==="string"?result.error:"We couldn't send your enquiry. Please try again.");
   moveFocus.current=true;setPrepared(true);try{sessionStorage.removeItem(draftKey);}catch{}
  }catch(error){setError(error instanceof Error&&error.name!=="TimeoutError"&&error.name!=="AbortError"&&error.name!=="TypeError"?error.message:"The connection was interrupted. Your brief is saved; please try again.");}
  finally{submitting.current=false;setSending(false);}
 }
 async function copy(){try{await navigator.clipboard.writeText(body);setCopyStatus("Brief copied. Paste it into an email to hello@alyoxa.com.");}catch{setCopyStatus("Copy is unavailable in this browser. You can download your brief instead.");}}
 function download(){const url=URL.createObjectURL(new Blob([body],{type:"text/plain;charset=utf-8"}));const link=document.createElement("a");link.href=url;link.download="alyoxa-project-brief.txt";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function clear(){setBrief({...empty,services:[]});setCopyStatus("");setError("");moveFocus.current=true;setStep(0);setPrepared(false);try{sessionStorage.removeItem(draftKey);}catch{}}
 if(!ready)return <div className="enquiry enquiry--loading" role="status">Preparing your project brief...</div>;
 return <div data-motion-pending ref={stage} className="enquiry" data-step={step} data-ready={prepared}>
 <aside className="enquiry__destination" aria-label="Your project journey">
  <div className="enquiry__destination-top"><span>ALYOXA / NEW POSSIBILITIES</span><span>{prepared?"THE NEXT CHAPTER":`CHAPTER 0${step+1}`}</span></div>
  <div className="enquiry__sculpture" aria-hidden="true"><span className="enquiry__scene-number">{prepared?"\u2197":`0${step+1}`}</span><div className="enquiry__mark"><svg className="enquiry__defs" aria-hidden="true"><defs><linearGradient id="enq-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".34"/><stop offset=".5" stopColor="#e8c9a6" stopOpacity=".1"/><stop offset="1" stopColor="#fff" stopOpacity=".05"/></linearGradient><linearGradient id="enq-face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbe2c2"/><stop offset=".45" stopColor="#c58c5c"/><stop offset="1" stopColor="#5e321a"/></linearGradient><linearGradient id="enq-fold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#93583a"/><stop offset="1" stopColor="#2a1509"/></linearGradient><linearGradient id="enq-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0"/><stop offset=".5" stopColor="#fff" stopOpacity=".85"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><mask id="enq-shine-mask" style={{maskType:"alpha"}}>{iconPaths.map((p,i)=><path key={i} d={p.d}/>)}</mask></defs></svg>{[0,1,2,3].map(layer=><svg key={layer} className="enquiry__layer" viewBox="0 0 80.98 59.01">{[[0,1],[2,3]].map((pair,side)=><g key={side} className={`enquiry__half enquiry__half--${side?"r":"l"}`}>{pair.map(i=><path key={i} d={iconPaths[i].d} fill={layer<3?"url(#enq-glass)":i%2?"url(#enq-face)":"url(#enq-fold)"} stroke={layer<3?"#e2c3a0":"none"} strokeOpacity=".7" strokeWidth=".35"/>)}</g>)}{layer===3&&<g mask="url(#enq-shine-mask)"><rect className="enquiry__shine" x="-34" y="-5" width="22" height="70" fill="url(#enq-shine)" transform="skewX(-18)"/></g>}</svg>)}</div><span className="enquiry__scene-glow"/><span className="enquiry__scene-coordinate enquiry__scene-coordinate--one">+</span><span className="enquiry__scene-coordinate enquiry__scene-coordinate--two">+</span></div>
  <div className="enquiry__destination-copy" key={prepared?"ready":step}><p>{prepared?"YOUR AMBITION HAS ARRIVED":`${String(step+1).padStart(2,"0")} / ${stepNames[step].toUpperCase()}`}</p><h2>{prepared?"The possibility":chapters[step].title}<br/><em>{prepared?"is real.":chapters[step].accent}</em></h2><span>{prepared?"Your brief is with the studio. Thank you for taking the first step with us.":chapters[step].note}</span></div>
  <div className="enquiry__destination-bottom"><span>{brief.services.length?`${String(brief.services.length).padStart(2,"0")} DIRECTIONS SELECTED`:"OPEN TO POSSIBILITY"}</span><a href="mailto:hello@alyoxa.com">Prefer email? <span aria-hidden="true">&#8599;</span></a></div>
 </aside>
 <div className="enquiry__workspace"><div className="enquiry__top"><span>LET&apos;S FIND YOUR STARTING POINT</span><span>{prepared?"READY":`${String(step+1).padStart(2,"0")} / 04`}</span></div>{!prepared&&<><ol className="enquiry__progress" aria-label="Enquiry progress">{stepNames.map((name,index)=><li key={name} aria-current={index===step?"step":undefined} data-complete={index<step}><span>{index<step?"\u2713":`0${index+1}`}</span>{index<step?<button type="button" disabled={sending} onClick={()=>go(index)}>{name}</button>:<span>{name}</span>}</li>)}</ol><div className="enquiry__progress-line" aria-hidden="true"><span style={{width:`${(step+1)*25}%`}}/></div></>}
 {prepared?<div className="enquiry__ready"><span className="enquiry__ready-icon" aria-hidden="true">&#8599;</span><p className="enquiry__ready-kicker">THE FIRST PIECES ARE IN PLACE</p><h2 ref={heading} tabIndex={-1}>An idea.<br/><em>A beginning.</em></h2><p>Your enquiry has been sent to <strong>hello@alyoxa.com</strong>. Thank you for sharing your ambition. We look forward to the conversation.</p><p className="enquiry__reply-time">We usually reply within 1–2 working days.</p><BrandButton href="/" label="Back to home"/><div className="enquiry__fallback"><p>Keep a copy of your project brief for your records.</p><button type="button" onClick={copy}>Copy brief</button><button type="button" onClick={download}>Download .txt</button><p role="status">{copyStatus}</p></div><div className="enquiry__ready-actions"><button type="button" onClick={()=>{moveFocus.current=true;setPrepared(false);}}>View your brief</button><button type="button" onClick={clear}>Clear &amp; start again</button></div></div>:<form onSubmit={submit} aria-busy={sending} noValidate>
 <div className="enquiry__step" key={step}><h2 ref={heading} tabIndex={-1}>{["Where shall we go?","What does your next chapter look like?","Who is behind the ambition?","A first look at what's next."][step]}</h2><p className="enquiry__hint">{["Pick the possibilities that speak to you. You can choose more than one.","A few sentences are enough. We can work out the details together.","Just the essentials, so we know how to reach you.","Check your details, then send your brief directly to our studio."][step]}</p>
 {step===0&&<fieldset ref={choices} className="enquiry__choices" tabIndex={-1} aria-describedby={error?"service-error":undefined}><legend className="enquiry__sr-only">Services you are interested in</legend>{services.map((service,index)=><label key={service} data-service={index}><input type="checkbox" checked={brief.services.includes(service)} onChange={()=>toggle(service)}/><span><span className="enquiry__choice-art" aria-hidden="true"><b/><b/><b/></span><span className="enquiry__choice-number" aria-hidden="true">0{index+1}</span><span className="enquiry__choice-name">{service}</span><i aria-hidden="true">{brief.services.includes(service)?"\u2713":"+"}</i></span></label>)}</fieldset>}
 {step===1&&<><label className="enquiry__field" htmlFor="project-description">Your idea <span>Required</span><textarea id="project-description" name="description" value={brief.description} onChange={e=>update("description",e.target.value)} required minLength={10} maxLength={1200} rows={5} placeholder="What are you building, changing, or hoping to achieve?" aria-describedby="description-help"/></label><p id="description-help" className="enquiry__field-help">{brief.description.trim().length<10?`At least 10 characters. ${brief.description.length} / 1200`:`${brief.description.length} / 1200`}</p><label className="enquiry__field" htmlFor="project-budget">Budget range <span>Optional</span><input id="project-budget" name="budget" value={brief.budget} maxLength={100} onChange={e=>update("budget",e.target.value)} placeholder="A range and currency, or let's discuss"/></label><label className="enquiry__field" htmlFor="project-timing">When are you thinking?<select id="project-timing" name="timing" value={brief.timing} onChange={e=>update("timing",e.target.value)}>{["Exploring options","As soon as practical","Within 1-3 months","Later this year"].map(option=><option key={option}>{option}</option>)}</select></label></>}
 {step===2&&<><label className="enquiry__field" htmlFor="contact-name">Your name <span>Required</span><input id="contact-name" name="name" autoComplete="name" required maxLength={80} pattern=".*\S.*" value={brief.name} onChange={e=>update("name",e.target.value)} placeholder="What should we call you?"/></label><label className="enquiry__field" htmlFor="contact-email">Email address <span>Required</span><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={brief.email} onChange={e=>update("email",e.target.value)} placeholder="you@company.com"/></label><label className="enquiry__field" htmlFor="contact-company">Company or website <span>Optional</span><input id="contact-company" name="company" autoComplete="organization" maxLength={100} value={brief.company} onChange={e=>update("company",e.target.value)} placeholder="Your company name or URL"/></label></>}
 {error&&<div className="enquiry__error-wrap"><p id="service-error" className="enquiry__error" role="alert">{error}</p>{step===3&&<div className="enquiry__fallback enquiry__fallback--inline"><p>Nothing is lost. Send it another way:</p><a href={emailHref}>Email it instead</a><button type="button" onClick={copy}>Copy brief</button><p role="status">{copyStatus}</p></div>}</div>}
 {step===3&&<div className="enquiry__review"><section><header><h3>THE AMBITION</h3><button type="button" disabled={sending} onClick={()=>go(0)}>Edit services</button></header><p>{brief.services.join(" / ")}</p></section><section><header><h3>THE PROJECT</h3><button type="button" disabled={sending} onClick={()=>go(1)}>Edit project</button></header><p className="enquiry__review-description">{brief.description}</p><dl><div><dt>Budget</dt><dd>{brief.budget||"Let's discuss"}</dd></div><div><dt>Timing</dt><dd>{brief.timing}</dd></div></dl></section><section><header><h3>ABOUT YOU</h3><button type="button" disabled={sending} onClick={()=>go(2)}>Edit contact</button></header><p>{brief.name}<br/>{brief.email}{brief.company&&<><br/>{brief.company}</>}</p></section><p className="enquiry__delivery-note">Your brief will be emailed to hello@alyoxa.com. We will use your details to respond to this enquiry.</p></div>}
 </div><div className="enquiry__actions">{step>0?<button className="enquiry__back" type="button" disabled={sending} onClick={()=>go(step-1)}>&#8592; Back</button>:<span/>}<BrandButton type="submit" disabled={sending} label={sending?"Sending your ambition...":step===3?"Send your project":["Next: your idea","Next: about you","Review your brief"][step]}/></div><p className="enquiry__privacy">Your draft stays in this browser tab until it closes. <Link href="/privacy-policy">Privacy Policy</Link></p></form>}
 </div></div>;
}
