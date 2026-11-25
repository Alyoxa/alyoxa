"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Plus } from "lucide-react";
import { animateApproach } from "./ApproachAnimations";
import "./Approach.css";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";

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

function ProcessSculpture() {
  return <svg className="approach__sculpture" viewBox="0 0 800 610" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="approach-silver" x1="360" y1="120" x2="495" y2="520" gradientUnits="userSpaceOnUse"><stop stopColor="#282724" /><stop offset=".25" stopColor="#6e6a65" /><stop offset=".48" stopColor="#f6f4f0" /><stop offset=".58" stopColor="#b2aaa1" /><stop offset=".77" stopColor="#3e3b37" /><stop offset="1" stopColor="#f4f1eb" stopOpacity=".1" /></linearGradient>
      <linearGradient id="approach-dark" x1="480" y1="50" x2="365" y2="350" gradientUnits="userSpaceOnUse"><stop stopColor="#161615" /><stop offset=".42" stopColor="#4b4844" /><stop offset=".72" stopColor="#a2978b" /><stop offset=".94" stopColor="#fff4e8" /><stop offset="1" stopColor="#bd8157" /></linearGradient>
      <linearGradient id="approach-glass" x1="510" y1="155" x2="365" y2="555" gradientUnits="userSpaceOnUse"><stop stopColor="#4a4742" stopOpacity=".7" /><stop offset=".3" stopColor="#f6f2eb" stopOpacity=".8" /><stop offset=".52" stopColor="#c6c0b8" stopOpacity=".22" /><stop offset=".7" stopColor="#5b5650" stopOpacity=".75" /><stop offset="1" stopColor="#faf8f4" stopOpacity="0" /></linearGradient>
      <linearGradient id="approach-edge" x1="100" y1="400" x2="675" y2="160" gradientUnits="userSpaceOnUse"><stop stopColor="#c17c49" stopOpacity=".2" /><stop offset=".4" stopColor="#f5c5a0" /><stop offset=".65" stopColor="#fff7e9" /><stop offset="1" stopColor="#be845d" stopOpacity=".2" /></linearGradient>
      <radialGradient id="approach-copper" cx=".34" cy=".25" r=".8"><stop stopColor="#fff3dc" /><stop offset=".2" stopColor="#e5ad83" /><stop offset=".45" stopColor="#a36540" /><stop offset=".72" stopColor="#43271b" /><stop offset="1" stopColor="#d89a6b" /></radialGradient>
      <filter id="approach-glow" x="-50%" y="-80%" width="200%" height="260%"><feGaussianBlur stdDeviation="8" /></filter>
    </defs>
    <g className="approach__layer approach__layer--back"><path d="M179 519 370 245 740 212 586 455Z" fill="url(#approach-glass)" /><path d="m179 519 407-64 154-243" stroke="url(#approach-edge)" strokeWidth="1.2" /></g>
    <g className="approach__layer approach__layer--base"><path d="m226 602 166-298 288-59-163 284Z" fill="url(#approach-silver)" opacity=".65" /><path d="m226 602 291-73 163-284" stroke="#fff" strokeOpacity=".3" /></g>
    <g className="approach__layer approach__layer--middle"><path d="M110 493c83-86 147-176 238-232l339-177-131 277Z" fill="url(#approach-glass)" /><path d="m110 493 446-132L687 84" stroke="url(#approach-edge)" strokeWidth="1.5" /></g>
    <g className="approach__layer approach__layer--front"><path d="M55 409c94-128 171-231 273-286C409 79 504 43 618 24L486 309C318 324 192 363 55 409Z" fill="url(#approach-dark)" /><path d="M55 409c137-46 263-85 431-100L618 24" stroke="url(#approach-edge)" strokeWidth="2" /><path d="M55 409c137-46 263-85 431-100L618 24" stroke="#e8b48c" strokeWidth="5" opacity=".55" filter="url(#approach-glow)" /><path d="M55 409c155-77 203-173 324-197 75-15 153-25 215-34" stroke="url(#approach-edge)" strokeWidth="1.2" opacity=".8" /></g>
    <circle className="approach__sphere" cx="541" cy="529" r="19" fill="url(#approach-copper)" />
  </svg>;
}

export default function Approach() {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (rootRef.current) return animateApproach(rootRef.current);
  }, { scope: rootRef });

  return <section data-motion-pending ref={rootRef} className="approach" id="approach" aria-labelledby="approach-heading">
    <div className="approach__container">
      <header className="approach__intro">
        <div><SectionEyebrow className="approach__eyebrow" index="04" category="Approach">How we work</SectionEyebrow><SectionHeading className="approach__heading" id="approach-heading" lines={["A process", "built for", "real impact."]} /></div>
        <div className="approach__description"><p>We bring strategy, creativity, and technology into one collaborative process. Every decision has a purpose. Every detail moves you forward.</p><span>FROM THE FIRST QUESTION TO WHAT’S NEXT.</span></div>
        <Plus className="approach__intro-cross" size={22} strokeWidth={1} aria-hidden="true" />
      </header>

      <div className="approach__stage">
        <ProcessSculpture />
        <Plus className="approach__cross approach__cross--left" size={23} strokeWidth={1} aria-hidden="true" /><Plus className="approach__cross approach__cross--right" size={23} strokeWidth={1} aria-hidden="true" />
        <ol className="approach__steps" aria-label="Our process, from discovery to growth">
          {steps.map((step) => <li key={step.id} data-process={step.id} className={`approach__step approach__step--${step.id}`}>
            <span className="approach__node" aria-hidden="true" /><span className="approach__number" aria-hidden="true">{step.number}</span>
            <div className="approach__step-copy"><h3>{step.title}</h3><p>{step.description}</p><span className="approach__deliverable">{step.deliverable}</span></div>
          </li>)}
        </ol>
      </div>

      <footer className="approach__footer"><p><span className="approach__rings" aria-hidden="true" />A collaborative, end-to-end process</p><span className="approach__rule" aria-hidden="true" /><BrandButton className="approach__work-link" href="/approach" label="Explore our process" /><BrandButton className="approach__contact-link" variant="text" href="mailto:hello@alyoxa.com" label="Let’s talk about your project" /></footer>
    </div>
  </section>;
}
