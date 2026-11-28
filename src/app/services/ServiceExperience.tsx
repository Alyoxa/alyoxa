"use client";

import { useState } from "react";
import { serviceDisciplines } from "@/lib/serviceDisciplines";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import "./service-experience.css";
import AlyoxaMark from "@/components/ui/AlyoxaMark/AlyoxaMark";

const studies = {
  brand: { label: "THE IDENTITY STUDY", name: "From a point of view to a world of your own.", notes: ["A clear position gives every expression a shared starting point.", "A recognisable identity, expressed across the places people meet you.", "Type and colour work together to make the everyday unmistakable.", "A connected system your team can carry into the next chapter."] },
  digital: { label: "THE DIGITAL STUDY", name: "A brand becomes a place people can explore.", notes: ["A clear story and structure guide people towards their next step.", "Design becomes a working experience, connected to the tools you need.", "Thoughtful interactions make moving through the website feel natural.", "One coherent experience, composed for screens of every size."] },
  product: { label: "THE PRODUCT STUDY", name: "A complex idea. A clearer way through.", notes: ["Understand the steps people need to take, then remove the friction.", "Useful hierarchy and familiar controls bring clarity to each decision.", "Explore the flow before committing to the finished product.", "Reusable components keep the experience consistent as it grows."] },
  technology: { label: "THE INTERACTION STUDY", name: "Give an ambitious idea a working form.", notes: ["Creative thinking and code meet in an experience built around the idea.", "Depth, light, and space open up new ways to tell the story.", "Motion connects an action to a clear, satisfying response.", "Connect the experience to the systems that make it useful."] },
} as const;

function BrandScene() {
  return <div className="scene-brand">
    <div className="scene-brand__guides"><i /><i /><i /><i /></div>
    <div className="scene-brand__identity scene-entry" data-study-part="1"><span className="study-micro">AN IDENTITY IN GOOD SHAPE</span><div className="scene-brand__word">good<br /><em>form.</em><span>✳</span></div><span className="scene-brand__small">A fictional identity study.</span><div className="scene-brand__signature">gf<span>+</span></div></div>
    <div className="scene-brand__type scene-entry service-scene__float" data-study-part="2"><span className="study-micro">A LANGUAGE OF YOUR OWN</span><div>Aa<span>Bb</span></div><p>Considered.<br /><em>Recognisable.</em></p><span className="study-micro">TYPE / EXPRESSION / CHARACTER</span></div>
    <div className="scene-brand__palette scene-entry" data-study-part="3"><span className="study-micro">THE PALETTE</span><div><i /><i /><i /><i /></div><span className="study-micro">01 — 04</span></div>
    <div className="scene-brand__position scene-entry" data-study-part="0"><span className="study-micro">THE STARTING POINT</span><p>One clear idea.<br />Every detail connected.</p><span className="scene-mark" aria-hidden="true">✳</span></div>
  </div>;
}

function DigitalScene() {
  return <div className="scene-digital">
    <div className="scene-digital__browser scene-entry" data-study-part="0"><div className="scene-window-bar"><span><i /><i /><i /></span><small>YOUR NEXT CHAPTER</small><span>↗</span></div><div className="scene-digital__web"><div className="scene-digital__nav"><span>form.</span><span>Ideas&nbsp;&nbsp; Studio&nbsp;&nbsp; Contact ↗</span></div><div className="scene-digital__headline">Make<br />something<br /><em>matter.</em></div><svg className="scene-digital__ribbon" viewBox="0 0 400 400" fill="none"><defs><linearGradient id="service-ribbon" x1="70" y1="40" x2="340" y2="370" gradientUnits="userSpaceOnUse"><stop stopColor="#71818c"/><stop offset=".3" stopColor="#f4eee6"/><stop offset=".48" stopColor="#8d9399"/><stop offset=".68" stopColor="#eee6df"/><stop offset="1" stopColor="#364954"/></linearGradient></defs><path d="M30 295C110 302 74 67 198 95C310 121 274 316 392 193L300 345C220 401 199 160 125 172C84 179 107 325 30 295Z" fill="url(#service-ribbon)" /></svg><div className="scene-digital__web-bottom"><span>IDEAS MADE REAL.</span><span>Discover ↓</span></div></div></div>
    <div className="scene-digital__phone scene-entry service-scene__float" data-study-part="3"><div className="scene-phone-speaker"/><div className="scene-digital__phone-content"><span className="study-micro">form. <b>≡</b></span><p>Made<br />for<br /><em>people.</em></p><div className="scene-digital__phone-wave"/><span className="scene-digital__phone-cta">Explore <span>↗</span></span></div></div>
    <div className="scene-digital__connection scene-entry" data-study-part="1"><span>↔</span><div><span className="study-micro">CONNECTED BY DESIGN</span><p>Content. Code. Experience.</p></div></div>
    <div className="scene-digital__cursor scene-entry" data-study-part="2"><svg viewBox="0 0 24 30"><path d="M3 2L21 19L12 20L8 27Z" fill="#d7b28c" stroke="#fff" strokeWidth="1.5"/></svg><span>A little interaction.</span></div>
  </div>;
}

function ProductScene() {
  return <div className="scene-product">
    <div className="scene-product__flow scene-entry" data-study-part="0"><span>Discover</span><i>→</i><span>Choose</span><i>→</i><span>Create</span></div>
    <div className="scene-product__app scene-entry" data-study-part="1"><div className="scene-window-bar"><span><i /><i /><i /></span><small>A CLEARER WAY THROUGH</small><span>+</span></div><div className="scene-product__app-body"><div className="scene-product__sidebar"><strong>f.</strong><i /><i /><i /><span>↗</span></div><div className="scene-product__workspace"><span className="study-micro">YOUR WORKSPACE / OVERVIEW</span><h3>A little more<br /><em>headspace.</em></h3><div className="scene-product__stats"><div><span>In progress</span><strong>03<span>↗</span></strong></div><div><span>Made clearer</span><strong>01<span>✓</span></strong></div></div><div className="scene-product__task"><span>✓</span><div><strong>Find the direction</strong><small>A good place to begin.</small></div><i>Done</i></div><div className="scene-product__task"><span>○</span><div><strong>Make the next move</strong><small>One considered step.</small></div><i>Next</i></div></div></div></div>
    <div className="scene-product__prototype scene-entry service-scene__float" data-study-part="2"><span className="study-micro">FROM QUESTION TO CLARITY</span><p>Less friction.<br /><em>More possibility.</em></p><div><span>Try the idea</span><span className="scene-product__play">▶</span></div></div>
    <div className="scene-product__components scene-entry" data-study-part="3"><span className="study-micro">SMALL PARTS. SHARED LOGIC.</span><div><span>Continue ↗</span><i /><b>✓</b><strong>+</strong></div></div>
  </div>;
}

function TechnologyScene() {
  return <div className="scene-tech">
    <div className="scene-tech__grid" />
    <svg className="scene-tech__wires" viewBox="0 0 600 600" fill="none"><path d="M65 150H180L270 240M530 155H420L330 245M70 460H180L270 350M530 465H430L335 355" stroke="#9c8b78" strokeOpacity=".5" strokeDasharray="3 7"/><path className="scene-tech__signal" d="M65 150H180L270 240L335 355L430 465H530" stroke="#e1b38b" strokeWidth="2"/></svg>
    <div className="scene-tech__core scene-entry" data-study-part="1"><div className="scene-tech__sculpture"><i /><i /><i /></div><span className="study-micro">AN IDEA, IN A NEW DIMENSION</span></div>
    <div className="scene-tech__node scene-tech__node--one scene-entry" data-study-part="0"><span className="scene-tech__node-icon">↗</span><div><span className="study-micro">01 / THE IDEA</span><strong>What if?</strong></div></div>
    <div className="scene-tech__node scene-tech__node--two scene-entry" data-study-part="2"><span className="scene-tech__node-icon">✳</span><div><span className="study-micro">02 / THE RESPONSE</span><strong>Make it move.</strong></div></div>
    <div className="scene-tech__node scene-tech__node--three scene-entry" data-study-part="3"><span className="scene-tech__node-icon">⌘</span><div><span className="study-micro">03 / THE CONNECTION</span><strong>Make it useful.</strong></div></div>
    <div className="scene-tech__output scene-entry"><span className="scene-tech__status"/><span className="study-micro">POSSIBILITY → EXPERIENCE</span><span>↗</span></div>
  </div>;
}

const scenes = { brand: BrandScene, digital: DigitalScene, product: ProductScene, technology: TechnologyScene };

function ServiceStudy({ service, index }: { service: typeof serviceDisciplines[number]; index: number }) {
  const [focus, setFocus] = useState(0);
  const id = service.id as keyof typeof studies;
  const study = studies[id];
  const Scene = scenes[id];
  return <section className={`service-chapter service-study service-study--${id}`} id={id} aria-labelledby={`${id}-title`}>
    <div className="service-study__top"><span>0{index + 1} / THE DISCIPLINE</span><span>{study.label}</span></div>
    <div className="service-study__card">
      <div className="service-study__progress" aria-hidden="true"><span /></div><AlyoxaMark className="brand-seal brand-seal--top" />
      <div className="service-study__visual" data-focus={focus} data-live="false" aria-hidden="true"><div className="service-study__scene-label"><span><i />ALYOXA / EXPLORATIONS</span><span>0{index + 1}—04</span></div><div className="service-study__scene-depth"><div className="service-study__scene-pointer"><Scene/></div></div><div className="service-study__scene-bottom"><span>{study.name}</span><span>ILLUSTRATIVE STUDY</span></div></div>
      <div className="service-study__content"><p className="service-study__kicker">{service.title} / ALYOXA</p><h2 id={`${id}-title`}>{service.title}</h2><p className="service-study__phrase"><em>{service.phrase}</em></p><p className="service-study__description">{service.description}</p>
        <div className="service-study__capabilities"><h3>EXPLORE WHAT WE CAN CREATE <span aria-hidden="true">↙</span></h3><ul>{service.deliverables.map((item, itemIndex) => <li key={item}><button type="button" aria-pressed={focus === itemIndex} aria-controls={`${id}-study-note`} onClick={() => setFocus(itemIndex)}><span className="service-study__cap-number" aria-hidden="true">0{itemIndex + 1}</span><span>{item}</span><span className="service-study__cap-arrow" aria-hidden="true">↗</span></button></li>)}</ul></div>
        <p className="service-study__note" id={`${id}-study-note`} aria-live="polite" aria-atomic="true">{study.notes[focus]}</p><div className="service-study__outcome"><span>THE OUTCOME</span><p>{service.outcome}</p></div><BrandButton href="/contact" variant="text" label="Let's talk about it" />
      </div>
    </div>
  </section>;
}

export default function ServiceExperience() {
  return <div className="services-page__chapters services-page__wrap">{serviceDisciplines.map((service, index) => <ServiceStudy key={service.id} service={service} index={index} />)}</div>;
}
