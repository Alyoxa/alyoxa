"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { animateAbout } from "./AboutAnimations";
import "./About.css";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";

gsap.registerPlugin(useGSAP);

// Figures supplied in the studio's visual reference.
const studioStats = [
  { value: "50+", label: "Projects delivered" },
  { value: "20+", label: "Brands partnered" },
  { value: "6+", label: "Years of impact" },
];

const principles = [
  { id: "strategy", title: "Strategic", description: "Purpose in every decision. A clear direction from the start." },
  { id: "creativity", title: "Creative", description: "Bold ideas, brought to life with care, detail, and intent." },
  { id: "technology", title: "Tech-driven", description: "Thoughtful technology. Built to perform, adapt, and scale." },
];

function PrincipleIcon({ kind }: { kind: string }) {
  if (kind === "strategy") return <span className="about__rings" aria-hidden="true" />;
  if (kind === "technology") return <ArrowUpRight size={32} strokeWidth={1} aria-hidden="true" />;
  return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 1v30M1 16h30M5.4 5.4l21.2 21.2M5.4 26.6 26.6 5.4" stroke="currentColor" /></svg>;
}

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (rootRef.current) return animateAbout(rootRef.current);
  }, { scope: rootRef });

  return <section data-motion-pending ref={rootRef} className="about" id="about" aria-labelledby="about-heading">
    <div className="about__container">
      <header className="about__intro">
        <div><SectionEyebrow className="about__eyebrow" index="05" category="About">The studio</SectionEyebrow><SectionHeading className="about__heading" id="about-heading" lines={["A creative", "partner for", "ambitious brands."]} /></div>
        <div className="about__description"><p>ALYOXA® is a creative studio that brings strategy, design, and technology together to build distinctive brands, digital experiences, and products with real impact.</p></div>
        <Plus className="about__intro-cross" size={22} strokeWidth={1} aria-hidden="true" />
      </header>

      <div className="about__stage">
        <div className="about__artwork" aria-hidden="true"><div className="about__artwork-image" /><span className="about__artwork-light" /><span className="about__artwork-signature">ALYOXA®<span>Independent thinking.<br />Collective ambition.</span></span></div>
        <Plus className="about__cross about__cross--left" size={22} strokeWidth={1} aria-hidden="true" /><Plus className="about__cross about__cross--right" size={22} strokeWidth={1} aria-hidden="true" />
        <ul className="about__principles" aria-label="What drives our studio">{principles.map((principle) => <li className={`about__principle about__principle--${principle.id}`} key={principle.id}><PrincipleIcon kind={principle.id} /><div><h3>{principle.title}</h3><p>{principle.description}</p></div></li>)}</ul>
        <dl className="about__stats" aria-label="Alyoxa in numbers">{studioStats.map((stat) => <div className="about__stat" key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}</dl>
        <span className="about__sphere" aria-hidden="true" />
      </div>

      <footer className="about__footer"><p><span className="about__rings" aria-hidden="true" /><span>People / Ideas / Technology / Impact</span></p><span className="about__footer-rule" aria-hidden="true" /><BrandButton href="/about" label="Meet the studio" /></footer>
    </div>
  </section>;
}
