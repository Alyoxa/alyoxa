"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import { animateApproach } from "./ApproachAnimations";
import { iconPaths } from "@/components/motion/Preloader/iconPaths";
import "./Approach.css";
import "./ApproachPanels.css";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { deferMotion } from "@/components/motion/deferredMotion";

gsap.registerPlugin(useGSAP);

const steps = [
  {
    id: "discovery", number: "01", title: "Discovery & insights",
    description: "We dive into your brand, audience, and ambitions to uncover what matters and where the opportunity lives.",
    deliverable: "A shared understanding. A clear brief.",
  },
  {
    id: "strategy", number: "02", title: "Strategy & planning",
    description: "We turn insights into a clear roadmap, aligning creative direction, technology, and your business goals.",
    deliverable: "A focused direction. A practical roadmap.",
  },
  {
    id: "design", number: "03", title: "Design & development",
    description: "We shape, prototype, and build your experience, refining the details together from first concept to final code.",
    deliverable: "A considered experience, ready for the world.",
  },
  {
    id: "growth", number: "04", title: "Launch & growth",
    description: "We launch with care, measure what matters, and use what we learn to guide the next round of improvements.",
    deliverable: "A confident launch. A foundation to evolve.",
  },
];

function ProcessBrandMark() {
  return <svg className="approach__sculpture approach__brand-icon" viewBox="0 0 800 610" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="approach-brand-light" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#e4bb92" stopOpacity="0"/><stop offset=".48" stopColor="#e4bb92" stopOpacity=".65"/><stop offset=".52" stopColor="#fff8eb" stopOpacity=".85"/><stop offset="1" stopColor="#e4bb92" stopOpacity="0"/></linearGradient>
      <radialGradient id="approach-brand-shadow"><stop stopColor="#22211b" stopOpacity=".12"/><stop offset="1" stopColor="#22211b" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse className="approach__brand-shadow" cx="400" cy="491" rx="205" ry="25" fill="url(#approach-brand-shadow)"/>
    <svg x="180" y="115" width="440" height="321" viewBox="0 0 80.98 59.01" overflow="visible">
      <defs><clipPath id="approach-brand-clip">{iconPaths.map((path,index)=><path key={index} d={path.d}/>)}</clipPath></defs>
      {[0,1].map(half=><g className={"approach__brand-half approach__brand-half--"+(half===0?"left":"right")} key={half}>{iconPaths.slice(half*2,half*2+2).map((path,index)=><path key={index} className="approach__brand-path" d={path.d} fill={path.fill} stroke="#b6a18c" strokeWidth=".32" strokeLinejoin="round"/>)}</g>)}
      <g clipPath="url(#approach-brand-clip)"><rect className="approach__brand-shine" x="-40" y="-10" width="26" height="85" fill="url(#approach-brand-light)" opacity="0" transform="rotate(-18 40 30)"/></g>
    </svg>
  </svg>;
}

export default function Approach() {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (rootRef.current) { const root = rootRef.current; return deferMotion(() => animateApproach(root)); }
  }, { scope: rootRef });

  return <section data-motion-pending ref={rootRef} className="approach approach--panels" id="approach" aria-labelledby="approach-heading">
    <div className="approach__container">
      <header className="approach__intro">
        <div><SectionEyebrow className="approach__eyebrow" index="04" category="Approach">How we work</SectionEyebrow><SectionHeading className="approach__heading" id="approach-heading" lines={["A process", "built for", "real impact."]} /></div>
        <div className="approach__description"><p>We bring strategy, creativity, and technology into one collaborative process. Every decision has a purpose. Every detail moves you forward.</p><span>FROM THE FIRST QUESTION TO WHAT’S NEXT.</span></div>
        <Plus className="approach__intro-cross" size={22} strokeWidth={1} aria-hidden="true" />
      </header>

      <div className="approach__stage">
        <div className="approach__scene-meta" aria-hidden="true"><span>THE APPROACH</span><span>ALYOXA / PROCESS</span></div>
        <svg className="approach__ribbons" viewBox="0 0 1600 700" preserveAspectRatio="none" fill="none" aria-hidden="true"><defs><linearGradient id="process-ribbon-tone" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#e4dcd2" stopOpacity=".06"/><stop offset=".5" stopColor="#bfb0a0" stopOpacity=".23"/><stop offset="1" stopColor="#f4ede5" stopOpacity=".02"/></linearGradient></defs><path className="approach__ribbon approach__ribbon--one" d="M-100 280C80-80 290 170 490-90L700-70C440 190 120-20-100 350Z" fill="url(#process-ribbon-tone)"/><path className="approach__ribbon approach__ribbon--two" d="M950 800C1160 440 1450 740 1690 370L1710 560C1450 820 1210 580 1070 820Z" fill="url(#process-ribbon-tone)"/></svg>
        <ProcessBrandMark />
        <svg className="approach__connectors" viewBox="0 0 1600 640" preserveAspectRatio="none" fill="none" aria-hidden="true"><g stroke="#b3997e" strokeWidth="1"><path d="M335 165H408Q420 165 430 175L515 245"/><path d="M1180 165H1160L1120 200"/><path d="M1180 465H1160Q1150 465 1140 455L1100 400"/><path d="M400 430H440L465 450H505"/></g><g fill="#80756b"><circle cx="515" cy="245" r="3"/><circle cx="1120" cy="200" r="3"/><circle cx="1100" cy="400" r="3"/><circle cx="505" cy="450" r="3"/></g></svg>
        <div className="approach__centre-caption" aria-hidden="true"><span>INDEPENDENT THINKING.</span><span>ONE CONNECTED PROCESS.</span><i /></div>
        <ol className="approach__steps" aria-label="Our process, from discovery to growth">
          {steps.map((step) => <li key={step.id} data-process={step.id} className={`approach__step approach__step--${step.id}`}>
            <div className="approach__step-top"><span className="approach__number" aria-hidden="true">{step.number}</span><span className="approach__phase-label">{["UNDERSTAND", "DEFINE", "CREATE", "EVOLVE"][Number(step.number)-1]}</span><span className="approach__node" aria-hidden="true" /></div>
            <div className="approach__step-copy"><h3>{step.title.split(" & ")[0]} &amp;<br/><span>{step.title.split(" & ")[1]}</span></h3><div className="approach__step-details"><p>{step.description}</p><span className="approach__deliverable">{step.deliverable}</span></div></div>
          </li>)}
        </ol>
        <div className="approach__scene-baseline" aria-hidden="true"><span>ALYOXA / THE CREATIVE PROCESS</span><span>04 / 04</span></div>
      </div>

      <footer className="approach__footer"><p><span className="approach__rings" aria-hidden="true" />A collaborative, end-to-end process</p><span className="approach__rule" aria-hidden="true" /><BrandButton className="approach__work-link" href="/approach" label="Explore our process" /><BrandButton className="approach__contact-link" variant="text" href="mailto:hello@alyoxa.com" label="Let’s talk about your project" /></footer>
    </div>
  </section>;
}
